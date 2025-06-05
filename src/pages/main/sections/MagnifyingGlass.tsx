"use client";

import type React from "react";

import { useState, useRef } from "react";

interface MagnifyingGlassProps {
  src: string;
  alt: string;
  magnifierSize?: number;
  magnification?: number;
  className?: string;
}

export default function MagnifyingGlass({
  src,
  alt,
  magnifierSize = 150,
  magnification = 2,
  className = "",
}: MagnifyingGlassProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    // Get image dimensions and position
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    // Calculate cursor position relative to the image
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Set cursor position as percentage of image dimensions
    setCursorPosition({
      x: (x / width) * 100,
      y: (y / height) * 100,
    });

    // Calculate magnifier position
    // Adjust position to center the magnifier on the cursor
    setPosition({
      x: x - magnifierSize / 2,
      y: y - magnifierSize / 2,
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-cover"
      />

      {showMagnifier && (
        <div
          className="absolute pointer-events-none border-2 border-blue-400 rounded-full shadow-lg"
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            left: `${position.x}px`,
            top: `${position.y}px`,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${
              cursorPosition.x - (magnification - 1) * 10
            }% ${cursorPosition.y - (magnification - 1) * 20}%`,
            backgroundSize: `${magnification * 300}%`,
            backgroundRepeat: "no-repeat",
            zIndex: 10,
          }}
        >
          <div className="absolute inset-0 bg-blue-400/10 mix-blend-overlay rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-400/30 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
