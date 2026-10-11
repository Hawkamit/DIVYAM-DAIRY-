"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export interface StepItem {
  number: string;
  title: string;
  text: string;
  image?: string;
}

export interface StepsFlowProps {
  steps: StepItem[];
  accentColor?: string;
  lineColor?: string;
  cornerMaskColor?: string;
  numberColor?: string;
  titleColor?: string;
  textColor?: string;
  numberTitleGap?: number;
  titleTextGap?: number;
  gridGap?: number;
  imageRadius?: number;
  mobileBreakpoint?: number;
  imageAnimation?: "none" | "fade" | "slideUp";
  mobileImageGap?: number;
  lineWidth?: number;
  dotSize?: number;
  showDots?: boolean;
  cornerRadius?: number;
  className?: string;
}

function useContainerWidth(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState<number>(1000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(containerRef.current?.offsetWidth || window.innerWidth);
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (typeof w === "number" && w > 0) setWidth(w);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return width;
}

function getImageAnimation(type: "none" | "fade" | "slideUp") {
  if (type === "none") {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: undefined,
      transition: { duration: 0 }
    };
  }
  if (type === "slideUp") {
    return {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as const }
    };
  }
  return {
    initial: { opacity: 0, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as const }
  };
}

export function StepsFlow({
  steps = [],
  accentColor = "#1D5BD6",
  lineColor = "#E2E8F0",
  cornerMaskColor = "#FFFFFF",
  numberColor = "#0B2A6F",
  titleColor = "#0B2A6F",
  textColor = "#475569",
  numberTitleGap = 24,
  titleTextGap = 12,
  gridGap = 68,
  imageRadius = 22,
  imageAnimation = "fade",
  lineWidth = 8,
  dotSize = 24,
  showDots = true,
  cornerRadius = 44,
  className = ""
}: StepsFlowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerWidth = useContainerWidth(containerRef);

  // Proportional responsive scaling so the exact same 2-column serpentine design shines on mobile
  const isNarrow = containerWidth < 640;
  const isMedium = containerWidth >= 640 && containerWidth < 880;

  const effectiveLineWidth = isNarrow
    ? Math.max(4, Math.round(lineWidth * 0.55))
    : isMedium
    ? Math.max(6, Math.round(lineWidth * 0.75))
    : lineWidth;

  const effectiveDotSize = isNarrow
    ? Math.max(14, Math.round(dotSize * 0.65))
    : isMedium
    ? Math.max(18, Math.round(dotSize * 0.8))
    : dotSize;

  const effectiveCornerRadius = isNarrow
    ? Math.max(20, Math.round(cornerRadius * 0.5))
    : isMedium
    ? Math.max(30, Math.round(cornerRadius * 0.75))
    : cornerRadius;

  const effectiveGridGap = isNarrow
    ? Math.max(14, Math.round(gridGap * 0.25))
    : isMedium
    ? Math.max(30, Math.round(gridGap * 0.5))
    : gridGap;

  const effectiveImageRadius = isNarrow
    ? Math.max(12, Math.round(imageRadius * 0.55))
    : isMedium
    ? Math.max(16, Math.round(imageRadius * 0.75))
    : imageRadius;

  const lastIndex = steps.length - 1;
  const lastReversed = lastIndex % 2 !== 0;
  const dotOffset = effectiveDotSize / 2 - effectiveLineWidth / 2;

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: isNarrow ? "calc(100% - 20px)" : isMedium ? "calc(100% - 36px)" : "calc(100% - 60px)",
          margin: "0 auto"
        }}
      >
        {steps.map((step, index) => (
          <AnimatedStepRow
            key={`${index}-${effectiveLineWidth}-${effectiveCornerRadius}`}
            step={step}
            index={index}
            isFirst={index === 0}
            isLast={index === lastIndex}
            accentColor={accentColor}
            lineColor={lineColor}
            cornerMaskColor={cornerMaskColor}
            numberColor={numberColor}
            titleColor={titleColor}
            textColor={textColor}
            numberTitleGap={numberTitleGap}
            titleTextGap={titleTextGap}
            gridGap={effectiveGridGap}
            imageRadius={effectiveImageRadius}
            imageAnimation={imageAnimation}
            lineWidth={effectiveLineWidth}
            dotSize={effectiveDotSize}
            showDots={showDots}
            cornerRadius={effectiveCornerRadius}
            isNarrow={isNarrow}
            isMedium={isMedium}
          />
        ))}

        {/* Start Dot */}
        {showDots && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: -dotOffset,
              width: effectiveDotSize,
              height: effectiveDotSize,
              borderRadius: "50%",
              backgroundColor: accentColor,
              boxShadow: "0 0 12px rgba(29, 91, 214, 0.4)",
              zIndex: 3
            }}
          />
        )}

        {/* End Dot */}
        {showDots && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: lastReversed
                ? `calc(50% - ${dotOffset}px)`
                : -dotOffset,
              width: effectiveDotSize,
              height: effectiveDotSize,
              borderRadius: "50%",
              backgroundColor: accentColor,
              boxShadow: "0 0 12px rgba(29, 91, 214, 0.4)",
              zIndex: 3
            }}
          />
        )}
      </div>
    </div>
  );
}

interface AnimatedStepRowProps {
  step: StepItem;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  accentColor: string;
  lineColor: string;
  cornerMaskColor: string;
  numberColor: string;
  titleColor: string;
  textColor: string;
  numberTitleGap: number;
  titleTextGap: number;
  gridGap: number;
  imageRadius: number;
  imageAnimation: "none" | "fade" | "slideUp";
  lineWidth: number;
  dotSize: number;
  showDots: boolean;
  cornerRadius: number;
  isNarrow: boolean;
  isMedium: boolean;
}

function AnimatedStepRow({
  step,
  index,
  isFirst,
  isLast,
  accentColor,
  lineColor,
  cornerMaskColor,
  numberColor,
  titleColor,
  textColor,
  numberTitleGap,
  titleTextGap,
  gridGap,
  imageRadius,
  imageAnimation,
  lineWidth,
  dotSize,
  showDots,
  cornerRadius,
  isNarrow,
  isMedium
}: AnimatedStepRowProps) {
  const reversed = index % 2 !== 0;
  const stepRef = useRef<HTMLDivElement | null>(null);
  const [isNumberTriggered, setIsNumberTriggered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["end end", "start start"]
  });

  const height = useTransform(scrollYProgress, [0, 0.02, 0.3], ["0%", "0%", "100%"]);
  const width = useTransform(scrollYProgress, [0, 0.3, 0.4], ["0%", "0%", "50%"]);
  const opacityTop = useTransform(scrollYProgress, [0, 0.01], [0, 1]);
  const opacityBottom = useTransform(scrollYProgress, [0, 0.29, 0.3], [0, 0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.12) {
      setIsNumberTriggered(true);
    }
  });

  useEffect(() => {
    if (scrollYProgress.get() >= 0.12) {
      setIsNumberTriggered(true);
    }
  }, [scrollYProgress]);

  const numberValue = parseInt(step.number, 10) || index + 1;
  const numFontSize = isNarrow ? 36 : isMedium ? 54 : 80;
  const numLH = Math.round(numFontSize * 0.93);
  const titleFontSize = isNarrow ? 15 : isMedium ? 20 : 26;
  const textFontSize = isNarrow ? 11.5 : isMedium ? 13 : 15;
  const effectivePaddingY = isNarrow ? 22 : isMedium ? 34 : 50;
  const effectiveNumberTitleGap = isNarrow ? 8 : isMedium ? 14 : numberTitleGap;
  const effectiveTitleTextGap = isNarrow ? 5 : isMedium ? 8 : titleTextGap;

  const textPadding = reversed
    ? (isNarrow ? "0 14px 0 6px" : isMedium ? "0 28px 0 12px" : "0 48px 0 0")
    : (isNarrow ? "0 6px 0 14px" : isMedium ? "0 12px 0 28px" : "0 0 0 48px");

  const imgAnim = getImageAnimation(imageAnimation);

  const safeCornerRadius = Math.max(cornerRadius, lineWidth);
  const curveSize = safeCornerRadius * 2;
  const maskSize = safeCornerRadius;
  const curveLeftReversed = `calc(50% - ${curveSize - lineWidth}px)`;
  const maskLeftReversed = `calc(50% - ${maskSize - lineWidth}px)`;

  return (
    <motion.div
      ref={stepRef}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        paddingTop: effectivePaddingY,
        paddingBottom: isLast ? effectivePaddingY : effectivePaddingY + lineWidth,
        gap: gridGap,
        alignItems: "center"
      }}
    >
      {/* Background Track Line */}
      <div
        style={{
          position: "absolute",
          top: isFirst ? (showDots ? dotSize / 2 : 0) : 0,
          bottom: isLast ? (showDots ? dotSize / 2 : 0) : 0,
          left: reversed ? "50%" : 0,
          width: lineWidth,
          backgroundColor: lineColor,
          borderRadius: `${isFirst && !showDots ? lineWidth / 2 : 0}px ${
            isFirst && !showDots ? lineWidth / 2 : 0
          }px ${isLast && !showDots ? lineWidth / 2 : 0}px ${
            isLast && !showDots ? lineWidth / 2 : 0
          }px`
        }}
      />

      {/* Horizontal Track to Next Row */}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: reversed ? "auto" : 0,
            right: reversed ? "50%" : "auto",
            width: "50%",
            height: lineWidth,
            backgroundColor: lineColor
          }}
        />
      )}

      {/* Corner Masks */}
      {!isFirst && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            left: reversed ? maskLeftReversed : 0,
            top: -lineWidth,
            width: maskSize,
            height: maskSize,
            backgroundColor: cornerMaskColor
          }}
        />
      )}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            left: reversed ? maskLeftReversed : 0,
            bottom: 0,
            width: maskSize,
            height: maskSize,
            backgroundColor: cornerMaskColor
          }}
        />
      )}

      {/* Track Curves */}
      {!isFirst && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            left: reversed ? curveLeftReversed : 0,
            top: -lineWidth,
            width: curveSize,
            height: curveSize,
            borderRadius: curveSize / 2,
            border: `${lineWidth}px solid transparent`,
            borderTopColor: lineColor,
            transform: reversed ? "rotate(45deg)" : "rotate(-45deg)"
          }}
        />
      )}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            left: reversed ? curveLeftReversed : 0,
            bottom: 0,
            width: curveSize,
            height: curveSize,
            borderRadius: curveSize / 2,
            border: `${lineWidth}px solid transparent`,
            borderTopColor: lineColor,
            transform: reversed ? "rotate(135deg)" : "rotate(225deg)"
          }}
        />
      )}

      {/* Animated Accent Curves */}
      {!isFirst && (
        <motion.div
          style={{
            position: "absolute",
            zIndex: 2,
            left: reversed ? curveLeftReversed : 0,
            top: -lineWidth,
            width: curveSize,
            height: curveSize,
            borderRadius: curveSize / 2,
            border: `${lineWidth}px solid transparent`,
            borderTopColor: accentColor,
            transform: reversed ? "rotate(45deg)" : "rotate(-45deg)",
            opacity: opacityTop
          }}
        />
      )}
      {!isLast && (
        <motion.div
          style={{
            position: "absolute",
            zIndex: 2,
            left: reversed ? curveLeftReversed : 0,
            bottom: 0,
            width: curveSize,
            height: curveSize,
            borderRadius: curveSize / 2,
            border: `${lineWidth}px solid transparent`,
            borderTopColor: accentColor,
            transform: reversed ? "rotate(135deg)" : "rotate(225deg)",
            opacity: opacityBottom
          }}
        />
      )}

      {/* Animated Vertical Accent Line */}
      <div
        style={{
          position: "absolute",
          top: isFirst ? (showDots ? dotSize / 2 : 0) : 0,
          bottom: isLast ? (showDots ? dotSize / 2 : 0) : 0,
          left: reversed ? "50%" : 0,
          width: lineWidth,
          overflow: "hidden",
          borderRadius: `${isFirst && !showDots ? lineWidth / 2 : 0}px ${
            isFirst && !showDots ? lineWidth / 2 : 0
          }px ${isLast && !showDots ? lineWidth / 2 : 0}px ${
            isLast && !showDots ? lineWidth / 2 : 0
          }px`
        }}
      >
        <motion.div style={{ width: "100%", height, backgroundColor: accentColor }} />
      </div>

      {/* Animated Horizontal Accent Line */}
      {!isLast && (
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: reversed ? "auto" : 0,
            right: reversed ? "50%" : "auto",
            height: lineWidth,
            backgroundColor: accentColor,
            width
          }}
        />
      )}

      {/* Text Column */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          padding: textPadding,
          gridColumnStart: reversed ? 2 : 1,
          gridRowStart: 1
        }}
      >
        {/* Rolling Number */}
        <motion.div
          onViewportEnter={() => setIsNumberTriggered(true)}
          viewport={{ once: true, amount: 0.1 }}
          style={{
            position: "relative",
            maxHeight: numLH,
            overflow: "hidden",
            fontSize: numFontSize,
            lineHeight: `${numLH}px`,
            fontWeight: 300,
            fontFamily: "var(--font-serif), Georgia, serif",
            color: numberColor,
            opacity: isNumberTriggered ? 1 : 0,
            letterSpacing: "-0.03em"
          }}
        >
          0
          <motion.span
            initial={{ y: "0%" }}
            animate={{ y: isNumberTriggered ? `-${10 * (numberValue % 10)}%` : "0%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 100 + 20 * (numberValue % 10)
            }}
            style={{
              position: "absolute",
              top: 0,
              width: Math.round(numFontSize * 0.68),
              wordBreak: "break-all"
            }}
          >
            0123456789
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.42, 0, 0.58, 1] }}
          viewport={{ once: true, amount: 0.1 }}
          style={{
            marginTop: effectiveNumberTitleGap,
            fontSize: titleFontSize,
            fontWeight: 800,
            lineHeight: 1.25,
            color: titleColor,
            fontFamily: "var(--font-serif), Georgia, serif"
          }}
        >
          {step.title}
        </motion.h3>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.42, 0, 0.58, 1] }}
          viewport={{ once: true, amount: 0.1 }}
          style={{
            marginTop: effectiveTitleTextGap,
            fontSize: textFontSize,
            lineHeight: 1.65,
            color: textColor
          }}
        >
          {step.text}
        </motion.p>
      </div>

      {/* Image Column */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          gridColumnStart: reversed ? 1 : 2,
          gridRowStart: 1
        }}
      >
        {step.image ? (
          <motion.img
            src={step.image}
            alt={step.title || ""}
            initial={imgAnim.initial}
            whileInView={imgAnim.whileInView}
            transition={imgAnim.transition}
            viewport={{ once: true, amount: 0.15 }}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "16 / 10",
              objectFit: "cover",
              borderRadius: imageRadius,
              display: "block",
              boxShadow: isNarrow
                ? "0 6px 18px -4px rgba(11, 42, 111, 0.12)"
                : "0 14px 34px -10px rgba(11, 42, 111, 0.15)"
            }}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 10",
              borderRadius: imageRadius,
              background: lineColor
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
