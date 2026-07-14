"use client";

import { useEffect, useState } from "react";
import {
    CartItem,
    get_cart_api,
    formatPrice,
    resolveImageUrl,
    delete_cart_item_api,
} from "../lib/api";

// ─── Icons (inline SVGs to avoid extra deps) ─────────────────────────────────
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
);

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
);

// ─── Skeleton Loader ────────────────────────────────────────────────────────
function CartSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {/* Header skeleton */}
            <div className="mb-10">
                <div className="h-4 w-32 bg-gray-200 rounded-full animate-pulse mb-3" />
                <div className="h-8 w-48 bg-gray-200 rounded-full animate-pulse" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Items skeleton */}
                <div className="lg:col-span-2 space-y-5">
                    {[...Array(3)].map((_, i) => (
                        <div key={i}
                            className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 animate-pulse">
                            <div className="flex gap-5">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-xl flex-shrink-0" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-5 w-3/4 bg-gray-200 rounded-full" />
                                    <div className="h-4 w-1/3 bg-gray-200 rounded-full" />
                                    <div className="h-4 w-1/4 bg-gray-200 rounded-full" />
                                </div>
                                <div className="space-y-3 text-right hidden sm:block">
                                    <div className="h-5 w-24 bg-gray-200 rounded-full ml-auto" />
                                    <div className="h-9 w-28 bg-gray-200 rounded-xl ml-auto" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary skeleton */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 animate-pulse sticky top-24">
                        <div className="h-6 w-32 bg-gray-200 rounded-full" />
                        <div className="h-px bg-gray-100" />
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex justify-between">
                                <div className="h-4 w-24 bg-gray-200 rounded-full" />
                                <div className="h-4 w-20 bg-gray-200 rounded-full" />
                            </div>
                        ))}
                        <div className="h-px bg-gray-100" />
                        <div className="h-12 w-full bg-gray-200 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Empty Cart ─────────────────────────────────────────────────────────────
function EmptyCart() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-lg mx-auto text-center">
                {/* Animated icon */}
                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8">
                    <div className="absolute inset-0 bg-rose-50 rounded-full animate-ping opacity-20" style={{ animationDuration: "3s" }} />
                    <div className="absolute inset-2 bg-rose-50 rounded-full" />
                    <div className="relative text-rose-300">
                        <CartIcon />
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                    Your cart is empty
                </h1>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                    Looks like you haven&apos;t added anything to your cart yet.
                    Explore our products and find something you love.
                </p>

                <a
                    href="/"
                    className="inline-flex items-center gap-2.5 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-sm
                        hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-gray-900/20"
                >
                    <ArrowLeftIcon />
                    Continue Shopping
                </a>
            </div>
        </div>
    );
}

// ─── Cart Item Row ──────────────────────────────────────────────────────────
interface CartItemRowProps {
    item: CartItem;
    onDelete: (id: number) => void;
}

function CartItemRow({ item, onDelete }: CartItemRowProps) {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    function handleRemove() {
        setIsRemoving(true);
        setTimeout(() => onDelete(item.id), 400);
    }

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                group relative bg-white rounded-2xl border transition-all duration-400 overflow-hidden
                ${isRemoving
                    ? "opacity-0 -translate-x-8 scale-[0.97] border-transparent"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/80"
                }
            `}
            style={{ transitionProperty: "all", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "400ms" }}
        >
            {/* Subtle gradient accent on hover */}
            <div className={`
                absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-orange-400
                transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}
            `} />

            <div className="p-5 sm:p-6">
                <div className="flex gap-4 sm:gap-5">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-50 rounded-xl overflow-hidden">
                            {item.product_image ? (
                                <img
                                    src={resolveImageUrl(item.product_image)!}
                                    alt={item.product_name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <CartIcon />
                                </div>
                            )}
                        </div>
                        {/* Quantity badge */}
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold
                            rounded-full flex items-center justify-center shadow-md">
                            {item.quantity}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate mb-1.5
                            group-hover:text-rose-600 transition-colors duration-200">
                            {item.product_name}
                        </h3>

                        <p className="text-sm text-gray-400 mb-4">
                            Unit price:{" "}
                            <span className="text-gray-600 font-medium">
                                {formatPrice(item.product_price)}
                            </span>
                        </p>

                        {/* Quantity display (read-only since no update API) */}
                        <div className="inline-flex items-center gap-0 bg-gray-50 rounded-lg border border-gray-200 px-1 py-0.5">
                            <span className="w-8 h-8 flex items-center justify-center text-gray-400">
                                <MinusIcon />
                            </span>
                            <span className="w-10 text-center text-sm font-semibold text-gray-900 select-none">
                                {item.quantity}
                            </span>
                            <span className="w-8 h-8 flex items-center justify-center text-gray-400">
                                <PlusIcon />
                            </span>
                        </div>
                    </div>

                    {/* Price & Delete — Right Side */}
                    <div className="flex flex-col items-end justify-between flex-shrink-0">
                        <p className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                            {formatPrice(item.subtotal)}
                        </p>

                        <button
                            onClick={handleRemove}
                            disabled={isRemoving}
                            className={`
                                flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg
                                transition-all duration-200
                                ${isRemoving
                                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                                    : "text-gray-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95"
                                }
                            `}
                        >
                            <TrashIcon />
                            <span className="hidden sm:inline">Remove</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile price row */}
            <div className="sm:hidden px-5 pb-5 flex items-center justify-between border-t border-gray-50 pt-3">
                <span className="text-sm text-gray-400">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">
                    {formatPrice(item.subtotal)}
                </span>
            </div>
        </div>
    );
}

// ─── Order Summary Sidebar ──────────────────────────────────────────────────
interface OrderSummaryProps {
    subtotal: number;
    itemCount: number;
}

function OrderSummary({ subtotal, itemCount }: OrderSummaryProps) {
    const shipping = subtotal > 5000 ? 0 : 99;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

                <div className="space-y-3.5 mb-5">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                        </span>
                        <span className="font-medium text-gray-900">{formatPrice(subtotal.toString())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shipping</span>
                        <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                            {shipping === 0 ? "FREE" : formatPrice(shipping.toString())}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estimated Tax</span>
                        <span className="font-medium text-gray-900">{formatPrice(tax.toString())}</span>
                    </div>
                </div>

                {/* Free shipping progress */}
                {shipping > 0 && (
                    <div className="mb-5 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
                        <p className="text-xs font-medium text-amber-700 mb-2">
                            Add {formatPrice((5000 - subtotal).toString())} more for free shipping!
                        </p>
                        <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-700"
                                style={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="h-px bg-gray-100 mb-5" />

                <div className="flex justify-between items-baseline mb-6">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">
                        {formatPrice(total.toString())}
                    </span>
                </div>

                <button
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold text-sm
                        hover:bg-gray-800 active:scale-[0.98] transition-all duration-200
                        shadow-lg shadow-gray-900/15 flex items-center justify-center gap-2"
                >
                    Proceed to Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>

                {/* Trust badges */}
                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2.5 text-xs text-gray-400">
                        <ShieldIcon />
                        <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-400">
                        <TruckIcon />
                        <span>Fast & reliable delivery</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-400">
                        <RefreshIcon />
                        <span>30-day easy returns</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Cart Page ─────────────────────────────────────────────────────────
export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await get_cart_api();
                setCartItems(data);
            } catch (error) {
                console.log("Cart error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, []);

    async function handleDelete(id: number) {
        try {
            await delete_cart_item_api(id);
            setCartItems((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.log("Delete error:", error);
        }
    }

    if (loading) return <CartSkeleton />;
    if (cartItems.length === 0) return <EmptyCart />;

    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.subtotal), 0);

    return (
        <div className="min-h-screen bg-gray-50/80">
            {/* Top bar */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900
                            transition-colors duration-200 font-medium"
                    >
                        <ArrowLeftIcon />
                        Back to shop
                    </a>
                    <span className="text-sm text-gray-400">
                        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
                    </span>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Page header */}
                <div className="mb-10">
                    <p className="text-sm font-semibold text-rose-500 tracking-wide uppercase mb-2">
                        Review your order
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Shopping Cart
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <CartItemRow
                                    key={item.id}
                                    item={item}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <OrderSummary subtotal={subtotal} itemCount={cartItems.length} />
                </div>
            </div>
        </div>
    );
}