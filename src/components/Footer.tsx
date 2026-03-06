"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026); // fallback year

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="text-center text-sm text-[#86868b]">
          © {currentYear} Vercel Daily. All rights reserved.
        </div>
      </div>
    </footer>
  );
}