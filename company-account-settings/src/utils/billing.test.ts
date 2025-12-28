import { calculatePurchaseTotal } from './billing';
import { VAT_RATE } from '../data/billing-constants';
import { describe, it, expect } from 'vitest';

describe('billing utils', () => {
    describe('calculatePurchaseTotal', () => {
        it('should calculate subtotal, vat, and total correctly', () => {
            const price = 1000; // 10.00
            const result = calculatePurchaseTotal(price);

            expect(result.subtotal).toBe(1000);
            expect(result.vat).toBe(1000 * VAT_RATE);
            expect(result.total).toBe(1000 + (1000 * VAT_RATE));
        });

        it('should handle zero price', () => {
            const result = calculatePurchaseTotal(0);
            expect(result.subtotal).toBe(0);
            expect(result.vat).toBe(0);
            expect(result.total).toBe(0);
        });

        it('should handle decimal results (rounding check)', () => {
            // If VAT is 20%
            // 1234 * 0.2 = 246.8
            const price = 1234;
            const result = calculatePurchaseTotal(price);

            expect(result.subtotal).toBe(1234);
            expect(result.vat).toBeCloseTo(1234 * VAT_RATE);
            expect(result.total).toBeCloseTo(1234 * (1 + VAT_RATE));
        });
    });
});
