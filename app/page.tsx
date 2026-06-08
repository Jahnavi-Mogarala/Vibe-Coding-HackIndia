"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Sparkles, Palette, Zap, Code, ShieldCheck, ChevronRight, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const features = [
    {
      icon: <Palette className="text-indigo-400" size={20} />,
      title: "Canvas Drawing Engine",
      desc: "Freehand drawing tools tailored for UI mockups with custom undo/redo actions.",
    },
    {
      icon: <Zap className="text-indigo-400" size={20} />,
      title: "Real-time AI Pipeline",
      desc: "Direct Claude Vision API parser generating standard production JSX in seconds.",
    },
    {
      icon: <Code className="text-indigo-400" size={20} />,
      title: "Live Sandpack Previews",
      desc: "Instant live rendering with Tailwind compilation and console telemetry reports.",
    },
    {
      icon: <ShieldCheck className="text-indigo-400" size={20} />,
      title: "Version History",
      desc: "Autosave versions, compare visual differences, and export as ZIP files.",
    },
  ];

  const pricing = [
    {
      name: "Free Trial",
      price: "$0",
      desc: "Perfect for testing ideas and quick wireframes.",
      features: ["10 AI generations total", "Standard drawing canvas", "Basic JSX export", "Sandbox integrations"],
      cta: "Get Started",
      link: "/dashboard",
      popular: false,
    },
    {
      name: "Pro Builder",
      price: "$12",
      period: "/mo",
      desc: "For serious developers & elite hackathon builders.",
      features: ["Unlimited generations", "High priority queue lines", "Custom style modifiers", "Zip & GitHub exports", "Shared preview links"],
      cta: "Upgrade to Pro",
      link: "/dashboard",
      popular: true,
    },
    {
      name: "Team Suite",
      price: "$49",
      period: "/mo",
      desc: "Collaborative design workspace for companies.",
      features: ["Shared team storage dashboards", "Custom brand templates", "20 active editor slots", "Corporate SLA guarantee"],
      cta: "Contact Sales",
      link: "/dashboard",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto text-center space-y-8 overflow-hidden w-full">
        {/* Glow rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold">
            <Sparkles size={12} />
            <span>Next-Gen Design-to-Code Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-none text-white">
            Convert Hand-Drawn Sketches <br />
            Into <span className="text-indigo-400 bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Live Tailwind Code</span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Sketch your interface layout on our HTML5 canvas or upload a paper photo. Watch Claude 3.5 Sonnet structure real React code with instant hot reload.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-xl shadow-indigo-600/20"
          >
            <span>Launch Canvas Editor</span>
            <ChevronRight size={16} />
          </Link>

          <a
            href="#pricing"
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold rounded-xl transition"
          >
            View Pricing
          </a>
        </motion.div>
      </section>

      {/* Visual Canvas Demo Container */}
      <section className="px-6 pb-20 max-w-6xl mx-auto w-full">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-950 rounded-xl overflow-hidden min-h-[360px]">
            {/* Left simulated canvas sketch */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Canvas drawing</span>
                <h3 className="text-lg font-bold text-white mt-1">Freehand Wireframing</h3>
                <p className="text-xs text-slate-400 mt-1">Simple squares and text become cards, charts, and buttons.</p>
              </div>
              <div className="my-8 flex items-center justify-center">
                <svg width="240" height="150" viewBox="0 0 240 150" className="opacity-80">
                  <rect x="5" y="5" width="230" height="140" rx="8" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" />
                  <rect x="15" y="15" width="210" height="25" rx="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                  <circle cx="30" cy="27.5" r="5" fill="#8b5cf6" />
                  <line x1="50" y1="27.5" x2="100" y2="27.5" stroke="#8b5cf6" strokeWidth="2" />
                  <rect x="15" y="55" width="60" height="40" rx="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                  <rect x="90" y="55" width="60" height="40" rx="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                  <rect x="165" y="55" width="60" height="40" rx="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                  <rect x="15" y="110" width="210" height="25" rx="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
              </div>
            </div>

            {/* Right generated output code */}
            <div className="p-8 bg-slate-900/40 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Live Preview</span>
                <h3 className="text-lg font-bold text-white mt-1">Live Component Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">Hot reloading react views with absolute Tailwind classes.</p>
              </div>
              <div className="my-6 bg-slate-950 p-4 border border-slate-800 rounded-lg text-xs font-mono text-indigo-300">
                <span className="text-slate-500">export default function Component() &#123;</span> <br />
                &nbsp;&nbsp;return (<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;div className=&quot;p-6 bg-slate-900 rounded-2xl&quot;&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1 className=&quot;text-white font-bold&quot;&gt;Dashboard&lt;/h1&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;...
              </div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold">
                <span>Instantly editable code outputs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="bg-slate-900/40 border-y border-slate-900 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">Full-Stack Design Telemetry</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Every piece is built to support maximum customization, enabling code sandboxes to function on hot-reload hooks.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
                <div className="p-2.5 bg-indigo-500/10 w-fit rounded-lg mb-4">{feat.icon}</div>
                <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Simple Pricing Plans</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">Start free and scale up as you build complex project flows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between relative hover:scale-[1.01] transition ${
                plan.popular ? "border-indigo-500" : "border-slate-800"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-bold tracking-widest text-white uppercase">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-xs text-slate-500">{plan.period}</span>}
                </div>
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="text-indigo-400">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={plan.link}
                className={`w-full py-3 rounded-xl text-center text-xs font-bold transition ${
                  plan.popular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10"
                    : "bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ accordions */}
      <section className="bg-slate-900/40 border-t border-slate-900 py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about the sketch compiler.</p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle size={15} className="text-indigo-400" />
                <span>How does the drawing canvas interface convert drawings?</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                When you click 'Compile', the canvas draws a flattened base64 png and pushes it to our API wrapper. The router utilizes the Claude Vision API pipeline with custom structural system prompts to map coordinates to elements.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle size={15} className="text-indigo-400" />
                <span>Does the output support responsive Tailwind CSS styling?</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                Yes! The system prompt enforces responsive viewport classes and hover triggers. You can test these outputs directly with the Live Sandpack preview viewport toggles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer footer layout */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-indigo-600 rounded flex items-center justify-center text-white font-extrabold text-xs">
              W
            </div>
            <span className="font-bold text-slate-300">WireframeToApp</span>
          </div>
          <p>© {new Date().getFullYear()} WireframeToApp. Built for Vibe Coding HackIndia.</p>
        </div>
      </footer>
    </div>
  );
}
