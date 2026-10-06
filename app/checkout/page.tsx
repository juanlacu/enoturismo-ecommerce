'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { saveOrder } from '@/lib/orders';
import { applyCoupon, Coupon, findCoupon, isCouponValid, markCouponUsed } from '@/lib/coupons';

type Step = 'form' | 'success';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>('form');
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  const finalTotal = coupon ? applyCoupon(totalPrice, coupon) : totalPrice;

  const handleApplyCoupon = () => {
    const found = findCoupon(couponCode);
    if (!found || !isCouponValid(found, totalPrice)) {
      setCoupon(null);
      setCouponError('Cupón inválido o vencido');
      return;
    }
    setCoupon(found);
    setCouponError('');
  };

  if (items.length === 0 && step === 'form') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-stone-800 mb-4">No tenés items en el carrito</h1>
        <Link
          href="/products"
          className="inline-block bg-amber-700 text-white px-6 py-3 rounded-full font-semibold"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  if (step === 'success') {
    const trackingUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/tracking/${orderId}`;
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-stone-800 mb-2">¡Reserva confirmada!</h1>
        <p className="text-stone-500 mb-1">
          Gracias, <strong>{form.name}</strong>. Te enviamos confirmación a{' '}
          <strong>{form.email}</strong>.
        </p>
        <p className="text-stone-400 text-sm mb-6">
          Nuestro equipo se pondrá en contacto para coordinar los detalles.
        </p>
        {form.notes && (
          <div
            className="text-stone-500 text-sm italic mb-6"
            dangerouslySetInnerHTML={{ __html: `Tus comentarios: ${form.notes}` }}
          />
        )}

        {/* Order ID + QR */}
        <div className="bg-white border border-stone-100 rounded-2xl shadow-sm p-6 mb-6 inline-block w-full">
          <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1">Número de pedido</p>
          <p className="text-2xl font-bold text-amber-700 mb-5">{orderId}</p>

          <div className="flex justify-center mb-4">
            <div className="p-3 border border-stone-200 rounded-xl">
              <QRCodeSVG value={trackingUrl} size={140} />
            </div>
          </div>

          <p className="text-stone-400 text-xs">
            Escaneá el QR para seguir el estado de tu pedido en cualquier momento.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/tracking/${orderId}`}
            className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition-colors text-sm"
          >
            Seguir mi pedido
          </Link>
          <Link
            href="/"
            className="inline-block border border-stone-200 hover:border-stone-300 text-stone-600 px-6 py-3 rounded-full font-semibold transition-colors text-sm"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Ingresá un email válido';
    if (!form.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newOrderId = `EC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    saveOrder({
      id: newOrderId,
      createdAt: new Date().toISOString(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      notes: form.notes,
      items,
      total: totalPrice,
      status: 'confirmado',
    });
    if (coupon) markCouponUsed(coupon.code);
    setOrderId(newOrderId);
    clearCart();
    setStep('success');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const hasExperiences = items.some((i) => i.product.category === 'experiencias' || i.product.category === 'paquetes');

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Finalizar compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <h2 className="font-semibold text-stone-800 text-lg mb-5">Tus datos</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full border rounded-xl px-4 py-2.5 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-300 transition ${
                    errors.name ? 'border-red-400' : 'border-stone-200'
                  }`}
                  placeholder="María García"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border rounded-xl px-4 py-2.5 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-300 transition ${
                    errors.email ? 'border-red-400' : 'border-stone-200'
                  }`}
                  placeholder="maria@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-xl px-4 py-2.5 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-300 transition ${
                    errors.phone ? 'border-red-400' : 'border-stone-200'
                  }`}
                  placeholder="+598 99 000 000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {hasExperiences && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Fecha preferida
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-300 transition"
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Comentarios o consultas
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-300 transition resize-none"
                placeholder="¿Alguna preferencia o alergia alimentaria? ¿Es para una ocasión especial?"
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
            <strong>Nota:</strong> Nuestro equipo confirmará tu reserva por email o teléfono dentro de las 24 horas. El pago se realiza al momento de la visita o mediante transferencia bancaria.
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-600 text-white py-4 rounded-full font-semibold text-base transition-colors"
          >
            Confirmar reserva
          </button>
        </form>

        {/* Order summary */}
        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-24">
            <h2 className="font-semibold text-stone-800 text-lg mb-5">Tu pedido</h2>

            <div className="space-y-3 text-sm mb-5">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 items-start">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-700 font-medium leading-tight truncate">{product.name}</p>
                    <p className="text-stone-400 text-xs mt-0.5">×{quantity}</p>
                  </div>
                  <span className="shrink-0 text-stone-700 font-medium">
                    U$S {product.price * quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Código de cupón"
                className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded-xl text-sm font-semibold"
              >
                Aplicar
              </button>
            </div>
            {couponError && <p className="text-red-500 text-xs -mt-2 mb-4">{couponError}</p>}

            <div className="border-t border-stone-100 pt-4">
              {coupon && (
                <div className="flex justify-between text-sm text-green-700 mb-2">
                  <span>Cupón {coupon.code}</span>
                  <span>-{coupon.percent}%</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-stone-800 text-lg">
                <span>Total</span>
                <span>U$S {finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
