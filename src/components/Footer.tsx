"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SEO_DEFAULTS, COMMON_STYLES } from "@/lib/constants";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026); // fallback year

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className={cn(
          "text-center",
          COMMON_STYLES.BODY_TEXT
        )}>
          © {currentYear} {SEO_DEFAULTS.SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}