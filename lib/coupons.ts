export interface Coupon {
  code: string;
  percent: number;
  expiresAt: string;
  minTotal: number;
}

const COUPONS: Coupon[] = [
  { code: 'VENDIMIA10', percent: 10, expiresAt: '2026-12-31', minTotal: 50 },
  { code: 'BIENVENIDA15', percent: 15, expiresAt: '2026-11-30', minTotal: 100 },
];

const USED_KEY = 'ec_used_coupons';

export function findCoupon(code: string): Coupon | undefined {
  return COUPONS.find((c) => c.code === code.trim().toUpperCase());
}

export function isCouponValid(coupon: Coupon, total: number): boolean {
  if (new Date(coupon.expiresAt) > new Date()) return false;
  return total >= coupon.minTotal;
}

// Returns the total to pay after applying the coupon discount.
export function applyCoupon(total: number, coupon: Coupon): number {
  return Math.round(total * coupon.percent) / 100;
}

export function getUsedCoupons(): string[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(USED_KEY) ?? '[]');
}

export function markCouponUsed(code: string): void {
  localStorage.setItem(USED_KEY, JSON.stringify([...getUsedCoupons(), code]));
}
