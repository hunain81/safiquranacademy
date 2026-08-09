import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "registrations.json");

// Helper to ensure data file exists and read data
function getRegistrations() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading registrations data:", error);
    return [];
  }
}

// Helper to write data
function saveRegistrations(data: unknown) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing registrations data:", error);
  }
}

// GET /api/registrations
export async function GET() {
  const registrations = getRegistrations();
  return NextResponse.json({ success: true, registrations });
}

// POST /api/registrations (Create new registration)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const registrations = getRegistrations();

    const newRecord = {
      id: "reg-" + Date.now(),
      studentName: body.studentName || "N/A",
      age: body.age || "N/A",
      gender: body.gender || "Not specified",
      country: body.country || "N/A",
      course: body.course || "Noorani Qaida Course (Beginners)",
      parentName: body.parentName || "N/A",
      whatsapp: body.whatsapp || "N/A",
      email: body.email || "N/A",
      preferredTime: body.preferredTime || "Flexible",
      notes: body.notes || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    registrations.unshift(newRecord);
    saveRegistrations(registrations);

    return NextResponse.json({ success: true, registration: newRecord });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save registration" },
      { status: 500 }
    );
  }
}

// PATCH /api/registrations (Update registration status)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing id or status" },
        { status: 400 }
      );
    }

    const registrations = getRegistrations();
    const index = registrations.findIndex((r: { id: string }) => r.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Registration not found" },
        { status: 404 }
      );
    }

    registrations[index].status = status;
    saveRegistrations(registrations);

    return NextResponse.json({ success: true, registration: registrations[index] });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update registration" },
      { status: 500 }
    );
  }
}

// DELETE /api/registrations (Delete registration)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing registration id" },
        { status: 400 }
      );
    }

    let registrations = getRegistrations();
    registrations = registrations.filter((r: { id: string }) => r.id !== id);
    saveRegistrations(registrations);

    return NextResponse.json({ success: true, message: "Registration deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete registration" },
      { status: 500 }
    );
  }
}
