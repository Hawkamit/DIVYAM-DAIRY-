"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { buildWhatsAppLink } from "@/data/site";
import { composeProductWhatsAppMessage } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
  Heart,
} from "lucide-react";

interface ProductCarouselFramerProps {
  products: Product[];
  heading?: string;
  description?: string;
  viewAllLink?: string;
  viewAllLabel?: string;
  columns?: number;
  gap?: number;
  padding?: number;
  imageRatio?: number;
  radius?: number;
}

export function ProductCarouselFramer({
  products,
  heading,
  description,
  viewAllLink = "/products",
  viewAllLabel,
  columns = 3,
  gap = 22,
  padding = 0,
  imageRatio = 0.88,
  radius = 18,
}: ProductCarouselFramerProps) {
  const {
    language,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useAppStore();

  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    scrollLeft: number;
    active: boolean;
  } | null>(null);
  const suppressClickUntil = useRef<number>(0);
  const animationFrame = useRef<number | null>(null);

  const [railState, setRailState] = useState({
    canPrevious: false,
    canNext: true,
  });

  const railId = useId();
  const headingId = useId();

  const measureRail = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const position = Math.max(0, Math.min(maxScroll, rail.scrollLeft));

    setRailState((prev) => {
      const canPrevious = position > 4;
      const canNext = position < maxScroll - 4;
      if (prev.canPrevious === canPrevious && prev.canNext === canNext) {
        return prev;
      }
      return { canPrevious, canNext };
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    measureRail();

    const scheduleMeasure = () => {
      if (animationFrame.current !== null) return;
      animationFrame.current = requestAnimationFrame(() => {
        animationFrame.current = null;
        measureRail();
      });
    };

    rail.addEventListener("scroll", scheduleMeasure, { passive: true });
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(rail);
    Array.from(rail.children).forEach((card) => {
      observer.observe(card);
    });

    return () => {
      rail.removeEventListener("scroll", scheduleMeasure);
      observer.disconnect();
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    };
  }, [measureRail, products.length, columns, gap, padding]);

  const scrollToPosition = (left: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left, behavior: "smooth" });
  };

  const move = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;

    const cards = Array.from(rail.children) as HTMLElement[];
    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const current = rail.scrollLeft;
    const targets = Array.from(
      new Set([0, ...cards.map((c) => Math.min(c.offsetLeft, maxScroll)), maxScroll])
    ).sort((a, b) => a - b);

    const target =
      direction === 1
        ? targets.find((val) => val > current + 10)
        : [...targets].reverse().find((val) => val < current - 10);

    if (target !== undefined) {
      scrollToPosition(target);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      const rail = railRef.current;
      if (rail) scrollToPosition(rail.scrollWidth);
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !event.isPrimary) return;
    const rail = event.currentTarget;
    if (rail.scrollWidth <= rail.clientWidth + 2) return;

    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: rail.scrollLeft,
      active: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (!drag.active) {
      if (Math.abs(deltaX) < 6) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        dragRef.current = null;
        return;
      }
      drag.active = true;
      const rail = event.currentTarget;
      rail.dataset.dragging = "true";
      rail.style.scrollSnapType = "none";
      rail.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    event.currentTarget.scrollLeft = drag.scrollLeft - deltaX;
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const rail = event.currentTarget;
    if (drag.active) {
      suppressClickUntil.current = Date.now() + 350;
    }
    dragRef.current = null;
    delete rail.dataset.dragging;
    rail.style.removeProperty("scroll-snap-type");
    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
    measureRail();
  };

  const onCardClick = (event: React.MouseEvent) => {
    if (event.detail > 0 && Date.now() < suppressClickUntil.current) {
      event.preventDefault();
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultVariant = product.variants[0];

    if (product.isLaunchingSoon || product.needsConfirmation || !product.isAvailable) {
      const msg = composeProductWhatsAppMessage(
        language === "hi" ? product.nameHi : product.name,
        defaultVariant ? defaultVariant.size : "Batch Inquiry"
      );
      window.open(buildWhatsAppLink(msg), "_blank");
      return;
    }

    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      nameHi: product.nameHi,
      variantId: defaultVariant ? defaultVariant.id : "std",
      size: defaultVariant
        ? language === "hi"
          ? defaultVariant.sizeHi
          : defaultVariant.size
        : "Standard Pack",
      sizeHi: defaultVariant ? defaultVariant.sizeHi : "मानक पैक",
      price: defaultVariant ? defaultVariant.priceMin : product.basePrice,
      quantity: 1,
      image: product.images.front,
      isGhee: product.category === "ghee",
    });
  };

  const headingText =
    heading ||
    (language === "hi" ? "दैनिक लोकप्रिय उत्पाद" : "Popular Daily Essentials");

  const descriptionText =
    description ||
    (language === "hi"
      ? "स्वच्छता से तैयार और प्रयोगशाला में परीक्षित ताजे दूध और डेयरी उत्पाद।"
      : "Laboratory-tested milk, pure ghee, and fresh paneer ready for daily route delivery.");

  const viewAllText =
    viewAllLabel || (language === "hi" ? "सभी उत्पाद देखें" : "Explore Collection");

  return (
    <div
      className="object-shelf w-full relative"
      style={
        {
          "--os-text": "#0B2A6F",
          "--os-muted": "#64748B",
          "--os-line": "#E2E8F0",
          "--os-accent": "#0B2A6F",
          "--os-accent-text": "#FFFFFF",
          "--os-columns": columns,
          "--os-gap": `${gap}px`,
          "--os-padding": `${padding}px`,
          "--os-radius": `${radius}px`,
          "--os-ratio": imageRatio,
          "--os-image-padding": "14px",
          "--os-title-size": "34px",
          "--os-product-size": "19px",
          "--os-hover-zoom": 1.05,
          "--os-duration": "0.45s",
        } as React.CSSProperties
      }
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      data-motion="on"
    >
      <style jsx global>{`
        .object-shelf {
          box-sizing: border-box;
          container-type: inline-size;
        }

        .object-shelf,
        .object-shelf * {
          box-sizing: border-box;
        }

        .object-shelf .os-inner {
          padding: var(--os-padding);
        }

        .object-shelf .os-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 20px;
        }

        .object-shelf .os-header-copy {
          min-width: 0;
        }

        .object-shelf .os-heading {
          margin: 0;
          font-size: clamp(24px, 3.5cqw, var(--os-title-size));
          line-height: 1.15;
          font-weight: 800;
          color: #0b2a6f;
          letter-spacing: -0.02em;
        }

        .object-shelf .os-description {
          max-width: 500px;
          margin: 6px 0 0;
          color: var(--os-muted);
          font-size: 13px;
          line-height: 1.5;
        }

        .object-shelf .os-header-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 14px;
          flex-shrink: 0;
        }

        .object-shelf .os-view-all {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #1d5bd6;
          transition: transform var(--os-duration), color var(--os-duration);
        }

        .object-shelf .os-view-all:hover {
          color: #0b2a6f;
          transform: translateX(3px);
        }

        .object-shelf .os-navigation {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .object-shelf .os-nav-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          border: 1px solid var(--os-line);
          background: #ffffff;
          border-radius: 9999px;
          cursor: pointer;
          color: #0b2a6f;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
          transition: background var(--os-duration),
            border-color var(--os-duration), color var(--os-duration),
            opacity var(--os-duration), transform 0.2s;
        }

        .object-shelf .os-nav-button:hover:not(:disabled) {
          border-color: #0b2a6f;
          background: #0b2a6f;
          color: #ffffff;
          transform: scale(1.05);
        }

        .object-shelf .os-nav-button:disabled {
          opacity: 0.3;
          cursor: default;
        }

        .object-shelf .os-rail {
          position: relative;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: calc(
            (100% - (var(--os-columns) - 1) * var(--os-gap)) / var(--os-columns)
          );
          gap: var(--os-gap);
          overflow-x: auto;
          overscroll-behavior-x: contain;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          align-items: stretch;
          direction: ltr;
          user-select: none;
          -webkit-user-select: none;
          padding-bottom: 4px;
        }

        .object-shelf .os-rail::-webkit-scrollbar {
          display: none;
        }

        .object-shelf .os-rail[data-dragging="true"],
        .object-shelf .os-rail[data-dragging="true"] * {
          cursor: grabbing !important;
        }

        .object-shelf .os-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          scroll-snap-align: start;
          position: relative;
          text-decoration: none;
          color: inherit;
        }

        .object-shelf a.os-card {
          cursor: pointer;
        }

        .object-shelf .os-media {
          position: relative;
          aspect-ratio: var(--os-ratio);
          border-radius: var(--os-radius);
          overflow: hidden;
          isolation: isolate;
          background: #f8fafc;
          border: 1px solid #eef2f6;
          box-shadow: 0 4px 14px rgba(11, 42, 111, 0.04);
        }

        .object-shelf .os-image-layer {
          position: absolute;
          inset: 0;
          padding: var(--os-image-padding);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .object-shelf .os-image-layer img {
          display: block;
          width: 100%;
          height: 100%;
          pointer-events: none;
          object-fit: contain;
          transition: transform var(--os-duration) cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .object-shelf .os-secondary {
          z-index: 1;
          clip-path: inset(100% 0 0 0);
          transition: clip-path var(--os-duration) cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .object-shelf .os-secondary img {
          transform: translateY(4%) scale(1.03);
        }

        .object-shelf .os-wishlist-btn {
          position: absolute;
          z-index: 2;
          top: 12px;
          right: 12px;
          width: 34px;
          height: 34px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(6px);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s, color 0.2s, background 0.2s;
        }

        .object-shelf .os-wishlist-btn:hover {
          transform: scale(1.1);
          color: #ef4444;
          background: #ffffff;
        }

        .object-shelf .os-wishlist-btn.active {
          color: #ef4444;
        }

        .object-shelf .os-action {
          position: absolute;
          z-index: 3;
          bottom: 12px;
          right: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-height: 42px;
          padding: 8px 14px;
          background: #0b2a6f;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(11, 42, 111, 0.25);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity var(--os-duration), transform var(--os-duration);
        }

        .object-shelf .os-info {
          display: flex;
          flex-direction: column;
          padding: 12px 2px 0px;
        }

        .object-shelf .os-product-title {
          margin: 0;
          font-size: var(--os-product-size);
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 800;
          color: #0b2a6f;
          transition: color 0.2s;
        }

        .object-shelf .os-card:hover .os-product-title {
          color: #1d5bd6;
        }

        @media (hover: hover) and (pointer: fine) {
          .object-shelf .os-card:hover .os-secondary {
            clip-path: inset(0 0 0 0);
          }

          .object-shelf .os-card:hover .os-secondary img {
            transform: translateY(0) scale(1);
          }

          .object-shelf[data-motion="on"] .os-card:hover .os-primary img {
            transform: scale(var(--os-hover-zoom));
          }

          .object-shelf .os-card:hover .os-action {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (hover: none) {
          .object-shelf .os-action {
            position: absolute;
            opacity: 1;
            transform: none;
            bottom: 10px;
            right: 10px;
            left: auto;
            width: auto;
            padding: 8px 12px;
          }
        }

        @container (max-width: 900px) {
          .object-shelf .os-rail {
            grid-auto-columns: calc((100% - var(--os-gap)) / 2);
          }
        }

        @container (max-width: 580px) {
          .object-shelf .os-header {
            align-items: flex-start;
            gap: 14px;
            flex-direction: column;
            margin-bottom: 16px;
          }

          .object-shelf .os-header-actions {
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .object-shelf .os-navigation {
            margin-left: auto;
          }

          .object-shelf .os-rail {
            grid-auto-columns: 84%;
            gap: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .object-shelf *,
          .object-shelf *::before,
          .object-shelf *::after {
            transition: none !important;
            animation: none !important;
          }

          .object-shelf .os-image-layer img {
            transform: none !important;
          }
        }
      `}</style>

      <div className="os-inner">
        {/* Header */}
        <div className="os-header">
          <div className="os-header-copy">
            <h2 id={headingId} className="os-heading font-serif">
              {headingText}
            </h2>
            {descriptionText && (
              <p className="os-description">{descriptionText}</p>
            )}
          </div>

          <div className="os-header-actions">
            <Link href={viewAllLink} className="os-view-all">
              <span>{viewAllText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {products.length > 1 && (
              <div className="os-navigation">
                <button
                  type="button"
                  className="os-nav-button"
                  aria-label="Previous products"
                  aria-controls={railId}
                  disabled={!railState.canPrevious}
                  onClick={() => move(-1)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="os-nav-button"
                  aria-label="Next products"
                  aria-controls={railId}
                  disabled={!railState.canNext}
                  onClick={() => move(1)}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Rail */}
        <div
          id={railId}
          ref={railRef}
          className="os-rail"
          tabIndex={0}
          role="group"
          aria-label={headingText}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
          onPointerLeave={() => {
            if (!dragRef.current?.active) {
              dragRef.current = null;
            }
          }}
          onDragStart={(e) => e.preventDefault()}
        >
          {products.map((product, index) => {
            const isWishlisted = wishlist.includes(product.slug);
            const secondaryImage =
              product.images.angle || product.images.lifestyle;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="os-card group"
                draggable={false}
                onClick={onCardClick}
              >
                {/* Product Image Media */}
                <div className="os-media">
                  {/* Primary Image */}
                  <div className="os-image-layer os-primary">
                    <img
                      src={product.images.front}
                      alt={language === "hi" ? product.nameHi : product.name}
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                    />
                  </div>

                  {/* Secondary Image with clip-path curtain reveal */}
                  {secondaryImage && (
                    <div className="os-image-layer os-secondary" aria-hidden="true">
                      <img
                        src={secondaryImage}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    className={`os-wishlist-btn ${isWishlisted ? "active" : ""}`}
                    aria-label="Wishlist"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.slug);
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </button>

                  {/* Hover Action Bar */}
                  <div
                    className="os-action"
                    onClick={(e) => handleQuickAdd(e, product)}
                  >
                    <span className="flex items-center gap-1.5 font-bold">
                      <ShoppingBag className="w-4 h-4" />
                      {product.isLaunchingSoon || product.needsConfirmation
                        ? language === "hi"
                          ? "पूछताछ करें"
                          : "Inquire Now"
                        : language === "hi"
                        ? "कार्ट में जोड़ें"
                        : "Add to Cart"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Product Name (Clean & Prominent) */}
                <div className="os-info">
                  <h3 className="os-product-title font-serif">
                    {language === "hi" ? product.nameHi : product.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
