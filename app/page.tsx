"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Compass,
  GraduationCap,
  MessageCircle,
  Menu,
  X,
  MonitorPlay,
  ShieldCheck,
  Star,
  Users,
  MessageCircleMore,
  ChevronDown,
  Sparkles,
  Globe,
  Award,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Phone,
  CheckCircle
} from "lucide-react";

const kawtharAyahs = [
  {
    number: 1,
    arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
    translation: "Indeed, We have granted you Al-Kawthar.",
  },
  {
    number: 2,
    arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
    translation: "So pray to your Lord and sacrifice [to Him alone].",
  },
  {
    number: 3,
    arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
    translation: "Indeed, your enemy is the one cut off.",
  },
];

const kawtharAudioUrl = "/audio/ayah-kawthar.mp3";

// Nav items
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Teachers", href: "#teachers" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

// Stats banner data
const statsHighlights = [
  { icon: Star, text: "Rated 4.9/5 by Students & Parents", highlight: "4.9/5" },
  { icon: Users, text: "1500+ Active Worldwide Students", highlight: "1500+" },
  { icon: GraduationCap, text: "50+ Qualified Male & Female Tutors", highlight: "50+" },
  { icon: Globe, text: "Students across 15+ Countries", highlight: "15+ Countries" },
  { icon: Sparkles, text: "3-Day Free Trial Available", highlight: "3-Day Free Trial" },
  { icon: Clock3, text: "24/7 Flexible Class Timings", highlight: "24/7 Flexible" },
];

// Features grid
const features = [
  { title: "Qualified Male & Female Teachers", body: "Patient, certified, and experienced tutors tailored to your child or personal learning needs.", icon: Users },
  { title: "One-to-One Online Classes", body: "Personalized attention helps students make faster, stronger progress in each session.", icon: Compass },
  { title: "Flexible Timings", body: "Schedule lessons around your local timezone and daily routine with ease.", icon: Clock3 },
  { title: "Child-Friendly Environment", body: "A positive, encouraging atmosphere that builds confidence, discipline, and joy.", icon: ShieldCheck },
  { title: "Monthly Progress Reports", body: "Parents receive detailed updates on lessons, attendance, and development milestones.", icon: BookOpen },
  { title: "Affordable Fee Plans", body: "Quality education at reasonable rates for families across the globe.", icon: Star },
  { title: "Worldwide Learning", body: "Accessible to learners in the US, UK, Canada, Gulf, Europe, and beyond.", icon: Globe },
  { title: "Modern Teaching Methods", body: "Zoom sessions, screen sharing, and interactive whiteboards keep lessons engaging.", icon: MonitorPlay },
  { title: "Makeup Classes & 3-Day Trial", body: "Flexible rescheduling and a 3-day risk-free trial make starting simple and stress-free.", icon: CheckCircle2 },
];

// Courses dataset with category tagging
const courses = [
  {
    id: "qaida",
    category: "Kids",
    title: "Noorani Qaida Course",
    target: "Kids (4+), Adult Beginners, New Muslims",
    description: "Master foundational Arabic letters, makharij, and pronunciation principles to read the Quran with ease.",
    topics: ["Alphabet recognition", "Makharij (Pronunciation)", "Harakat & Tanween", "Maddah & Sukoon", "Tashdeed Rules"],
    cta: "Book 3-Day Free Trial",
    popular: true,
    image: "/images (3).png",
  },
  {
    id: "nazra",
    category: "Kids",
    title: "Nazra Quran Course",
    target: "Children, Teenagers, Adults",
    description: "Develop effortless fluency in reading the entire Holy Quran with proper speed and rhythm.",
    topics: ["Full Quran reading", "Fluency development", "Mistake correction", "Recitation without spelling out"],
    cta: "Book 3-Day Free Trial",
    image: "/images (4).png",
  },
  {
    id: "tajweed",
    category: "Tajweed & Hifz",
    title: "Quran with Tajweed Course",
    target: "Quran Readers seeking perfection",
    description: "Perfect your recitation according to classical Tajweed rules for beautiful and correct pronunciation.",
    topics: ["Makharij & Sifaat-ul-Huroof", "Noon/Meem Sakin Rules", "Ghunnah & Qalqalah", "Madd & Waqf Rules"],
    cta: "Book 3-Day Free Trial",
    popular: true,
    image: "/images (2).png",
  },
  {
    id: "hifz",
    category: "Tajweed & Hifz",
    title: "Hifz-ul-Quran Course",
    target: "Dedicated Memorization Students",
    description: "Structured daily memorization and systematic revision under certified male and female Huffaz.",
    topics: ["Daily Sabaq (New Lesson)", "Sabqi (Recent Lessons)", "Manzil Revision Plan", "Retention strategies"],
    cta: "Book 3-Day Free Trial",
    image: "/images (8).png",
  },
  {
    id: "islamic",
    category: "Adults",
    title: "Islamic Studies Course",
    target: "All Ages & Backgrounds",
    description: "Comprehensive understanding of core Islamic beliefs, worship practices, Seerah, and daily manners.",
    topics: ["5 Pillars & 6 Articles of Faith", "Wudu & Salah Guide", "Seerah & Prophet Stories", "Daily Essential Duas"],
    cta: "Book 3-Day Free Trial",
    image: "/images (1).png",
  },
  {
    id: "duas",
    category: "Kids",
    title: "Duas & Salah Course",
    target: "Kids & Adults",
    description: "Practical step-by-step guidance for daily Azkar, Salah postures, and essential supplications.",
    topics: ["6 Kalimas & Ayatul Kursi", "Dua Qunoot", "Step-by-step Wudu & Salah", "Daily Masnoon Azkar"],
    cta: "Book 3-Day Free Trial",
    image: "/images (7).png",
  },
  {
    id: "tafseer",
    category: "Adults",
    title: "Quran Translation & Tafseer",
    target: "Teenagers & Adults",
    description: "Deepen your connection with the divine text through word-for-word translation and contextual Tafseer.",
    topics: ["Word-to-word translation", "Quranic vocabulary", "Context of Revelation", "Practical daily application"],
    cta: "Book 3-Day Free Trial",
    image: "/images (6).png",
  },
];


// Testimonials
const testimonials = [
  {
    quote: "My children have improved significantly in Quran reading within just two months. The teacher is patient, kind, and extremely professional.",
    name: "Dr. Hassan A.",
    location: "Parent (USA / Canada)",
    rating: 5,
  },
  {
    quote: "Excellent academy with flexible timings and highly qualified teachers. As a busy working professional in London, I can easily manage my classes.",
    name: "Sariyah M.",
    location: "Student (UK, London)",
    rating: 5,
  },
  {
    quote: "We are very satisfied with the monthly progress reports and teaching quality. Female tutors are gentle and very encouraging for young girls.",
    name: "Fatima K.",
    location: "Parent (Germany, Europe)",
    rating: 5,
  },
  {
    quote: "The teachers are very supportive and always encourage students to do their best. The 1-on-1 model makes a world of difference.",
    name: "Tariq S.",
    location: "Parent (Kuwait)",
    rating: 5,
  },
  {
    quote: "Highly recommended for children and adults who want to learn Quran online from anywhere. Smooth Zoom experience and clear communication.",
    name: "Aisha R.",
    location: "Adult Student (Australia)",
    rating: 5,
  },
];

// FAQs
const faqs = [
  { question: "Do you offer a 3-day free trial class?", answer: "Yes! Every new student receives a 100% complimentary 3-day trial session with a male or female tutor before deciding to enroll. No credit card is required." },
  { question: "Are female teachers available?", answer: "Yes! Qualified, certified female teachers (Alimat & Hafizat) are available for female students and young children." },
  { question: "Which platform is used for online classes?", answer: "Lessons are delivered through Zoom with high-definition audio, interactive whiteboard tools, and digital Quran screen sharing." },
  { question: "Can adults and complete beginners join?", answer: "Absolutely. We welcome students of all age groups, from 4-year-old toddlers to adults and new Muslims starting from Arabic letters." },
  { question: "What if a student misses a scheduled class?", answer: "We offer simple makeup class scheduling so your child never misses a lesson due to illness or family travel." },
  { question: "Do parents receive regular progress updates?", answer: "Yes! Parents receive detailed monthly progress reports tracking lesson completion, attendance, and Tajweed accuracy." },
  { question: "How long is each class session?", answer: "Class durations are flexible (choose between 30-minute or 45-minute sessions), customized according to the student's age, attention span, and plan." },
];

const policyDetails = [
  {
    title: "Attendance & Punctuality Policy",
    body: "Students should join each class on time and be ready with their Quran and learning materials. Consistent attendance helps students maintain progress and build a strong learning routine.",
  },
  {
    title: "Missed Class & Rescheduling",
    body: "If a student cannot attend a scheduled class, please inform the academy as early as possible. We will work with the student or family to arrange a suitable alternative time when available.",
  },
  {
    title: "Makeup Class Policy",
    body: "Makeup classes may be arranged for approved absences, subject to teacher availability. Families should coordinate with the academy team to confirm the new class time.",
  },
  {
    title: "Family Discount Fee Policy",
    body: "Families enrolling multiple students may be eligible for a family discount. Please contact the academy to discuss the available fee plan for your household.",
  },
  {
    title: "Ramadan Schedule Policy",
    body: "Class timings can be adjusted during Ramadan to suit the student and family schedule. Contact the academy in advance so we can help arrange the most convenient timing.",
  },
];

// 6-step learning workflow
const steps = [
  { step: "01", title: "Student Assessment", desc: "Evaluate student level, age, and individual learning goals during the 3-day free trial." },
  { step: "02", title: "Course Recommendation", desc: "Select the ideal course (Qaida, Tajweed, Hifz, or Tafseer) suited for your child." },
  { step: "03", title: "Personalized Study Plan", desc: "Set schedule according to your local timezone and preferred weekly frequency." },
  { step: "04", title: "Live Zoom Classes", desc: "Engage in 1-on-1 interactive live sessions with certified male or female tutors." },
  { step: "05", title: "Monthly Progress Reports", desc: "Track attendance, recitation accuracy, and monthly growth metrics." },
  { step: "06", title: "Course Certification", desc: "Receive an official completion certificate upon passing final evaluation." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [courseCategory, setCourseCategory] = useState<string>("All");
  const [activeDemoTab, setActiveDemoTab] = useState<string>("tajweed");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const [isAyahPlaying, setIsAyahPlaying] = useState(false);
  const [isAyahMuted, setIsAyahMuted] = useState(false);
  const ayahAudioRef = useRef<HTMLAudioElement | null>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    gender: "Male Student (Male Teacher)",
    country: "",
    course: "Noorani Qaida Course (Beginners)",
    parentName: "",
    whatsapp: "",
    email: "",
    preferredTime: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePolicy(null);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleAyahPlayback = async () => {
    if (!ayahAudioRef.current) return;

    if (isAyahPlaying) {
      ayahAudioRef.current.pause();
      setIsAyahPlaying(false);
      return;
    }

    try {
      await ayahAudioRef.current.play();
      setIsAyahPlaying(true);
    } catch (error) {
      console.error("Unable to play ayah audio:", error);
    }
  };

  const toggleAyahMute = () => {
    if (!ayahAudioRef.current) return;

    const nextMutedState = !isAyahMuted;
    ayahAudioRef.current.muted = nextMutedState;
    setIsAyahMuted(nextMutedState);
  };

  // Filter courses based on category
  const filteredCourses = courseCategory === "All"
    ? courses
    : courses.filter((c) => c.category === courseCategory);

  // Language switcher — opens Google Translate for the selected language
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    if (lang === "en") {
      // Reset to original page (remove translate cookie)
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    } else {
      document.cookie = `googtrans=/en/${lang}; path=/`;
      window.location.reload();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormSubmitted(true);
      setFormData({
        studentName: "",
        age: "",
        gender: "Male Student (Male Teacher)",
        country: "",
        course: "Noorani Qaida Course (Beginners)",
        parentName: "",
        whatsapp: "",
        email: "",
        preferredTime: "",
        notes: "",
      });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 7000);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="home" className="min-h-screen bg-[#0B132B] text-slate-100 overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0B132B]/85 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 text-lg font-bold text-white group"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-amber-400/30 shadow-lg shadow-amber-500/10 group-hover:border-amber-400/60 transition-all">
              <Image
                src="/logo.jpeg"
                alt="Safi Quran Academy Logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight tracking-tight text-white font-extrabold text-lg">SAFI QURAN</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400/90">ACADEMY</span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-1 transition-colors hover:text-amber-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-amber-400 after:to-emerald-500 after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden items-center gap-3.5 lg:flex">
            <a
              href="https://wa.me/923141899657"
              className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
            >
              <Phone size={13} className="text-emerald-400" />
              0314 1899657
            </a>

            <select
              value={selectedLang}
              onChange={handleLanguageChange}
              className="rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 outline-none cursor-pointer hover:border-amber-400/50 transition-all"
            >
              <option value="en">🌐 English</option>
              <option value="ur">اردو Urdu</option>
              <option value="ar">عربي Arabic</option>
              <option value="hi">हिन्दी Hindi</option>
              <option value="ps">پښتو Pashto</option>
              <option value="fa">دری Dari</option>
              <option value="pa">ਪੰਜਾਬੀ Punjabi</option>
            </select>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:shadow-emerald-600/40"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                3-Day Free Trial <Sparkles size={14} className="text-amber-300" />
              </span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-200 lg:hidden hover:border-amber-400 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-slate-800 bg-[#0B132B] px-4 py-5 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-3 font-medium text-slate-200">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-slate-800/80 hover:text-amber-300 transition"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={14} className="text-slate-500" />
                  </a>
                ))}
                <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2.5">
                  <a
                    href="https://wa.me/923141899657"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-white transition"
                  >
                    <MessageCircle size={16} /> WhatsApp: 0314 1899657
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30"
                  >
                    Book 3-Day Free Trial
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#0B132B] pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Ambient Glowing Orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-amber-500/15 blur-[120px] animate-pulse-glow" />
        <div className="pointer-events-none absolute top-1/3 right-10 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px] animate-float-delayed" />
        <div className="pointer-events-none absolute -bottom-10 left-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

        {/* Delicate background grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-emerald-500/15 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-300 shadow-inner backdrop-blur-md"
              >
                <Sparkles size={16} className="text-amber-400 animate-spin-slow" />
                <span>3-Day Free Trial • No Credit Card Required</span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.15]">
                Learn Quran Online with Certified{" "}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                  Male & Female
                </span>{" "}
                Teachers
              </h1>

              {/* Paragraph */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300 font-normal">
                At <span className="font-semibold text-white">Safi Quran Academy</span>, we provide personalized 1-on-1 live Quran classes. Master Tajweed, memorization, and Islamic values from home with flexible schedules.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="#contact"
                  className="group relative flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-600/30 transition-all hover:shadow-emerald-600/50"
                >
                  <span>Book 3-Day Free Trial</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.me/923141899657"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-emerald-400/50"
                >
                  <MessageCircle size={18} className="text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </motion.a>
              </div>

              {/* Highlight Badges */}
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {statsHighlights.slice(0, 6).map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05, duration: 0.4 }}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-3 text-xs text-slate-200 backdrop-blur-sm hover:border-amber-400/40 hover:bg-white/10 transition-all"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                        <Icon size={16} />
                      </div>
                      <span className="font-semibold leading-tight">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Hero Right Visual Mockup Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-amber-500/20 via-emerald-500/20 to-teal-500/10 blur-3xl animate-pulse-glow" />

              {/* Main Card Frame */}
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-[#0B132B]/90 p-5 sm:p-6 shadow-2xl shadow-black/60 backdrop-blur-xl">
                
                {/* Live Class Header Banner */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                      LIVE 1-ON-1 ZOOM CLASS IN PROGRESS
                    </span>
                  </div>
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    HD Interactive Classroom
                  </span>
                </div>

                {/* Tab Switcher inside preview */}
                <div className="mt-5 flex gap-2 rounded-xl bg-slate-950/60 p-1 border border-white/5">
                  {[
                    { id: "tajweed", label: "Tajweed Lesson" },
                    { id: "qaida", label: "Noorani Qaida" },
                    { id: "hifz", label: "Hifz Revision" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDemoTab(tab.id)}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                        activeDemoTab === tab.id
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Simulated Live Interface Box */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/90 via-slate-900 to-slate-950 p-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                    <Volume2 size={13} className="text-emerald-400 animate-pulse" />
                    <span>Audio Connected</span>
                  </div>

                  <div className="flex items-center gap-3 text-amber-300">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/15 border border-amber-400/30">
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {activeDemoTab === "tajweed" && "Recitation & Makharij Practice"}
                        {activeDemoTab === "qaida" && "Letter Recognition & Harakat"}
                        {activeDemoTab === "hifz" && "Surah Al-Mulk Memorization"}
                      </h4>
                      <p className="text-xs text-slate-400">Certified Tutor • Male / Female Tutors Available</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Surah Al-Kawthar • Complete Recitation</p>
                    <div className="mt-3 space-y-2">
                      {kawtharAyahs.map((ayah) => (
                        <div
                          key={ayah.number}
                          className="rounded-lg px-3 py-2"
                        >
                          <p dir="rtl" className="text-right text-xl leading-loose text-white">
                            {ayah.arabic} <span className="text-sm text-amber-300">۝{ayah.number}</span>
                          </p>
                          <p className="text-xs leading-relaxed text-slate-300">{ayah.translation}</p>
                        </div>
                      ))}
                    </div>
                    <audio
                      ref={ayahAudioRef}
                      src={kawtharAudioUrl}
                      preload="none"
                      onEnded={() => setIsAyahPlaying(false)}
                    />
                  </div>

                  {/* Quran audio player */}
                  <div className="mt-6 flex items-center justify-center gap-1.5 h-10 bg-slate-950/50 rounded-xl px-4 border border-white/5">
                    {[40, 75, 55, 90, 60, 30, 85, 100, 70, 45, 80, 60, 95, 50, 65, 35].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.3}%`] }}
                        transition={{ repeat: Infinity, duration: 1 + (i % 3) * 0.3, ease: "easeInOut" }}
                        className="w-1.5 bg-gradient-to-t from-emerald-500 to-amber-400 rounded-full"
                      />
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={toggleAyahPlayback}
                      className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    >
                      {isAyahPlaying ? <Pause size={15} /> : <Play size={15} />}
                      <span>{isAyahPlaying ? "Pause Ayah" : "Play Ayah"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={toggleAyahMute}
                      aria-label={isAyahMuted ? "Unmute ayah" : "Mute ayah"}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-amber-400/50 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                      {isAyahMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
                      <p className="text-[11px] font-medium text-slate-400">Class Type</p>
                      <p className="mt-1 text-sm font-bold text-white">1-on-1 Personalized</p>
                    </div>
                    <div className="rounded-xl bg-emerald-500/15 p-3.5 border border-emerald-500/20">
                      <p className="text-[11px] font-medium text-emerald-300">Class Schedule</p>
                      <p className="mt-1 text-sm font-bold text-emerald-200">Flexible Timezone</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Perks */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { icon: Users, label: "Live 1-on-1 Support" },
                    { icon: ShieldCheck, label: "Certified Huffaz & Aalims" },
                    { icon: MonitorPlay, label: "Interactive Zoom" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        whileHover={{ scale: 1.03 }}
                        className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-md"
                      >
                        <Icon className="mx-auto text-amber-400" size={20} />
                        <p className="mt-1.5 text-[11px] font-semibold text-slate-200 leading-tight">{item.label}</p>
                      </motion.div>
                    );
                  })}
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= ABOUT US & METRICS ================= */}
      <section id="about" className="relative bg-slate-900 py-24 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-400">
                <Compass size={14} /> Welcome to Safi Quran Academy
              </div>

              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight">
                Quran Education for Every Age and Learning Level.
              </h2>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300">
                At <span className="font-semibold text-white">Safi Quran Academy</span>, we are committed to providing high-quality online Quran education for children, adults, brothers, and sisters. Our experienced teachers help students learn the Quran with proper Tajweed, understanding, confidence, and Islamic values from the comfort of their homes.
              </p>

              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Our goal is not only to teach students how to read the Quran, but also to help them understand Islamic teachings, improve their character, strengthen their faith, and develop a lifelong connection with the Holy Quran.
              </p>

              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Whether you are a complete beginner, an adult learner, or someone looking to improve Tajweed and memorization, our structured courses are designed for every age and learning level.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-300">
                <div className="flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-4 py-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Female Tutors Available
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-4 py-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Free Rescheduling Policy
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-4 py-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Structured Curriculum
                </div>
              </div>
            </motion.div>

            {/* Mission, difference, and lifelong connection cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/80 to-slate-900 p-7 shadow-xl hover:border-amber-400/40 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-5">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Our Mission</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Accessible, affordable, and high-quality Quran education that maintains excellence in teaching, Islamic values, and overall student development.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/80 to-slate-900 p-7 shadow-xl hover:border-emerald-400/40 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 mb-5">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">A Lifelong Connection</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  We nurture understanding, confidence, strong character, and faith so every student can build a lasting relationship with the Holy Quran.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/80 to-slate-900 p-7 shadow-xl hover:border-amber-400/40 transition-all sm:col-span-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-5">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">What Makes Us Different?</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  We believe that every student learns differently. Our teachers create customized lesson plans according to each student&apos;s age, level, goals, and learning pace.
                </p>
              </motion.div>
            </div>

          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 p-6 md:grid-cols-4 shadow-2xl backdrop-blur-lg"
          >
            {[
              ["1500+", "Active Students"],
              ["50+", "Qualified Teachers"],
              ["4.9/5", "Student Rating"],
              ["Thousands", "Hours Taught"],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl bg-slate-800/70 p-5 text-center border border-white/5 shadow-md"
              >
                <p className="text-3xl font-extrabold bg-gradient-to-r from-amber-300 to-emerald-400 bg-clip-text text-transparent">
                  {value}
                </p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">{label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US (FEATURES) ================= */}
      <section className="relative bg-[#0B132B] py-24 text-white overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[130px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Why Choose Safi Quran Academy?
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight">
              Everything You Need for a Strong & Inspiring Quran Journey.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              We combine traditional Islamic scholarship with modern interactive online tools to deliver an unparalleled 1-on-1 learning experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-900/60 p-7 shadow-xl backdrop-blur-md transition-all hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-tr from-amber-400/20 to-emerald-400/20 border border-amber-400/30 p-3.5 text-amber-400 shadow-md transition-transform group-hover:scale-110 group-hover:border-amber-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {feature.body}
                  </p>
                </motion.article>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= COURSES CATALOG WITH CATEGORY FILTERS ================= */}
      <section id="courses" className="relative bg-slate-900 py-24 text-white border-t border-slate-800">
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header & Filter Tabs */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                Our Structured Programs
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Courses for Every Age & Level
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-950/90 p-1.5 border border-slate-800">
              {["All", "Kids", "Adults", "Tajweed & Hifz"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCourseCategory(cat)}
                  className={`relative rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    courseCategory === cat
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          <motion.div layout className="grid gap-7 lg:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {filteredCourses.map((course) => {
                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={course.id}
                    className={`group relative overflow-hidden rounded-3xl border bg-slate-950/80 shadow-2xl backdrop-blur-md transition-all ${
                      course.popular
                        ? "border-amber-400/50 shadow-amber-500/10"
                        : "border-slate-800 hover:border-emerald-500/40"
                    }`}
                  >
                    {/* Course Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      {/* Gradient overlay so card content reads well */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0a0f1e]/80" />
                      {/* Popular badge overlaid on image */}
                      {course.popular && (
                        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-[11px] font-extrabold text-slate-900 shadow-md">
                          <Sparkles size={11} /> Popular
                        </span>
                      )}
                    </div>

                    <div className="p-7">
                      
                      {/* Badge & Target */}
                      <div className="flex items-center gap-2">
                        <span className="inline-flex rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-300">
                          {course.target}
                        </span>
                      </div>

                      {/* Course Title */}
                      <h3 className="mt-4 text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {course.title}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Topics List */}
                      <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-5">
                        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Key Syllabus Highlights:</p>
                        {course.topics.map((topic) => (
                          <div key={topic} className="flex items-center gap-2.5 text-xs text-slate-200">
                            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA & Expand Toggle */}
                      <div className="mt-7 flex items-center justify-between pt-4 border-t border-slate-800">
                        <a
                          href="#contact"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all"
                        >
                          {course.cta} <ArrowRight size={14} />
                        </a>

                        <a
                          href="https://wa.me/923141899657"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                        >
                          <MessageCircle size={14} /> Ask Info
                        </a>
                      </div>

                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* ================= 6-STEP METHODOLOGY & TEACHERS ================= */}
      <section id="teachers" className="bg-slate-900 py-24 text-white border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            
            {/* Left Info */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                Teachers & Teaching Methodology
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight">
                Certified Male & Female Educators with a Patient, Encouraging Approach.
              </h2>
              <p className="mt-6 text-base text-slate-300 leading-relaxed">
                Our faculty consists of certified Hafiz, Alim, and Alimah tutors who have years of online teaching experience. We match every student with the right instructor to suit their language, age group, and learning pace.
              </p>

              <div className="mt-8">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Languages Spoken by Tutors:</p>
                <div className="flex flex-wrap gap-2">
                  {["English", "Urdu", "Arabic", "Hindi", "Pashto", "Dari", "Punjabi"].map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Global Reach Banner */}
              <div className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Globe className="text-emerald-400 shrink-0" size={24} />
                  <div>
                    <h4 className="text-sm font-bold text-white">Serving Students Globally</h4>
                    <p className="mt-1 text-xs text-slate-300">
                      Pakistan, Afghanistan, USA, Canada, UK, Australia, KSA, UAE, Qatar, Oman, Kuwait, Bahrain & Europe.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right 6-Step Roadmap */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-slate-800 bg-slate-950/80 p-7 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-amber-400" size={20} /> Our 6-Step Learning Journey
              </h3>

              <div className="mt-8 space-y-4">
                {steps.map((item, idx) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/90 p-4 transition-all hover:border-amber-400/40 hover:bg-slate-900"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-xs font-black text-slate-950 shadow-md">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="mt-1 text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= REVIEWS & TESTIMONIALS ================= */}
      <section id="reviews" className="relative bg-[#0B132B] py-24 text-white overflow-hidden">
        <div className="pointer-events-none absolute top-1/3 left-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Testimonials & Parent Reviews
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Trusted by Families Worldwide
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Read real feedback from parents and students who are building a lifelong connection with the Holy Quran.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-xl backdrop-blur-md hover:border-amber-400/40 transition-all"
              >
                <div>
                  {/* Star rating */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm italic text-slate-200 leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{item.name}</p>
                    <p className="text-xs text-amber-400">{item.location}</p>
                  </div>
                  <CheckCircle className="text-emerald-400 shrink-0" size={20} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section id="faq" className="bg-slate-900 py-24 text-white border-t border-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14 text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Everything Parents & Students Ask
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Have questions before getting started? Here are answers to common inquiries.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    isOpen
                      ? "border-amber-400/50 bg-slate-800/90 shadow-lg shadow-amber-500/5"
                      : "border-slate-800 bg-slate-950/70 hover:border-slate-700"
                  }`}
                >
                  <button
                    className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                  >
                    <span className="text-base font-bold text-white pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-amber-400"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-t border-white/5 px-6 py-4 text-sm text-slate-300 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= REGISTRATION FORM (CONTACT) ================= */}
      <section id="contact" className="relative bg-[#0B132B] py-24 text-white overflow-hidden">
        <div className="pointer-events-none absolute top-10 right-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            
            {/* Form Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                100% 3-Day Free Trial Registration
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight">
                Book Your 3-Day Free Trial Today.
              </h2>
              <p className="mt-6 text-base text-slate-300 leading-relaxed">
                Fill out the simple form to schedule your complimentary 3-day trial sessions. Our academic coordinator will contact you promptly via WhatsApp or email to confirm your class time.
              </p>

              {/* Direct WhatsApp Box */}
              <div className="mt-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 to-emerald-950/40 p-6 shadow-xl">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageCircle className="text-emerald-400" size={20} /> Prefer Immediate Assistance?
                </h4>
                <p className="mt-2 text-xs text-slate-300">
                  Chat directly with our administrative team on WhatsApp for instant scheduling.
                </p>
                <a
                  href="https://wa.me/923141899657"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp: 0314 1899657
                </a>
              </div>
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-white/15 bg-slate-900/90 p-7 sm:p-9 shadow-2xl backdrop-blur-xl relative"
            >
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-4">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Registration Received!</h3>
                  <p className="mt-3 text-sm text-slate-300 max-w-md mx-auto">
                    JazakAllah Khair for registering. Our team will reach out to you via WhatsApp at the provided number to confirm your 3-day free trial class timing.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Student Full Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        placeholder="e.g. Abdullah Khan"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Student Age *</label>
                      <input
                        required
                        type="text"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        placeholder="e.g. 8 years old"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Gender Preference</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-400 transition"
                      >
                        <option className="bg-slate-900">Male Student (Male Teacher)</option>
                        <option className="bg-slate-900">Female Student (Female Teacher)</option>
                        <option className="bg-slate-900">Young Child (Male/Female Tutors)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Country *</label>
                      <input
                        required
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        placeholder="e.g. USA, UK, Canada, KSA"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course Interest</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-400 transition"
                      >
                        <option className="bg-slate-900">Noorani Qaida Course (Beginners)</option>
                        <option className="bg-slate-900">Nazra Quran Course (Fluency)</option>
                        <option className="bg-slate-900">Quran with Tajweed Course</option>
                        <option className="bg-slate-900">Hifz-ul-Quran (Memorization)</option>
                        <option className="bg-slate-900">Islamic Studies & Ethics</option>
                        <option className="bg-slate-900">Duas & Salah Step-by-Step</option>
                        <option className="bg-slate-900">Quran Translation & Tafseer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Parent / Contact Name</label>
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 transition"
                        placeholder="Parent Name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp Number *</label>
                      <input
                        required
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 transition"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Class Time / Timezone</label>
                      <input
                        type="text"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 transition"
                        placeholder="e.g. 6:00 PM EST (Evenings)"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Additional Notes / Selected Plan</label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 transition resize-none"
                        placeholder="Any specific learning requirements or selected plan..."
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 py-4 text-sm font-extrabold text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit Registration - Get 3-Day Free Trial"}</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#070C1B] py-16 text-slate-400 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            
            <div className="min-w-0 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30">
                  <BookOpen size={20} />
                </div>
                <span className="text-xl font-extrabold text-white tracking-tight">Safi Quran Academy</span>
              </div>
              <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-slate-400">
                Providing high-quality online Quran education for kids and adults worldwide through 1-on-1 interactive live sessions with certified tutors. Learn with confidence from home.
              </p>
              <div className="mt-5 space-y-1.5 text-xs text-slate-300 font-medium">
                <p>WhatsApp: 0314 1899657 | 0323 9847638</p>
                <p>Email: safiquranaacademy@gmail.com</p>
                <p>Website: www.safiquranacademy.com</p>
              </div>
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Social & Admin</h4>
              <div className="mt-4 space-y-2 text-xs font-semibold">
                <a className="block text-slate-400 hover:text-amber-300 transition" href="https://wa.me/923141899657">WhatsApp: 0314 1899657</a>
                <a className="block text-slate-400 hover:text-amber-300 transition" href="https://wa.me/923239847638">WhatsApp: 0323 9847638</a>
                <a className="block text-slate-400 hover:text-amber-300 transition" href="#">Facebook Page</a>
                <a className="block text-slate-400 hover:text-amber-300 transition" href="#">Instagram Channel</a>
                <a className="block text-slate-400 hover:text-amber-300 transition" href="#">YouTube Lessons</a>
              </div>
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Academy Policies</h4>
              <div className="mt-4 space-y-2 text-xs text-slate-400 font-medium">
                {policyDetails.map((policy) => (
                  <button
                    key={policy.title}
                    type="button"
                    onClick={() => setActivePolicy(policy.title)}
                    className="block w-full text-left transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070C1B]"
                  >
                    {policy.title}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-12 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500">
            © 2026 SAFI QURAN ACADEMY. All Rights Reserved. Designed for Excellence in Quranic Education.
          </div>
        </div>
      </footer>

      {activePolicy && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setActivePolicy(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
            className="w-full max-w-lg rounded-3xl border border-amber-400/30 bg-[#0B132B] p-6 text-slate-100 shadow-2xl shadow-black/50 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5">
              <h2 id="policy-modal-title" className="text-xl font-bold text-white sm:text-2xl">
                {activePolicy}
              </h2>
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                aria-label="Close policy dialog"
                className="rounded-full p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              {policyDetails.find((policy) => policy.title === activePolicy)?.body}
            </p>
          </div>
        </div>
      )}

      {/* ================= FLOATING ACTION BUTTONS ================= */}
      {/* WhatsApp Floating Button with double pulsing aura */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/923141899657"
          aria-label="Chat on WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/50 border border-emerald-400"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <MessageCircleMore size={28} className="relative z-10" />
        </motion.a>

        {/* Mobile floating quick book button */}
        <a
          href="#contact"
          className="rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-xl shadow-amber-500/20 lg:hidden border border-amber-300"
        >
          Book 3-Day Free Trial
        </a>
      </div>

    </main>
  );
}
