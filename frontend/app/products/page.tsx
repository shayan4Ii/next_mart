"use client";

import { useEffect, useState } from "react";
import { Product, get_products_api } from "../lib/api";
import ProductCard from "../components/productcard";
import Header from "../components/header";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";

// --- Icons ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const EmptyBoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
);

// --- Skeleton Loader Grid ---
function ProductsSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="mb-10">
                <div className="h-4 w-24 bg-gray-200 rounded-full animate-pulse mb-3" />
                <div className="h-8 w-48 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                        <div className="aspect-square bg-gray-200" />
                        <div className="p-5 space-y-3">
                            <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
                            <div className="h-3 w-1/2 bg-gray-200 rounded-full" />
                            <div className="flex justify-between items-center pt-2">
                                <div className="h-5 w-20 bg-gray-200 rounded-full" />
                                <div className="h-9 w-9 bg-gray-200 rounded-xl" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Empty State (No Products in DB) ---
function EmptyProductsState() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gray-100 rounded-3xl text-gray-300">
                    <EmptyBoxIcon />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
                    No Products Yet
                </h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    It looks like the store is setting up. Check back later for amazing products!
                </p>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-gray-900/20"
                >
                    <ArrowLeftIcon />
                    Back to Home
                </a>
            </div>
        </div>
    );
}

// --- Search Empty State ---
function NoSearchResults({ query, onClear }: { query: string; onClear: () => void }) {
    return (
        <div className="col-span-full py-20 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                No results for &quot;{query}&quot;
            </h3>
            <p className="text-gray-500 mb-6">Try checking your spelling or use different keywords.</p>
            <button
                onClick={onClear}
                className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors"
            >
                Clear Search
            </button>
        </div>
    );
}

// --- Main Products Page ---
export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await get_products_api();

                if (response.status === 401 || response.status === 403) {
                    router.push("/login");
                    return;
                }

                setProducts(response.data);
            } catch (error) {
                console.error("Failed to load products:", error);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, [router]);

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/80">
                <Header />
                <ProductsSkeleton />
                <Footer />
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50/80">
                <Header />
                <EmptyProductsState />
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/80">
            <Header />

            {/* Safe CSS injection without styled-jsx */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(16px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `
            }} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Page Header */}
                <div className="mb-8">
                    <p className="text-sm font-semibold text-rose-500 tracking-wide uppercase mb-2">
                        Browse Collection
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        All Products
                    </h1>
                </div>

                {/* Search & Filter Bar (Sticky) */}
                <div className="sticky top-16 sm:top-[72px] z-30 bg-gray-50/90 backdrop-blur-md py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-gray-100 mb-8">
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 transition-all duration-200 shadow-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        )}
                    </div>
                    
                    {/* Results Count */}
                    <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing{" "}
                            <span className="font-semibold text-gray-900">{filteredProducts.length}</span>{" "}
                            {filteredProducts.length === 1 ? "product" : "products"}
                            {searchQuery && (
                                <span> for &quot;<span className="font-medium text-gray-700">{searchQuery}</span>&quot;</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                style={{
                                    opacity: 0,
                                    animation: `fadeInUp 0.5s ease-out ${index * 50}ms forwards`
                                }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <NoSearchResults query={searchQuery} onClear={() => setSearchQuery("")} />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}