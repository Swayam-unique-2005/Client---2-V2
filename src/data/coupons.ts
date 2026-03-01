export interface Coupon {
    code: string;
    description: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    minOrder: number;
    maxDiscount?: number;
    constraints?: string;
}

export const availableCoupons: Coupon[] = [
    {
        code: "PURE15",
        description: "Flat 15% off",
        discountType: "percentage",
        discountValue: 15,
        minOrder: 599,
        maxDiscount: 500,
        constraints: "Not applicable on combos",
    },
    {
        code: "SAVE200",
        description: "Save ₹200 on your order",
        discountType: "fixed",
        discountValue: 200,
        minOrder: 999,
        constraints: "One time use per customer",
    },
    {
        code: "APP17",
        description: "Extra 17% off",
        discountType: "percentage",
        discountValue: 17,
        minOrder: 499,
        maxDiscount: 750,
        constraints: "App exclusive offer",
    },
    {
        code: "FIRST10",
        description: "10% off for new customers",
        discountType: "percentage",
        discountValue: 10,
        minOrder: 299,
        maxDiscount: 300,
        constraints: "Valid for first order only",
    },
];

export function calculateDiscount(coupon: Coupon, subtotal: number): number {
    if (subtotal < coupon.minOrder) return 0;
    if (coupon.discountType === "fixed") return coupon.discountValue;
    const discount = (subtotal * coupon.discountValue) / 100;
    return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
}
