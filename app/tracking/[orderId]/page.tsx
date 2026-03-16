'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { getOrderById, Order, OrderStatus } from '@/lib/orders';

interface StatusStep {
  key: OrderStatus;
  label: string;
  description: string;
  icon: string;
}

const steps: StatusStep[] = [
  { key: 'confirmado',  label: 'Pedido confirmado',  description: 'Recibimos tu pedido y está siendo procesado.', icon: '✅' },
  { key: 'preparacion', label: 'En preparación',     description: 'Tu pedido está siendo empacado con control de temperatura.', icon: '📦' },
  { key: 'en_camino',   label: 'En camino',          description: 'El carrier retiró tu pedido. Llegará en 24–48 h.', icon: '🚚' },
  { key: 'entregado',   label: 'Entregado',           description: '¡Tu pedido fue entregado. Disfrutá!', icon: '🍷' },
];

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(getOrderById(orderId) ?? null);
  }, [orderId]);

  // Still loading from localStorage
  if (order === undefined) return null;

  if (order === null) {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-stone-800 mb-3">Pedido no encontrado</h1>
        <p className="text-stone-500 mb-6">
          No encontramos el pedido <strong>{orderId}</strong> en este dispositivo.
        </p>
        <Link href="/tracking" className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
          Intentar de nuevo
        </Link>
      </div>
    );
  }

  const currentIndex = steps.findIndex((s) => s.key === order.status);
  const createdAt = new Date(order.createdAt).toLocaleDateString('es-UY', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/tracking" className="text-sm text-stone-400 hover:text-amber-700 transition-colors">
          ← Seguimiento de pedidos
        </Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-3">Pedido {order.id}</h1>
        <p className="text-stone-400 text-sm mt-1">Realizado el {createdAt}</p>
      </div>

      {/* Status timeline */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-5">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{steps[currentIndex].icon}</span>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold">Estado actual</p>
            <p className="text-lg font-bold text-stone-800">{steps[currentIndex].label}</p>
            <p className="text-stone-500 text-sm">{steps[currentIndex].description}</p>
          </div>
        </div>

        <div className="relative">
          {steps.map((step, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            return (
              <div key={step.key} className="flex gap-4 relative">
                {i < steps.length - 1 && (
                  <div className={`absolute left-[13px] top-7 w-0.5 h-full ${done ? 'bg-amber-600' : 'bg-stone-200'}`} />
                )}
                <div className="shrink-0 mt-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    done ? 'bg-amber-700 border-amber-700 text-white'
                    : active ? 'bg-white border-amber-700 text-amber-700'
                    : 'bg-white border-stone-200 text-stone-300'
                  }`}>
                    {done ? '✓' : i + 1}
                  </div>
                </div>
                <div className={`pb-7 ${i > currentIndex ? 'opacity-40' : ''}`}>
                  <p className={`font-semibold text-sm ${active ? 'text-amber-700' : 'text-stone-700'}`}>{step.label}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order items */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-5">
        <h2 className="font-semibold text-stone-800 mb-4">Detalle del pedido</h2>
        <div className="space-y-3">
          {order.items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-3">
              <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-stone-700 font-medium text-sm truncate">{product.name}</p>
                <p className="text-stone-400 text-xs">×{quantity}</p>
              </div>
              <span className="text-stone-700 font-medium text-sm shrink-0">U$S {product.price * quantity}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-100 mt-4 pt-4 flex justify-between font-bold text-stone-800">
          <span>Total</span>
          <span>U$S {order.total}</span>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
          <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1">Cliente</p>
          <p className="font-semibold text-stone-800">{order.name}</p>
          <p className="text-stone-400 text-sm">{order.email}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
          <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1">Control de temperatura</p>
          <p className="font-semibold text-stone-800">14–18 °C</p>
          <p className="text-stone-400 text-sm">Empaque térmico con gel refrigerante</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-stone-400 text-sm mb-1">¿Problemas con tu pedido?</p>
        <a href="mailto:info@enoturismocarmelo.com.uy" className="text-amber-700 hover:underline text-sm font-medium">
          info@enoturismocarmelo.com.uy
        </a>
      </div>
    </div>
  );
}
