export type CartItem = {
  productId: number;
  name: string;
  totalprice: number;
  price: number;
  quantity: number;
  startDate: string;
  lunchOrDinner: string;
  startOption: string;
  riceOption: string;
  specialRequest: string;
  notes: string;
  addOns: {
    porkTrotter: string | null;
    fishSoup: string | null;
    birdNest: string | null;
  };
  discountAmount: number | 0;
};

export const handleAddToCart = (item: CartItem, callback?: () => void) => {
  const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  existingCart.push(item);
  localStorage.setItem('cart', JSON.stringify(existingCart));

  if (callback) callback();
};

