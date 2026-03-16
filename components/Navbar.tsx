'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useState, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  return (
    <nav className="bg-stone-900 text-stone-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-bold tracking-wide text-amber-400">
            Enoturismo
          </span>
          <span className="text-sm text-stone-400 tracking-widest uppercase">
            Carmelo
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/products"
            className="hover:text-amber-400 transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/products?category=experiencias"
            className="hover:text-amber-400 transition-colors"
          >
            Experiencias
          </Link>
          <Link
            href="/products?category=vinos"
            className="hover:text-amber-400 transition-colors"
          >
            Vinos
          </Link>
          <Link
            href="/products?category=paquetes"
            className="hover:text-amber-400 transition-colors"
          >
            Paquetes
          </Link>
          <Link
            href="/tracking"
            className="hover:text-amber-400 transition-colors"
          >
            Mi pedido
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-full transition-colors"
          >
            <CartIcon />
            <span>Carrito</span>
            {mounted && totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative">
            <CartIcon />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1"
            aria-label="Menú"
          >
            <div className="w-5 space-y-1">
              <span className="block h-0.5 bg-stone-100" />
              <span className="block h-0.5 bg-stone-100" />
              <span className="block h-0.5 bg-stone-100" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-stone-800 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <Link href="/products" onClick={() => setMenuOpen(false)} className="py-2 border-b border-stone-700">Catálogo</Link>
          <Link href="/products?category=experiencias" onClick={() => setMenuOpen(false)} className="py-2 border-b border-stone-700">Experiencias</Link>
          <Link href="/products?category=vinos" onClick={() => setMenuOpen(false)} className="py-2 border-b border-stone-700">Vinos</Link>
          <Link href="/products?category=paquetes" onClick={() => setMenuOpen(false)} className="py-2 border-b border-stone-700">Paquetes</Link>
          <Link href="/tracking" onClick={() => setMenuOpen(false)} className="py-2">Mi pedido</Link>
        </div>
      )}
    </nav>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h11.2M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
      />
    </svg>
  );
}
