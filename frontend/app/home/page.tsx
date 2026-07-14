"use client";

import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { home_api } from "../lib/api";

// ─── Data ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
    {
        name: "Electronics",
        icon: "💻",
        desc: "Phones, laptops & gadgets",
        color: "from-blue-500 to-indigo-600",
        bgLight: "bg-blue-50",
        textColor: "text-blue-600",
        count: "2.4k+ items",
    },
    {
        name: "Fashion",
        icon: "👗",
        desc: "Trending styles for everyone",
        color: "from-rose-500 to-pink-600",
        bgLight: "bg-rose-50",
        textColor: "text-rose-600",
        count: "5.1k+ items",
    },
    {
        name: "Home & Living",
        icon: "🛋️",
        desc: "Furniture & home decor",
        color: "from-amber-500 to-orange-600",
        bgLight: "bg-amber-50",
        textColor: "text-amber-600",
        count: "1.8k+ items",
    },
    {
        name: "Accessories",
        icon: "⌚",
        desc: "Bags, watches & more",
        color: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50",
        textColor: "text-emerald-600",
        count: "3.2k+ items",
    },
];

const FEATURES = [
    {
        title: "Lightning Fast Delivery",
        text: "Get your orders delivered to your doorstep within 24-48 hours with real-time tracking.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
                <polyline points="12 6 12 13" />
                <polyline points="9 10 12 13 15 10" />
            </svg>
        ),
    },
    {
        title: "Secure Payment",
        text: "100% safe checkout with 256-bit encrypted payment gateways and buyer protection.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1" />
            </svg>
        ),
    },
    {
        title: "24/7 Support",
        text: "Our dedicated support team is available around the clock to help you with anything.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="12" y1="6" x2="12" y2="12" />
            </svg>
        ),
    },
];

// Har product ki apni alag image ab yahan set hai (picsum.photos placeholder,
// seed = product name se, taake image consistent rahe har reload par)
const TRENDING = [
    {
        name: "Wireless Headphones",
        price: "79.99",
        originalPrice: "129.99",
        badge: "Best Seller",
        image: "https://picsum.photos/seed/wireless-headphones/600/600",
    },
    {
        name: "Smart Watch Pro",
        price: "199.99",
        originalPrice: "299.99",
        badge: "New",
        image: "https://picsum.photos/seed/smart-watch-pro/600/600",
    },
    {
        name: "Leather Backpack",
        price: "59.99",
        originalPrice: "89.99",
        badge: "-33%",
        image: "https://picsum.photos/seed/leather-backpack/600/600",
    },
    {
        name: "Running Shoes",
        price: "44.99",
        originalPrice: "69.99",
        badge: "Hot",
        image: "https://picsum.photos/seed/running-shoes/600/600",
    },
];

const STATS = [
    { value: "50K+", label: "Happy Customers" },
    { value: "12K+", label: "Products" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "150+", label: "Brands" },
];

// ─── Animated Counter ───────────────────────────────────────────────────────
function AnimatedStat({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center group">
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight
                group-hover:text-rose-500 transition-colors duration-300">
                {value}
            </div>
            <div className="text-sm text-gray-400 mt-1 font-medium">{label}</div>
        </div>
    );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        async function checkAuth() {
            try {
                const response = await home_api();
                if (response.status === 401 || response.status === 403) {
                    router.push("/login");
                    return;
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
                router.push("/login");
            }
        }
        checkAuth();
    }, [router]);

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
            <Header />

            <main>
                {/* ── Hero Section ─────────────────────────────────────── */}
                <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-3xl" />
                        {/* Grid pattern */}
                        <div className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>

                    <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36
                        grid lg:grid-cols-2 gap-12 lg:gap-16 items-center
                        transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    >
                        {/* Left content */}
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
                                border border-white/10 rounded-full px-4 py-1.5 mb-8">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-sm text-gray-300 font-medium">
                                    New arrivals just dropped
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold
                                text-white leading-[1.08] tracking-tight">
                                Discover
                                <span className="block mt-1 bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400
                                    bg-clip-text text-transparent">
                                    Quality Products
                                </span>
                                <span className="block mt-1 text-white/90">
                                    Best Prices
                                </span>
                            </h1>

                            <p className="mt-6 sm:mt-8 text-gray-400 text-lg sm:text-xl leading-relaxed max-w-lg">
                                Shop premium products with fast delivery, secure payments,
                                and a seamless experience you&apos;ll love.
                            </p>

                            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
                                <a
                                    href="/products"
                                    className="inline-flex items-center justify-center gap-2.5 bg-white text-gray-900
                                        px-8 py-4 rounded-xl font-semibold text-sm
                                        hover:bg-gray-100 active:scale-[0.98] transition-all duration-200
                                        shadow-lg shadow-white/10"
                                >
                                    Shop Now
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </a>
                                <a
                                    href="#categories"
                                    className="inline-flex items-center justify-center gap-2.5
                                        border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-sm
                                        hover:bg-white/10 active:scale-[0.98] transition-all duration-200
                                        backdrop-blur-sm"
                                >
                                    Browse Categories
                                </a>
                            </div>

                            {/* Stats row */}
                            <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8
                                pt-10 border-t border-white/10">
                                {STATS.map((stat) => (
                                    <AnimatedStat key={stat.label} {...stat} />
                                ))}
                            </div>
                        </div>

                        {/* Right image */}
                        <div className={`order-1 lg:order-2 relative transition-all duration-1000 delay-300
                            ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
                            <div className="relative aspect-square max-w-lg mx-auto">
                                {/* Glow behind image */}
                                <div className="absolute inset-4 bg-gradient-to-br from-rose-500/20 to-orange-500/20
                                    rounded-3xl blur-2xl" />

                                {/* Main image */}
                                <div className="relative h-full w-full rounded-3xl overflow-hidden
                                    border border-white/10 shadow-2xl shadow-black/40">
                                    <Image
                                        src="https://picsum.photos/seed/hero-shopping/800/800"
                                        alt="Shopping"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>

                                {/* Floating card — top right (bounce animation removed) */}
                                <div className="absolute -right-2 sm:-right-6 top-8 sm:top-12 bg-white/95 backdrop-blur-md
                                    rounded-2xl p-4 shadow-xl shadow-black/10 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center
                                            text-emerald-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Order Confirmed</p>
                                            <p className="text-sm font-bold text-gray-900">#28491</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating card — bottom left (bounce animation removed) */}
                                <div className="absolute -left-2 sm:-left-6 bottom-12 sm:bottom-16 bg-white/95 backdrop-blur-md
                                    rounded-2xl p-4 shadow-xl shadow-black/10 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center
                                            text-rose-500 text-lg">
                                            ❤️
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Wishlist</p>
                                            <p className="text-sm font-bold text-gray-900">24 items</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom fade to white */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
                </section>

                {/* ── Trusted Brands Bar ───────────────────────────────── */}
                <section className="py-12 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
                            Trusted by leading brands
                        </p>
                        <div className="flex items-center justify-center gap-8 sm:gap-16 flex-wrap opacity-30">
                            {["Nike", "Apple", "Samsung", "Sony", "Adidas"].map((brand) => (
                                <span key={brand} className="text-xl sm:text-2xl font-extrabold text-gray-900
                                    tracking-tight select-none">
                                    {brand}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Categories Section ───────────────────────────────── */}
                <section id="categories" className="py-20 sm:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section header */}
                        <div className="max-w-2xl mb-14">
                            <p className="text-sm font-semibold text-rose-500 tracking-wide uppercase mb-3">
                                Browse Collection
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Shop by Category
                            </h2>
                            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
                                Explore our wide range of categories and find exactly what you&apos;re looking for.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {CATEGORIES.map((category, index) => (
                                <a
                                    key={category.name}
                                    href="/products"
                                    className="group relative bg-white rounded-2xl border border-gray-100 p-7 sm:p-8
                                        hover:shadow-xl hover:shadow-gray-100/80 hover:border-transparent
                                        hover:-translate-y-1.5 active:scale-[0.98]
                                        transition-all duration-300 overflow-hidden"
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    {/* Hover gradient background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0
                                        group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 ${category.bgLight} rounded-2xl flex items-center
                                            justify-center text-2xl mb-5
                                            group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300`}>
                                            {category.icon}
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900
                                            group-hover:text-white transition-colors duration-300">
                                            {category.name}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed
                                            group-hover:text-white/80 transition-colors duration-300">
                                            {category.desc}
                                        </p>

                                        <div className="flex items-center justify-between mt-5 pt-5 border-t
                                            border-gray-100 group-hover:border-white/20 transition-colors duration-300">
                                            <span className={`text-xs font-semibold ${category.textColor}
                                                group-hover:text-white/70 transition-colors duration-300`}>
                                                {category.count}
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="text-gray-300 group-hover:text-white
                                                group-hover:translate-x-1 transition-all duration-300">
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                                <polyline points="12 5 19 12 12 19" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Trending Products ────────────────────────────────── */}
                <section className="py-20 sm:py-28 bg-gray-50/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
                            <div className="max-w-lg">
                                <p className="text-sm font-semibold text-rose-500 tracking-wide uppercase mb-3">
                                    Hot Right Now
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                                    Trending Products
                                </h2>
                            </div>
                            <a
                                href="/products"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900
                                    hover:text-rose-500 transition-colors duration-200 group"
                            >
                                View all products
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                    className="group-hover:translate-x-1 transition-transform duration-200">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </a>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {TRENDING.map((product, index) => (
                                <a
                                    key={product.name}
                                    href="/products"
                                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden
                                        hover:shadow-xl hover:shadow-gray-100/80 hover:border-transparent
                                        hover:-translate-y-1 active:scale-[0.98]
                                        transition-all duration-300"
                                    style={{ transitionDelay: `${index * 75}ms` }}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold
                                                ${product.badge === "New"
                                                    ? "bg-blue-500 text-white"
                                                    : product.badge === "Best Seller"
                                                        ? "bg-amber-500 text-white"
                                                        : product.badge === "Hot"
                                                            ? "bg-rose-500 text-white"
                                                            : "bg-gray-900 text-white"
                                                }`}>
                                                {product.badge}
                                            </span>
                                        </div>
                                        {/* Quick actions overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-3
                                            translate-y-full group-hover:translate-y-0
                                            transition-transform duration-300">
                                            <div className="bg-gray-900/90 backdrop-blur-sm text-white text-center
                                                py-2.5 rounded-xl text-sm font-semibold
                                                hover:bg-gray-800 transition-colors duration-200">
                                                Quick View
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 sm:p-5">
                                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-rose-500
                                            transition-colors duration-200">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2.5 mt-2">
                                            <span className="text-lg font-bold text-gray-900">
                                                ${product.price}
                                            </span>
                                            <span className="text-sm text-gray-400 line-through">
                                                ${product.originalPrice}
                                            </span>
                                        </div>
                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mt-3">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                    viewBox="0 0 24 24"
                                                    fill={i < 4 ? "#f59e0b" : "#e5e7eb"}
                                                    stroke="none">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                            ))}
                                            <span className="text-xs text-gray-400 ml-1">(128)</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Promotional Banner ───────────────────────────────── */}
                <section className="py-20 sm:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                            rounded-3xl overflow-hidden">
                            {/* Decorations */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />

                            <div className="relative grid lg:grid-cols-2 gap-10 items-center p-8 sm:p-12 lg:p-16">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
                                        border border-white/10 rounded-full px-4 py-1.5 mb-6">
                                        <span className="text-sm">🔥</span>
                                        <span className="text-sm text-gray-300 font-medium">Limited Time Offer</span>
                                    </div>

                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white
                                        tracking-tight leading-tight">
                                        Up to{" "}
                                        <span className="bg-gradient-to-r from-rose-400 to-orange-400
                                            bg-clip-text text-transparent">
                                            50% Off
                                        </span>
                                        {" "}on Electronics
                                    </h2>

                                    <p className="mt-4 text-gray-400 text-lg max-w-md leading-relaxed">
                                        Don&apos;t miss out on our biggest sale of the season.
                                        Premium electronics at unbeatable prices.
                                    </p>

                                    {/* Countdown-style boxes */}
                                    <div className="flex gap-3 mt-8">
                                        {[
                                            { num: "02", label: "Days" },
                                            { num: "14", label: "Hours" },
                                            { num: "36", label: "Mins" },
                                            { num: "52", label: "Secs" },
                                        ].map((t) => (
                                            <div key={t.label} className="bg-white/10 backdrop-blur-sm border border-white/10
                                                rounded-xl px-4 py-3 text-center min-w-[64px]">
                                                <div className="text-xl font-extrabold text-white">{t.num}</div>
                                                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
                                                    {t.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href="/products"
                                        className="inline-flex items-center gap-2.5 bg-white text-gray-900
                                            px-8 py-4 rounded-xl font-semibold text-sm mt-8
                                            hover:bg-gray-100 active:scale-[0.98] transition-all duration-200
                                            shadow-lg shadow-white/10"
                                    >
                                        Shop the Sale
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </a>
                                </div>

                                {/* Right side image */}
                                <div className="hidden lg:block relative">
                                    <div className="relative aspect-square max-w-sm mx-auto">
                                        <div className="absolute inset-4 bg-gradient-to-br from-rose-500/20 to-orange-500/20
                                            rounded-3xl blur-2xl" />
                                        <div className="relative h-full w-full rounded-3xl overflow-hidden
                                            border border-white/10 shadow-2xl shadow-black/30">
                                            <Image
                                                src="https://picsum.photos/seed/sale-electronics/700/700"
                                                alt="Sale"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Features Section ─────────────────────────────────── */}
                <section className="py-20 sm:py-28 bg-gray-50/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <p className="text-sm font-semibold text-rose-500 tracking-wide uppercase mb-3">
                                Why Choose Us
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                                The Best Shopping Experience
                            </h2>
                            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
                                We go above and beyond to make sure you get the best service every time.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                            {FEATURES.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="group relative bg-white rounded-2xl border border-gray-100 p-8 sm:p-10
                                        hover:shadow-xl hover:shadow-gray-100/80 hover:border-transparent
                                        hover:-translate-y-1 transition-all duration-300"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {/* Icon */}
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center
                                        text-gray-500 mb-6
                                        group-hover:bg-rose-50 group-hover:text-rose-500
                                        transition-all duration-300 group-hover:scale-110">
                                        {feature.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-500 leading-relaxed">
                                        {feature.text}
                                    </p>

                                    {/* Decorative corner accent */}
                                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl">
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-rose-50 to-transparent
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                            translate-x-6 -translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Newsletter CTA ───────────────────────────────────── */}
                <section className="py-20 sm:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600
                            rounded-3xl overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />

                            <div className="relative text-center px-6 py-16 sm:px-12 sm:py-20">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-xl mx-auto">
                                    Stay in the loop
                                </h2>
                                <p className="mt-4 text-rose-100 text-lg max-w-md mx-auto leading-relaxed">
                                    Subscribe to get special offers, free giveaways, and new arrivals.
                                </p>

                                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-5 py-3.5 rounded-xl bg-white/20 backdrop-blur-sm
                                            border border-white/30 text-white placeholder-white/60
                                            focus:outline-none focus:ring-2 focus:ring-white/40
                                            text-sm font-medium"
                                    />
                                    <button className="px-7 py-3.5 bg-white text-rose-600 rounded-xl font-semibold text-sm
                                        hover:bg-gray-100 active:scale-[0.98] transition-all duration-200
                                        shadow-lg shadow-black/10 whitespace-nowrap">
                                        Subscribe
                                    </button>
                                </div>

                                <p className="mt-4 text-xs text-rose-200/70">
                                    No spam, unsubscribe anytime. We respect your privacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}