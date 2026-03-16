'use client';

import Link from 'next/link';
import { Product, categoryLabels } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100 flex flex-col">
      <Link href={`/products/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-1">
          {categoryLabels[product.category]}
        </span>

        <Link href={`/products/${product.id}`}>
          <h3 className="text-stone-800 font-semibold text-lg leading-snug hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.duration && (
          <p className="text-xs text-stone-500 mt-1">⏱ {product.duration}</p>
        )}

        <p className="text-stone-500 text-sm mt-2 flex-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
          <span className="text-2xl font-bold text-stone-800">
            U$S {product.price}
          </span>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-amber-700 hover:bg-amber-600 text-white'
            }`}
          >
            {added ? '✓ Agregado' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
