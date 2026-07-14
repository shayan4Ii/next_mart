"use client";

import { useState } from "react";
import {
  Product,
  resolveImageUrl,
  formatPrice,
  add_to_cart_api,
} from "../lib/api";

interface ProductCardProps {
  product: Product;
}

// ─── Icons ──────────────────────────────────────────────────────────────────

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const LoaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className="animate-spin">
    <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

const PlaceholderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
    className="text-gray-300">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
  </svg>
);

// ─── Main Component ─────────────────────────────────────────────────────────

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = resolveImageUrl(product.image);
  const isOutOfStock = product.stock <= 0;

  const [isAdding, setIsAdding] = useState(false);
  // States: 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState<string>("idle");

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault(); // Prevent navigation if wrapped in a link
    if (isAdding || isOutOfStock) return;

    setStatus("loading");
    setIsAdding(true);

    try {
      const response = await add_to_cart_api(product.id);

      if (response.success) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 2000); // Reset after 2 seconds
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 2500);
      }
    } catch (error) {
      console.log("Add cart error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    } finally {
      setIsAdding(false);
    }
  }

  // Dynamic button styles based on status
  const getButtonStyles = () => {
    switch (status) {
      case "loading":
        return "bg-gray-900 text-white cursor-wait";
      case "success":
        return "bg-emerald-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return isOutOfStock
          ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          : "bg-gray-900 text-white hover:bg-gray-800 active:scale-95 shadow-sm shadow-gray-900/10";
    }
  };

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden
        hover:shadow-xl hover:shadow-gray-100/80 hover:border-transparent
        hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PlaceholderIcon />
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title & Description */}
        <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-rose-500 transition-colors duration-200">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Price & Stock Indicator */}
        <div className="mt-auto pt-4">
          <div className="flex items-baseline justify-between gap-2 mb-4">
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              {formatPrice(product.price)}
            </span>
            {!isOutOfStock && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                In Stock
              </span>
            )}
            {isOutOfStock && (
              <span className="text-xs font-medium text-gray-400">
                0 left
              </span>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || status === "loading"}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200
              flex items-center justify-center gap-2 ${getButtonStyles()}`}
          >
            {status === "loading" && (
              <>
                <LoaderIcon />
                Adding...
              </>
            )}
            {status === "success" && (
              <>
                <CheckIcon />
                Added!
              </>
            )}
            {status === "error" && (
              <>
                <AlertIcon />
                Failed
              </>
            )}
            {status === "idle" && (
              <>
                <CartIcon />
                {isOutOfStock ? "Sold Out" : "Add to Cart"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}