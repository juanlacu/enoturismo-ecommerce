'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <p className="text-6xl mb-6">🍷</p>
        <h1 className="text-3xl font-bold text-stone-800 mb-3">Tu carrito está vacío</h1>
        <p className="text-stone-500 mb-8">
          Todavía no agregaste nada. Explorá nuestras experiencias y vinos.
        </p>
        <Link
          href="/products"
          className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-8 py-3.5 rounded-full font-semibold transition-colors"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">
        Tu carrito{' '}
        <span className="text-stone-400 font-normal text-xl">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 flex gap-5 shadow-sm border border-stone-100"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-0.5">
                  {product.category}
                </p>
                <h3 className="font-semibold text-stone-800 truncate">{product.name}</h3>
                <p className="text-stone-400 text-sm mt-0.5">U$S {product.price} c/u</p>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 rounded-full border border-stone-200 text-stone-600 hover:border-amber-700 hover:text-amber-700 flex items-center justify-center text-lg leading-none transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-medium text-stone-800">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 rounded-full border border-stone-200 text-stone-600 hover:border-amber-700 hover:text-amber-700 flex items-center justify-center text-lg leading-none transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-stone-800">
                      U$S {product.price * quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-stone-300 hover:text-red-400 transition-colors text-sm"
                      aria-label="Eliminar"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-24">
            <h2 className="text-lg font-bold text-stone-800 mb-5">Resumen del pedido</h2>

            <div className="space-y-3 text-sm mb-5">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-stone-600">
                  <span className="truncate pr-2">{product.name} ×{quantity}</span>
                  <span className="shrink-0 font-medium">U$S {product.price * quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-4 mb-6">
              <div className="flex justify-between font-bold text-stone-800 text-lg">
                <span>Total</span>
                <span>U$S {totalPrice}</span>
              </div>
              <p className="text-xs text-stone-400 mt-1">Impuestos incluidos</p>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center bg-amber-700 hover:bg-amber-600 text-white py-3.5 rounded-full font-semibold transition-colors"
            >
              Finalizar compra
            </Link>

            <Link
              href="/products"
              className="block w-full text-center text-stone-500 hover:text-amber-700 mt-3 text-sm transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
