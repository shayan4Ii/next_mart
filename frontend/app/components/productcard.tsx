"use client";

import { Product, resolveImageUrl, formatPrice } from "../lib/api";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

  // Image ka poora URL bana lo (ya null agar image hi nahi hai)
  const imageUrl = resolveImageUrl(product.image);

  return (
    <div className="bg-white rounded-xl shadow p-5">

      {imageUrl && (
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      )}

      <h2 className="text-xl font-bold mt-4">
        {product.name}
      </h2>

      <p className="text-gray-500 mt-2">
        {product.description}
      </p>

      <p className="text-indigo-600 font-bold mt-3">
        {formatPrice(product.price)}
      </p>

      <p className="text-sm text-gray-500">
        Stock: {product.stock}
      </p>

      <button
        disabled={product.stock <= 0}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg disabled:bg-gray-300"
      >
        {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
      </button>

    </div>
  );
}