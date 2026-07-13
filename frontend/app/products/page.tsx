"use client";

import { useEffect, useState } from "react";
import { Product, get_products_api } from "../lib/api";
import ProductCard from "../components/productcard";
import Header from "../components/header";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";



export default function ProductsPage() {
  const router = useRouter();

  // Products ki list yahan store hogi
  const [products, setProducts] = useState<Product[]>([]);

  // Jab tak data load ho raha hai, ye true rahega
  const [loading, setLoading] = useState(true);

  // Page load hote hi ek dafa products mangwao
  useEffect(() => {
    async function loadProducts() {

      const response = await get_products_api();

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        router.push("/login");
        return;
      }

      setProducts(response.data);
      setLoading(false);
    }

    loadProducts();

  }, [router]);


  // Jab tak data nahi aaya, "Loading..." dikhao
  if (loading) {
    return <h1 className="p-10 text-center">Loading products...</h1>;
  }


  // Agar koi product hi nahi hai
  if (products.length === 0) {
    return <h1 className="p-10 text-center">No products found.</h1>;
  }
 


  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>

      <h1 className="text-4xl font-bold text-center py-10">
        All Products
      </h1>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer/>

    </div>
  );
}