"use client";

import { useState } from "react";
import { User } from "lucide-react";

/**
 * A member portrait: shows /public/images/team/member-0X.jpg (object-cover) if
 * it exists, otherwise a quiet --bg-inset placeholder with a centered User icon
 * so it reads "photo goes here", never broken. Drop the file in with zero code
 * change. The image fades in on load, so a missing file leaves the placeholder.
 */
export default function TeamPhoto({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0">
      <div className="grid h-full w-full place-items-center bg-bg-inset">
        <User className="h-7 w-7 text-text-3" aria-hidden />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
