"use client";

import React from "react";
import { useEditorStore } from "@/store/editorStore";
import { X, Layout, CreditCard, UserCircle, BarChart3, ShoppingCart, MessageSquare } from "lucide-react";

const TEMPLATES = [
  {
    name: "Dashboard Layout",
    description: "Stats cards with chart placeholder and sidebar navigation",
    icon: Layout,
    code: `export default function Component() {
  const stats = [
    { label: "Total Revenue", value: "$48,290", change: "+12.5%", up: true },
    { label: "Active Users", value: "2,847", change: "+8.2%", up: true },
    { label: "Conversion Rate", value: "3.24%", change: "-0.4%", up: false },
    { label: "Avg. Session", value: "4m 32s", change: "+1.1%", up: true },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-1 shrink-0">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">D</div>
          <span className="font-bold text-sm text-white">DashPanel</span>
        </div>
        {["Overview", "Analytics", "Projects", "Members", "Settings"].map((item, i) => (
          <button key={item} className={\`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition \${i === 0 ? "bg-indigo-600/15 text-indigo-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}\`}>
            {item}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-auto">
        <div>
          <h1 className="text-xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              <span className={\`text-xs font-semibold mt-2 inline-block \${stat.up ? "text-emerald-400" : "text-rose-400"}\`}>{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white mb-4">Revenue Over Time</h3>
          <div className="h-48 bg-slate-950 rounded-lg border border-slate-800 border-dashed flex items-center justify-center">
            <span className="text-xs text-slate-600">Chart visualization area</span>
          </div>
        </div>
      </main>
    </div>
  );
}`,
  },
  {
    name: "Pricing Page",
    description: "3-tier pricing cards with popular badge and feature lists",
    icon: CreditCard,
    code: `export default function Component() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "Free forever",
      features: ["5 projects", "Basic analytics", "Community support", "1GB storage"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      features: ["Unlimited projects", "Advanced analytics", "Priority support", "50GB storage", "Custom domains", "API access"],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      features: ["Everything in Pro", "SSO & SAML", "Dedicated account manager", "Unlimited storage", "SLA guarantee", "Custom integrations"],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12 max-w-lg">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Pricing</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 mb-3">Simple, transparent pricing</h1>
        <p className="text-sm text-slate-400">No hidden fees. Upgrade, downgrade, or cancel anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={\`relative bg-slate-900 rounded-2xl p-8 flex flex-col border transition hover:scale-[1.02] \${
              plan.popular ? "border-indigo-500 shadow-xl shadow-indigo-600/10" : "border-slate-800 hover:border-slate-700"
            }\`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-black text-white">{plan.price}</span>
              <span className="text-xs text-slate-400 ml-2">{plan.period}</span>
            </div>
            <ul className="space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="text-emerald-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              className={\`w-full mt-8 py-3 rounded-lg font-semibold text-sm transition \${
                plan.popular
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }\`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  {
    name: "User Profile",
    description: "Avatar, bio section, stats counters and action buttons",
    icon: UserCircle,
    code: `export default function Component() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        {/* Cover + Avatar */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-t-2xl" />
          <div className="absolute -bottom-10 left-6">
            <div className="h-20 w-20 rounded-full bg-slate-900 border-4 border-slate-950 flex items-center justify-center text-2xl font-black text-indigo-400">
              JD
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 border-t-0 rounded-b-2xl pt-14 pb-6 px-6 space-y-6">
          {/* Name & Bio */}
          <div>
            <h2 className="text-lg font-bold text-white">Jane Doe</h2>
            <p className="text-xs text-indigo-400 font-medium">@janedoe · Product Designer</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Design-obsessed creator building beautiful interfaces and scalable systems. Passionate about wireframe-to-code automation and creative tooling.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Projects", value: "142" },
              { label: "Followers", value: "8.2K" },
              { label: "Likes", value: "24.5K" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-slate-950 rounded-xl py-3 border border-slate-800">
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition shadow-lg shadow-indigo-600/20">
              Follow
            </button>
            <button className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition">
              Message
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {["UI Design", "React", "Figma", "Tailwind", "Motion"].map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-[10px] font-medium rounded-full border border-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    name: "Analytics Panel",
    description: "KPI metrics with progress bars and trend indicators",
    icon: BarChart3,
    code: `export default function Component() {
  const kpis = [
    { label: "Page Views", value: "128,450", progress: 78, color: "bg-indigo-500", change: "+14.2%" },
    { label: "Bounce Rate", value: "32.4%", progress: 32, color: "bg-amber-500", change: "-2.8%" },
    { label: "Avg. Duration", value: "3m 48s", progress: 65, color: "bg-emerald-500", change: "+5.1%" },
    { label: "Conversion", value: "4.82%", progress: 48, color: "bg-rose-500", change: "+1.3%" },
  ];

  const channels = [
    { name: "Organic Search", sessions: "45,230", pct: 42 },
    { name: "Direct Traffic", sessions: "28,100", pct: 26 },
    { name: "Social Media", sessions: "18,940", pct: 18 },
    { name: "Referral", sessions: "15,680", pct: 14 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-xl font-bold text-white">Analytics Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Performance metrics for the last 30 days</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 font-medium">{kpi.label}</p>
                <span className={\`text-[10px] font-bold \${kpi.change.startsWith("+") ? "text-emerald-400" : "text-rose-400"}\`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={\`h-full rounded-full \${kpi.color} transition-all duration-700\`} style={{ width: \`\${kpi.progress}%\` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Traffic Channels */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Traffic Channels</h3>
          <div className="space-y-3">
            {channels.map((ch) => (
              <div key={ch.name} className="flex items-center gap-4">
                <span className="text-xs text-slate-300 w-32 shrink-0">{ch.name}</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: \`\${ch.pct}%\` }} />
                </div>
                <span className="text-xs text-slate-400 w-16 text-right">{ch.sessions}</span>
                <span className="text-[10px] text-indigo-400 font-bold w-10 text-right">{ch.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    name: "E-commerce Card",
    description: "Product card with image placeholder, price and add to cart",
    icon: ShoppingCart,
    code: `export default function Component() {
  const products = [
    { name: "Wireless Headphones", price: "$129.99", oldPrice: "$179.99", rating: 4.8, reviews: 342, badge: "Best Seller" },
    { name: "Smart Watch Pro", price: "$249.00", oldPrice: "$299.00", rating: 4.6, reviews: 189, badge: "New" },
    { name: "Portable Speaker", price: "$79.99", oldPrice: null, rating: 4.5, reviews: 567, badge: null },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-white">Featured Products</h1>
          <p className="text-sm text-slate-400 mt-2">Handpicked items for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.name} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition hover:shadow-xl hover:shadow-indigo-600/5">
              {/* Image Area */}
              <div className="relative h-48 bg-slate-950 flex items-center justify-center border-b border-slate-800/50">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/10 flex items-center justify-center">
                  <span className="text-3xl">📦</span>
                </div>
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-5 space-y-3">
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition">{product.name}</h3>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400 text-xs">{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}</div>
                  <span className="text-[10px] text-slate-400">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-white">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-xs text-slate-500 line-through">{product.oldPrice}</span>
                  )}
                </div>
                <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition shadow-lg shadow-indigo-600/20">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    name: "Chat Interface",
    description: "Message bubbles with timestamp and input field",
    icon: MessageSquare,
    code: `export default function Component() {
  const messages = [
    { id: 1, sender: "other", name: "Alex", text: "Hey! Have you seen the latest wireframe designs?", time: "10:24 AM" },
    { id: 2, sender: "me", name: "You", text: "Yes! They look amazing. The dashboard layout is really clean.", time: "10:25 AM" },
    { id: 3, sender: "other", name: "Alex", text: "Thanks! I used the AI generator to convert my sketch. It took less than 10 seconds 🚀", time: "10:26 AM" },
    { id: 4, sender: "me", name: "You", text: "That's incredible. Let me try it with the pricing page mockup I drew yesterday.", time: "10:28 AM" },
    { id: 5, sender: "other", name: "Alex", text: "Go for it! The results will surprise you. Let me know if you need any help.", time: "10:29 AM" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
        {/* Header */}
        <div className="border-b border-slate-800 px-5 py-4 flex items-center gap-3 shrink-0">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">A</div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Alex Morgan</p>
            <p className="text-[10px] text-emerald-400 font-medium">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={\`flex \${msg.sender === "me" ? "justify-end" : "justify-start"}\`}>
              <div className={\`max-w-[75%] px-4 py-2.5 rounded-2xl \${
                msg.sender === "me"
                  ? "bg-indigo-600 text-white rounded-br-md"
                  : "bg-slate-800 text-slate-200 rounded-bl-md"
              }\`}>
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <p className={\`text-[9px] mt-1 \${msg.sender === "me" ? "text-indigo-200" : "text-slate-500"}\`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-slate-800 p-3 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
          <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition shrink-0">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}`,
  },
];

export function TemplateGallery() {
  const { generatedCode, setGeneratedCode } = useEditorStore();

  // Use a local state for visibility since the store may not have showTemplateGallery
  const [isOpen, setIsOpen] = React.useState(false);

  // Expose open/close via a global method attached to window for easy triggering
  React.useEffect(() => {
    (window as any).__openTemplateGallery = () => setIsOpen(true);
    return () => {
      delete (window as any).__openTemplateGallery;
    };
  }, []);

  const handleSelect = (code: string) => {
    setGeneratedCode(code);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Template Gallery</h2>
            <p className="text-xs text-slate-400 mt-1">Pick a starter template to jumpstart your design</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map((template) => {
              const IconComponent = template.icon;
              return (
                <button
                  key={template.name}
                  onClick={() => handleSelect(template.code)}
                  className="group text-left bg-slate-950 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/50 hover:bg-slate-950/80 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-600/5 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/20 transition">
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition">
                        {template.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {template.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[10px] text-indigo-400 font-semibold opacity-0 group-hover:opacity-100 transition">
                    <span>Use Template</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
