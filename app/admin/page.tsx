"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  MessageCircle,
  Trash2,
  Download,
  RefreshCw,
  ArrowLeft,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  Mail,
  UserCheck
} from "lucide-react";

interface Registration {
  id: string;
  studentName: string;
  age: string;
  gender: string;
  country: string;
  course: string;
  parentName: string;
  whatsapp: string;
  email: string;
  preferredTime: string;
  notes: string;
  status: "Pending" | "Contacted" | "Trial Scheduled" | "Enrolled";
  createdAt: string;
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch registrations on mount
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/registrations");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.registrations)) {
          setRegistrations(data.registrations);
        }
      } catch (err) {
        console.error("Failed to load registrations:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Manual Refresh Handler
  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/registrations");
      const data = await res.json();
      if (data.success && Array.isArray(data.registrations)) {
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error("Failed to load registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Status Change Handler
  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus as Registration["status"] } : item
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;
    try {
      const res = await fetch(`/api/registrations?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete registration:", err);
    }
  };

  // CSV Export Handler
  const exportToCSV = () => {
    if (registrations.length === 0) return;
    const headers = [
      "ID",
      "Student Name",
      "Age",
      "Gender",
      "Country",
      "Course",
      "Parent Name",
      "WhatsApp",
      "Email",
      "Preferred Time",
      "Notes",
      "Status",
      "Date Submitted",
    ];

    const rows = registrations.map((r) => [
      r.id,
      `"${r.studentName}"`,
      `"${r.age}"`,
      `"${r.gender}"`,
      `"${r.country}"`,
      `"${r.course}"`,
      `"${r.parentName}"`,
      `"${r.whatsapp}"`,
      `"${r.email}"`,
      `"${r.preferredTime}"`,
      `"${(r.notes || "").replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Safi_Quran_Academy_Registrations_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered dataset
  const filteredData = registrations.filter((r) => {
    const matchesStatus =
      selectedStatus === "All" || r.status === selectedStatus;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !searchQuery ||
      r.studentName.toLowerCase().includes(query) ||
      r.parentName.toLowerCase().includes(query) ||
      r.country.toLowerCase().includes(query) ||
      r.course.toLowerCase().includes(query) ||
      r.whatsapp.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });

  // Calculate metrics counts
  const totalCount = registrations.length;
  const pendingCount = registrations.filter((r) => r.status === "Pending").length;
  const contactedCount = registrations.filter((r) => r.status === "Contacted").length;
  const scheduledCount = registrations.filter((r) => r.status === "Trial Scheduled").length;
  const enrolledCount = registrations.filter((r) => r.status === "Enrolled").length;

  return (
    <main className="min-h-screen bg-[#0B132B] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#0B132B]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-400 transition"
              title="Return to Main Site"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-400/30 text-amber-400">
                <BookOpen size={20} />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white leading-tight">SAFI QURAN ACADEMY</h1>
                <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest">
                  Admin Dashboard • Free Trial Registrations
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-amber-400 hover:text-amber-300 transition"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* ================= METRICS STATS CARDS ================= */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Submitted</span>
              <Users size={16} className="text-amber-400" />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-white">{totalCount}</p>
            <p className="mt-1 text-[11px] text-slate-400">All registered students</p>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 shadow-xl">
            <div className="flex items-center justify-between text-amber-300">
              <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
              <Clock size={16} className="text-amber-400" />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-amber-300">{pendingCount}</p>
            <p className="mt-1 text-[11px] text-amber-400/80">Needs follow-up</p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 shadow-xl">
            <div className="flex items-center justify-between text-cyan-300">
              <span className="text-xs font-semibold uppercase tracking-wider">Contacted</span>
              <MessageCircle size={16} className="text-cyan-400" />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-cyan-300">{contactedCount}</p>
            <p className="mt-1 text-[11px] text-cyan-400/80">Message sent</p>
          </div>

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 shadow-xl">
            <div className="flex items-center justify-between text-indigo-300">
              <span className="text-xs font-semibold uppercase tracking-wider">Trial Scheduled</span>
              <Calendar size={16} className="text-indigo-400" />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-indigo-300">{scheduledCount}</p>
            <p className="mt-1 text-[11px] text-indigo-400/80">Date locked</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-xl col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-emerald-300">
              <span className="text-xs font-semibold uppercase tracking-wider">Enrolled</span>
              <CheckCircle2 size={16} className="text-emerald-400" />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-emerald-300">{enrolledCount}</p>
            <p className="mt-1 text-[11px] text-emerald-400/80">Active students</p>
          </div>
        </div>

        {/* ================= SEARCH & STATUS TABS ================= */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, parent, country, course, WhatsApp..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400 transition"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800">
            {["All", "Pending", "Contacted", "Trial Scheduled", "Enrolled"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  selectedStatus === status
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

        {/* ================= REGISTRATIONS DATA TABLE / CARDS ================= */}
        <div className="mt-6">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="mx-auto mb-3 animate-spin text-amber-400" size={28} />
              <p className="text-sm font-semibold">Loading registrations data...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="py-16 text-center rounded-3xl border border-slate-800 bg-slate-900/40">
              <UserCheck className="mx-auto mb-3 text-slate-600" size={36} />
              <h3 className="text-base font-bold text-white">No registrations found</h3>
              <p className="mt-1 text-xs text-slate-400">
                {searchQuery || selectedStatus !== "All"
                  ? "Try clearing your search query or status filter."
                  : "No free trial registrations have been submitted yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-extrabold uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-4">Student & Parent</th>
                      <th className="px-4 py-4">Country & Timing</th>
                      <th className="px-4 py-4">Course Interest</th>
                      <th className="px-4 py-4">Contact Actions</th>
                      <th className="px-4 py-4">Date</th>
                      <th className="px-4 py-4">Status</th>
                      <th className="px-4 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredData.map((reg) => {
                      const cleanWhatsApp = reg.whatsapp.replace(/[^0-9]/g, "");
                      const waText = encodeURIComponent(
                        `Assalamu Alaikum ${reg.parentName || reg.studentName}, thank you for registering at Safi Quran Academy for the free trial class (${reg.course}). How can we assist you with scheduling?`
                      );
                      const waUrl = `https://wa.me/${cleanWhatsApp}?text=${waText}`;

                      return (
                        <tr key={reg.id} className="hover:bg-slate-800/40 transition">
                          
                          {/* Student & Parent */}
                          <td className="px-5 py-4">
                            <p className="font-extrabold text-white text-sm">{reg.studentName}</p>
                            <p className="text-[11px] text-amber-400 mt-0.5">
                              {reg.age} • {reg.gender}
                            </p>
                            {reg.parentName && (
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                Parent: <span className="text-slate-200">{reg.parentName}</span>
                              </p>
                            )}
                          </td>

                          {/* Country & Timezone */}
                          <td className="px-4 py-4">
                            <p className="font-semibold text-slate-200">{reg.country}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{reg.preferredTime}</p>
                          </td>

                          {/* Course */}
                          <td className="px-4 py-4 max-w-xs">
                            <span className="inline-block rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 font-semibold text-emerald-300 text-[11px]">
                              {reg.course}
                            </span>
                            {reg.notes && (
                              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 italic">
                                &quot;{reg.notes}&quot;
                              </p>
                            )}
                          </td>

                          {/* Contact Actions */}
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1">
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                              >
                                <MessageCircle size={14} /> {reg.whatsapp}
                              </a>
                              {reg.email && reg.email !== "N/A" && (
                                <a
                                  href={`mailto:${reg.email}`}
                                  className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-200"
                                >
                                  <Mail size={12} /> {reg.email}
                                </a>
                              )}
                            </div>
                          </td>

                          {/* Date */}
                          <td className="px-4 py-4 text-[11px] text-slate-400">
                            {new Date(reg.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>

                          {/* Status selector */}
                          <td className="px-4 py-4">
                            <select
                              value={reg.status}
                              disabled={updatingId === reg.id}
                              onChange={(e) => handleStatusChange(reg.id, e.target.value)}
                              className={`rounded-xl border px-3 py-1.5 text-xs font-bold outline-none cursor-pointer transition ${
                                reg.status === "Pending"
                                  ? "border-amber-400/40 bg-amber-500/15 text-amber-300"
                                  : reg.status === "Contacted"
                                  ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-300"
                                  : reg.status === "Trial Scheduled"
                                  ? "border-indigo-400/40 bg-indigo-500/15 text-indigo-300"
                                  : "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                              }`}
                            >
                              <option className="bg-slate-900 text-amber-300" value="Pending">Pending</option>
                              <option className="bg-slate-900 text-cyan-300" value="Contacted">Contacted</option>
                              <option className="bg-slate-900 text-indigo-300" value="Trial Scheduled">Trial Scheduled</option>
                              <option className="bg-slate-900 text-emerald-300" value="Enrolled">Enrolled</option>
                            </select>
                          </td>

                          {/* Action */}
                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => handleDelete(reg.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                              title="Delete record"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="grid gap-4 lg:hidden">
                {filteredData.map((reg) => {
                  const cleanWhatsApp = reg.whatsapp.replace(/[^0-9]/g, "");
                  const waText = encodeURIComponent(
                    `Assalamu Alaikum ${reg.parentName || reg.studentName}, thank you for registering at Safi Quran Academy for the free trial class (${reg.course}).`
                  );
                  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${waText}`;

                  return (
                    <div
                      key={reg.id}
                      className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-extrabold text-white text-base">{reg.studentName}</h3>
                          <p className="text-xs text-amber-400 font-semibold mt-0.5">
                            {reg.age} • {reg.gender}
                          </p>
                        </div>
                        <select
                          value={reg.status}
                          disabled={updatingId === reg.id}
                          onChange={(e) => handleStatusChange(reg.id, e.target.value)}
                          className="rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-amber-300 outline-none"
                        >
                          <option className="bg-slate-900" value="Pending">Pending</option>
                          <option className="bg-slate-900" value="Contacted">Contacted</option>
                          <option className="bg-slate-900" value="Trial Scheduled">Trial Scheduled</option>
                          <option className="bg-slate-900" value="Enrolled">Enrolled</option>
                        </select>
                      </div>

                      <div className="text-xs space-y-1 text-slate-300 border-t border-slate-800 pt-3">
                        <p><span className="text-slate-500">Course:</span> <span className="font-semibold text-emerald-300">{reg.course}</span></p>
                        <p><span className="text-slate-500">Country:</span> {reg.country}</p>
                        <p><span className="text-slate-500">Timing:</span> {reg.preferredTime}</p>
                        {reg.parentName && <p><span className="text-slate-500">Parent:</span> {reg.parentName}</p>}
                        {reg.notes && <p><span className="text-slate-500">Notes:</span> <i>{reg.notes}</i></p>}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md"
                        >
                          <MessageCircle size={14} /> WhatsApp Chat
                        </a>

                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

      </div>
    </main>
  );
}
