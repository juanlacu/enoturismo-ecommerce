'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, Category, categoryLabels } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Suspense } from 'react';

const categories: Category[] = ['experiencias', 'vinos', 'paquetes'];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as Category | null;
  const [activeCategory, setActiveCategory] = useState<Category | 'todos'>(
    initialCategory ?? 'todos'
  );
  const [query, setQuery] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category') as Category | null;
    setActiveCategory(cat ?? 'todos');
  }, [searchParams]);

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
    const q = query.toLowerCase();
    const matchesQuery =
      q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      categoryLabels[p.category].toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <div className="bg-stone-900 text-white py-14 text-center">
        <p className="text-amber-400 text-sm uppercase tracking-widest font-semibold mb-2">
          Catálogo
        </p>
        <h1 className="text-4xl font-bold">Experiencias &amp; Vinos</h1>
        <p className="text-stone-400 mt-2 text-lg">
          Encontrá lo que estás buscando o sorprendete con algo nuevo.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Search bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar experiencias, vinos, paquetes..."
            className="w-full pl-10 pr-10 py-3 rounded-full border border-stone-200 bg-white text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-300 transition"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'todos'
                ? 'bg-amber-700 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-amber-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Results count */}
        {query && (
          <p className="text-sm text-stone-400 mb-6 text-center">
            {filtered.length === 0
              ? 'Sin resultados para'
              : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} para`}{' '}
            <span className="text-stone-600 font-medium">"{query}"</span>
          </p>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🍷</p>
            <p className="text-stone-500">No encontramos resultados. Probá con otra búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-stone-400">Cargando...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
