'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductById, products, categoryLabels } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) notFound();

  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone-400 mb-8 flex gap-2 items-center">
        <Link href="/" className="hover:text-amber-700">Inicio</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-amber-700">Catálogo</Link>
        <span>/</span>
        <span className="text-stone-600">{product.name}</span>
      </nav>

      {/* Product detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl w-full h-96 object-cover shadow-md"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">
            {categoryLabels[product.category]}
          </span>
          <h1 className="text-3xl font-bold text-stone-800 mb-1">{product.name}</h1>
          {product.duration && (
            <p className="text-stone-500 text-sm mb-4">⏱ {product.duration}</p>
          )}

          <p className="text-stone-600 leading-relaxed mb-6">{product.longDescription}</p>

          {product.includes && product.includes.length > 0 && (
            <div className="mb-6">
              <p className="text-stone-700 font-semibold mb-2">Incluye:</p>
              <ul className="space-y-1.5">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-stone-600 text-sm">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-stone-100">
            <p className="text-4xl font-bold text-stone-800 mb-5">
              U$S {product.price}
              <span className="text-base font-normal text-stone-400 ml-1">por persona</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-full font-semibold text-base transition-all ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-amber-700 hover:bg-amber-600 text-white'
                }`}
              >
                {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
              </button>
              <Link
                href="/cart"
                className="flex-1 py-3.5 rounded-full font-semibold text-base text-center border-2 border-amber-700 text-amber-700 hover:bg-amber-50 transition-colors"
              >
                Ver carrito
              </Link>
            </div>

            <p className="text-xs text-stone-400 mt-3 text-center">
              Stock disponible: {product.stock} unidades
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-stone-800 mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
