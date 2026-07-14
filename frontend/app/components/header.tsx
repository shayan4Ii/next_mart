"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout, get_cart_api } from "../lib/api";
import Profile from "./profile";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Cart", href: "/cart" },
    { label: "Categories", href: "/#categories" },
    { label: "Contact", href: "/contact" },
];

// ─── Inline Icons ───────────────────────────────────────────────────────────

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

// ─── Header Component ───────────────────────────────────────────────────────

export default function Header() {
    const router = useRouter();

    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    // Load user information
    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        if (storedUser) setUsername(storedUser);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    // Load cart count
    useEffect(() => {
        async function fetchCartCount() {
            try {
                const cart = await get_cart_api();
                let count = 0;
                cart.forEach((item: any) => {
                    count += item.quantity;
                });
                setCartCount(count);
            } catch (error) {
                console.log("Cart count error:", error);
            }
        }
        fetchCartCount();
    }, []);

    // Logout
    const handleLogout = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await logout();
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/80 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-[72px]">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
                        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center
                            group-hover:bg-rose-500 transition-colors duration-300">
                            <span className="text-white font-extrabold text-sm">N</span>
                        </div>
                        <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                            Next<span className="text-rose-500">Mart</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900
                                    transition-colors duration-200 group rounded-lg"
                            >
                                <span className="flex items-center gap-2">
                                    {link.label === "Cart" && <CartIcon />}
                                    {link.label}
                                </span>

                                {/* Animated underline */}
                                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gray-900
                                    rounded-full group-hover:w-5 transition-all duration-300" />

                                {/* Cart Badge */}
                                {link.label === "Cart" && cartCount > 0 && (
                                    <span className="absolute -top-0.5 right-1 min-w-[20px] h-5 px-1.5
                                        bg-rose-500 text-white text-[10px] font-bold rounded-full
                                        flex items-center justify-center shadow-sm shadow-rose-500/30
                                        animate-[bounce_3s_infinite]">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Profile username={username} email={email} />

                        {/* Desktop Logout */}
                        <button
                            onClick={handleLogout}
                            disabled={loading}
                            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                                text-gray-500 border border-gray-200 rounded-lg
                                hover:border-red-200 hover:text-red-600 hover:bg-red-50
                                active:scale-95 transition-all duration-200 disabled:opacity-50"
                        >
                            <LogoutIcon />
                            {loading ? "..." : "Logout"}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden relative w-10 h-10 flex items-center justify-center
                                text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl
                                active:scale-95 transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            <div className="transition-transform duration-300">
                                {menuOpen ? <CloseIcon /> : <MenuIcon />}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <nav className="px-4 sm:px-6 pb-6 pt-2 border-t border-gray-100 bg-white/95 backdrop-blur-xl">
                    <div className="space-y-1 mt-2">
                        {NAV_LINKS.map((link, index) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium
                                    text-gray-600 hover:text-gray-900 hover:bg-gray-50
                                    active:scale-[0.98] transition-all duration-200"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <span className="flex items-center gap-3">
                                    {link.label === "Cart" && <CartIcon />}
                                    {link.label}
                                </span>
                                {link.label === "Cart" && cartCount > 0 && (
                                    <span className="min-w-[24px] h-6 px-2 bg-rose-500 text-white text-xs
                                        font-bold rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="text-gray-300">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Bottom Actions (Profile & Logout) */}
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 sm:hidden">
                        <div className="px-4">
                            <Profile username={username} email={email} />
                        </div>
                        <button
                            onClick={handleLogout}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold
                                text-red-600 bg-red-50 border border-red-100 rounded-xl
                                hover:bg-red-100 active:scale-[0.98] transition-all duration-200
                                disabled:opacity-50"
                        >
                            <LogoutIcon />
                            {loading ? "Logging out..." : "Logout"}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}