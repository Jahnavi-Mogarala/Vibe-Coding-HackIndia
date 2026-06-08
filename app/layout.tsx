import React from "react";
import "./index.css";

export const metadata = {
  title: "WireframeToApp - Convert sketches into React components",
  description: "Elite design-to-code prototype tool converting hand-drawn wireframes into production ready React & Tailwind markup.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-600/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
