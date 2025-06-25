import { CartItem } from '@/components/cart/handleAddToCart';

export type Promo = {
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  applicableText?: string;
  limitPerCart?: boolean;
};

type DiscountResult = {
  discountAmount: number;
  appliedCode: string;
  valid: boolean;
  message?: string;
};

export const applyDiscount = (
  promoCode: string,
  cartItems: CartItem[],
  promoData: Promo[]
): DiscountResult => {
  const code = promoCode.trim().toUpperCase();
  const match = promoData.find((p) => p.code === code);

  if (!match) {
    return {
      discountAmount: 0,
      appliedCode: '',
      valid: false,
      message: 'Invalid promo code',
    };
  }

  let discount = 0;
  let applied = false;

  cartItems.forEach((item) => {
    const nameMatches = match.applicableText
      ? item.name.toLowerCase().includes(match.applicableText.toLowerCase())
      : true;

    if (nameMatches && (!match.limitPerCart || !applied)) {
      const itemDiscount =
        match.type === 'percentage'
          ? item.totalprice * (match.value / 100)
          : match.value;

      discount += itemDiscount;
      if (match.limitPerCart) applied = true;
    }
  });

  if (discount > 0) {
    return {
      discountAmount: discount,
      appliedCode: code,
      valid: true,
    };
  } else {
    return {
      discountAmount: 0,
      appliedCode: '',
      valid: false,
      message: 'Promo not applicable to your cart items.',
    };
  }
};
