"use client";

import { useState, useEffect } from "react";

// Use 768px to match Tailwind's 'md' breakpoint
export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // 1. Create a media query list
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    // 2. Define a handler to update state
    const onChange = () => {
      setIsMobile(mql.matches);
    };

    // 3. Attach listener
    mql.addEventListener("change", onChange);

    // 4. Set initial state
    setIsMobile(mql.matches);

    // 5. Cleanup listener on unmount
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
};
