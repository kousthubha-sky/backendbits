"use client";

import { useEffect } from "react";

export function DeviconLoader() {
  useEffect(() => {
    // Check if devicon CSS is already loaded
    const existingLink = document.querySelector('link[href*="devicon"]');
    if (existingLink) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    document.head.appendChild(link);
  }, []);

  return null; // This component doesn't render anything
}