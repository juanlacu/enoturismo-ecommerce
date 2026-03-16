'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrders, Order } from '@/lib/orders';

const statusLabels: Record<string, string> = {
  confirmado: 'Confirmado',
  preparacion: 'En preparación',
  en_camino: 'En camino',
  entregado: 'Entregado',
};

const statusColors: Record<string, string> = {
  confirmado: 'bg-blue-100 text-blue-700',
  preparacion: 'bg-amber-100 text-amber-700',
  en_camino: 'bg-orange-100 text-orange-700',
  entregado: 'bg-green-100 text-green-700',
};

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [pastOrders] = useState<Order[]>(() => getOrders());
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = orderId.trim().toUpperCase();
    if (trimmed) router.push(`/tracking/${trimmed}`);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">📦</div>
        <h1 className="text-3xl font-bold text-stone-800 mb-2">Seguimiento de pedido</h1>
        <p className="text-stone-500">
          Ingresá tu número de pedido o seleccioná uno de tus pedidos anteriores.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-10">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Ej: EC-2026-4821"
          className="flex-1 border border-stone-200 rounded-full px-5 py-3 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-300 transition"
        />
        <button
          type="submit"
          className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Buscar
        </button>
      </form>

      {pastOrders.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-4">
            Tus pedidos recientes
          </h2>
          <div className="space-y-3">
            {pastOrders.map((order) => (
              <Link
                key={order.id}
                href={`/tracking/${order.id}`}
                className="flex items-center justify-between bg-white rounded-2xl border border-stone-100 shadow-sm px-5 py-4 hover:border-amber-300 transition-colors"
              >
                <div>
                  <p className="font-bold text-stone-800">{order.id}</p>
                  <p className="text-stone-400 text-xs mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString('es-UY', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })} · U$S {order.total}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {pastOrders.length === 0 && (
        <p className="text-xs text-stone-400 text-center">
          El número de pedido figura en tu email de confirmación y en el QR de tu comprobante.
        </p>
      )}
    </div>
  );
}
