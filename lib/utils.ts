import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate base64 mock sketch or generic sample sketch
export function getMockSketchThumbnail(): string {
  return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231f1f23'/><line x1='10' y1='10' x2='90' y2='90' stroke='%238b5cf6' stroke-width='2'/><line x1='90' y1='10' x2='10' y2='90' stroke='%238b5cf6' stroke-width='2'/><circle cx='50' cy='50' r='10' fill='%23a78bfa'/></svg>";
}

// Generate pre-loaded templates for preview demo
export const DEMO_PRESETS = [
  {
    name: "Dashboard Grid",
    description: "Multi-card metric dashboard layout with active tabs",
    code: `export default function Component() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Hackathon Dashboard</h1>
            <p className="text-slate-400 text-sm">Real-time statistics & team performance telemetry</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-medium rounded-lg shadow-lg shadow-indigo-600/20">
            Deploy Live
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
            <h3 className="text-slate-400 text-sm font-medium">Monthly Active Sessions</h3>
            <p className="text-3xl font-bold mt-2 text-white">42,892</p>
            <div className="mt-2 text-xs text-emerald-400 flex items-center">
              <span>+18.2% from last month</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
            <h3 className="text-slate-400 text-sm font-medium">Generation Success Rate</h3>
            <p className="text-3xl font-bold mt-2 text-white">99.4%</p>
            <div className="mt-2 text-xs text-emerald-400 flex items-center">
              <span>Stable API connections</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
            <h3 className="text-slate-400 text-sm font-medium">Vibe Coding Score</h3>
            <p className="text-3xl font-bold mt-2 text-white">98.5/100</p>
            <div className="mt-2 text-xs text-indigo-400 flex items-center">
              <span>Excellent system speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    name: "Pricing Cards",
    description: "Harmonious price packages with hover states",
    code: `export default function Component() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center p-6">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">Flexible Pricing Plans</h2>
        <p className="text-neutral-400">Choose the best plan to supercharge your design-to-code workflow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {/* Free Plan */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between hover:scale-[1.02] transition">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Free</h3>
            <p className="text-neutral-400 text-sm mb-6">Perfect for small test drives</p>
            <div className="text-3xl font-black mb-6">$0</div>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-center">✓ 10 generations per month</li>
              <li className="flex items-center">✓ Custom drawing tools</li>
              <li className="flex items-center text-neutral-500">✗ Public share links</li>
            </ul>
          </div>
          <button className="w-full mt-8 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white font-semibold transition">
            Start Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-neutral-900 border-2 border-indigo-600 rounded-2xl p-8 flex flex-col justify-between relative hover:scale-[1.02] transition">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-xs font-bold rounded-full text-white uppercase tracking-wider">
            Most Popular
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
            <p className="text-neutral-400 text-sm mb-6">For power builders</p>
            <div className="text-3xl font-black mb-6">$12 <span className="text-sm text-neutral-500">/mo</span></div>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-center">✓ Unlimited generations</li>
              <li className="flex items-center">✓ Priority AI processing</li>
              <li className="flex items-center">✓ Unlimited project exports</li>
            </ul>
          </div>
          <button className="w-full mt-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold transition shadow-lg shadow-indigo-600/30">
            Get Pro
          </button>
        </div>

        {/* Team Plan */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between hover:scale-[1.02] transition">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Team</h3>
            <p className="text-neutral-400 text-sm mb-6">For corporate innovators</p>
            <div className="text-3xl font-black mb-6">$49 <span className="text-sm text-neutral-500">/mo</span></div>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-center">✓ Unlimited workspace seats</li>
              <li className="flex items-center">✓ Shared library storage</li>
              <li className="flex items-center">✓ Premium SLA Support</li>
            </ul>
          </div>
          <button className="w-full mt-8 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white font-semibold transition">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}`
  }
];
