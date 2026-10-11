"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  wrapperClassName?: string;
}

export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc = "/images/products/product-full-cream-milk.jpg",
  ...props
}: SmartImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-slate-100", wrapperClassName)}>
      <Image
        {...props}
        src={imgSrc}
        alt={alt || "Divyam Dairy Products"}
        className={cn(
          "transition-all duration-500 ease-out",
          isLoading ? "scale-105 blur-sm opacity-70" : "scale-100 blur-0 opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
            setIsLoading(false);
          }
        }}
      />
    </div>
  );
}
