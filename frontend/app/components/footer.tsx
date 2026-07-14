// You can keep this as a Server Component unless you need state/hooks
export default function Footer() {

    return (
        <footer id="contact" className="relative bg-gray-950 text-gray-400 overflow-hidden">
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8">

                {/* ── Newsletter / CTA Top Bar ─────────────────────────── */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-white mb-1">Stay in the loop</h3>
                        <p className="text-sm text-gray-400">Subscribe for exclusive offers and new arrivals.</p>
                    </div>
                    <div className="flex w-full md:w-auto gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 md:w-72 px-5 py-3 bg-white/10 border border-white/10 rounded-xl text-white text-sm
                                placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent
                                transition-all duration-200"
                        />
                        <button className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm
                            rounded-xl active:scale-95 transition-all duration-200 shadow-lg shadow-rose-500/20 whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* ── Main Grid Layout ─────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

                    {/* Column 1: Brand & Socials */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <a href="/" className="inline-flex items-center gap-2 mb-5 group">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center
                                group-hover:bg-rose-500 transition-colors duration-300">
                                <span className="text-white font-extrabold text-sm">N</span>
                            </div>
                            <span className="text-xl font-extrabold text-white tracking-tight">
                                Next<span className="text-rose-500">Mart</span>
                            </span>
                        </a>
                        <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
                            Quality products, fast delivery, and a shopping experience you can trust. Your one-stop shop for everything.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {[
                                // Twitter / X
                                <svg key="tw" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                                // Instagram
                                <svg key="ig" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                                // Facebook
                                <svg key="fb" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
                                // Youtube
                                <svg key="yt" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            ].map((icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center
                                        text-gray-500 hover:text-white hover:bg-rose-500 hover:border-rose-500
                                        active:scale-90 transition-all duration-200"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Shop Links */}
                    <div>
                        <h5 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
                            Shop
                        </h5>
                        <ul className="space-y-3">
                            {[
                                { label: "All Products", href: "/products" },
                                { label: "Categories", href: "/#categories" },
                                { label: "Flash Deals", href: "#" },
                                { label: "New Arrivals", href: "#" },
                                { label: "Best Sellers", href: "#" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white
                                            group transition-colors duration-200"
                                    >
                                        <span className="w-0 h-px bg-rose-500 group-hover:w-3 transition-all duration-300" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company Links */}
                    <div>
                        <h5 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
                            Company
                        </h5>
                        <ul className="space-y-3">
                            {[
                                { label: "About Us", href: "#" },
                                { label: "Careers", href: "#" },
                                { label: "Blog", href: "#" },
                                { label: "Press Kit", href: "#" },
                                { label: "Partnerships", href: "#" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white
                                            group transition-colors duration-200"
                                    >
                                        <span className="w-0 h-px bg-rose-500 group-hover:w-3 transition-all duration-300" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Support & Contact */}
                    <div>
                        <h5 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
                            Support
                        </h5>
                        <ul className="space-y-3 mb-8">
                            {[
                                { label: "Help Center", href: "#" },
                                { label: "Returns & Refunds", href: "#" },
                                { label: "Shipping Info", href: "#" },
                                { label: "Track Order", href: "#" },
                                { label: "Contact Us", href: "#" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white
                                            group transition-colors duration-200"
                                    >
                                        <span className="w-0 h-px bg-rose-500 group-hover:w-3 transition-all duration-300" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Contact Details */}
                        <div className="space-y-3 border-t border-white/10 pt-6">
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                support@nextmart.com
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                +1 (555) 123-4567
                            </div>
                            <div className="flex items-start gap-3 text-sm text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                123 Commerce St, NY 10001
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Bar (Copyright & Payments) ────────────────── */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-gray-600 text-center md:text-left">
                        © {new Date().getFullYear()} NextMart. All rights reserved.
                    </p>

                    {/* Payment Method Badges */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 mr-2">We accept:</span>
                        {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
                            <div
                                key={method}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs font-semibold text-gray-400"
                            >
                                {method}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}