'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { applyDiscount } from '@/components/promotion/applyDiscount';
import rawPromoData from '@/data/promo.json';

// Define the CartItem type to match the structure of items in localStorage
type CartItem = {
  productId: number;
  name: string;
  price: number;
  totalprice: number;
  quantity: number;
  image: string;
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

export default function CheckoutCartPage({ addon }: {
  addon: {
    addon_id: number;
    name: string;
    type: string;
    price: number;
  }[];
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    const storedDiscount = localStorage.getItem('discountAmount');
    const storedPromo = localStorage.getItem('appliedPromoCode');

    if (cart) setCartItems(JSON.parse(cart));
    if (storedDiscount) setDiscountAmount(parseFloat(storedDiscount));
    if (storedPromo) {
      setAppliedCode(storedPromo);
      setPromoCode(storedPromo);
    }
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/checkout_sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ products: cartItems }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error('error during checkout:', error);
    }
  };

  const handleRemoveItem = (productId: number) => {
    const cart = localStorage.getItem('cart');
    let updated: CartItem[] = [];
    if (cart) {
      const cartArray: CartItem[] = JSON.parse(cart);
      const toRemove = cartItems.find(item => item.productId === productId);
      if (toRemove) {
        updated = cartArray.filter(
          item => !(item.productId === toRemove.productId && item.startDate === toRemove.startDate)
        );
      } else {
        updated = cartArray;
      }
    }
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    if (updated.length === 0) {
      localStorage.removeItem('discountAmount');
      localStorage.removeItem('appliedPromoCode');
    }
  };

  const handleQuantityChange = (productId: number, delta: number) => {
    const updated = cartItems.map(item =>
      item.productId === productId
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + delta),
            totalprice: item.totalprice * Math.max(1, item.quantity + delta),
          }
        : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleApplyDiscount = () => {
    const promoData = rawPromoData.map((promo: any) => ({
      ...promo,
      type: promo.type === 'percentage' ? 'percentage' : 'flat',
    }));
    const result = applyDiscount(promoCode, cartItems, promoData);
    if (!result.valid) {
      alert(result.message || 'Invalid promo code');
      setDiscountAmount(0);
      setAppliedCode('');
      localStorage.removeItem('discountAmount');
      localStorage.removeItem('appliedPromoCode');
      return;
    }
    setDiscountAmount(result.discountAmount);
    setAppliedCode(result.appliedCode);
    localStorage.setItem('discountAmount', result.discountAmount.toString());
    localStorage.setItem('appliedPromoCode', result.appliedCode);
    const updatedCartItems = cartItems.map(item => ({
      ...item,
      totalprice: item.totalprice - result.discountAmount,
      discountAmount: result.discountAmount,
    }));
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const addonPrice = Object.values(item.addOns || {}).reduce((sum, addonIdStr) => {
      const addonId = parseInt(addonIdStr || '0');
      const found = addon.find(a => a.addon_id === addonId);
      return sum + (found?.price || 0);
    }, 0);
    return acc + (item.price + addonPrice) * item.quantity;
  }, 0);
  const shipping = 0;
  const total = subtotal - discountAmount + shipping;


    return (
        <Box sx={{ px: 4, py: 6 }}>
            <Typography variant="h4" fontWeight="bold" mb={4} color='primary'>Checkout</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                <Card sx={{ flex: 2 }}>
                    <CardContent>
                        <Typography variant="h6" mb={2}>Cart ({cartItems.length} item{cartItems.length !== 1 && 's'})</Typography>
                        {cartItems.map((item) => {
                            const addonPrice = Object.values(item.addOns || {}).reduce((sum, addonIdStr) => {
                                const addonId = parseInt(addonIdStr || '0');
                                const found = addon.find((a) => a.addon_id === addonId);
                                return sum + (found?.price || 0);
                            }, 0);
                            const itemTotal = (item.price + addonPrice) * item.quantity;

                            return (
                                <Box
                                    key={`${item.productId}-${item.startDate}`}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isMobile ? 'column' : 'row',
                                        justifyContent: 'space-between',
                                        borderBottom: '1px solid #e0e0e0',
                                        pb: 2,
                                        mb: 3,
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{ flex: 1 }}>
                                        <Typography fontWeight={600}>{item.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.startOption === 'Confirmed' ? 'Confirmed' : 'E.D.D'} Start: {item.startDate} · {item.lunchOrDinner}
                                        </Typography>
                                        {item.addOns && Object.values(item.addOns).some((addonIdStr) => {
                                            const addonId = parseInt(addonIdStr || '0');
                                            return addonId && addon.find((a) => a.addon_id === addonId);
                                        }) && (
                                                <Box sx={{ mt: 1.5 }}>
                                                    <Typography fontWeight={600} variant="body2" sx={{ mb: 0.5 }}>Add On:</Typography>
                                                    {Object.entries(item.addOns).map(([key, addonIdStr]) => {
                                                        const addonId = parseInt(addonIdStr || '0');
                                                        const matched = addon.find((a) => a.addon_id === addonId);
                                                        if (!matched) return null;
                                                        return (
                                                            <Typography key={key} variant="body2" color="text.secondary">
                                                                • {matched.name} - ${matched.price.toFixed(2)}
                                                            </Typography>
                                                        );
                                                    })}
                                                </Box>
                                            )}
                                        {item.specialRequest && (
                                            <Box sx={{ mt: 1.5 }}>
                                                <Typography fontWeight={600} variant="body2" sx={{ mb: 0.5 }}>Special Request:</Typography>
                                                <Typography variant="body2" color="text.secondary">{item.specialRequest}</Typography>
                                            </Box>
                                        )}
                                        {item.notes && (
                                            <Box sx={{ mt: 1.5 }}>
                                                <Typography fontWeight={600} variant="body2" sx={{ mb: 0.5 }}>Notes:</Typography>
                                                <Typography variant="body2" color="text.secondary">{item.notes}</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'nowrap', overflowX: 'auto', mt: 2 }}>
                                        <Typography whiteSpace="nowrap">${itemTotal.toFixed(2)}</Typography>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <IconButton size="small" onClick={() => handleQuantityChange(item.productId, -1)}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography>{item.quantity}</Typography>
                                            <IconButton size="small" onClick={() => handleQuantityChange(item.productId, 1)}>
                                                <AddIcon />
                                            </IconButton>
                                        </Stack>
                                        <Typography fontWeight="bold" fontSize="1.1rem" whiteSpace="nowrap">${itemTotal.toFixed(2)}</Typography>
                                        <IconButton onClick={() => {
                                            const cartKey = `cart-${item.productId}-${item.startDate}`;
                                            localStorage.removeItem(cartKey);
                                            handleRemoveItem(item.productId);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            );
                        })}
                        <Box mt={3}>
                            <Button variant="outlined" onClick={() => window.location.href = '/product'}>
                                Continue Shopping
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6" mb={2}>Order summary</Typography>
                        <Stack spacing={1}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Subtotal</Typography>
                                <Typography>${subtotal.toFixed(2)}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Discount</Typography>
                                <Typography color="success.main">- ${discountAmount.toFixed(2)}</Typography>
                            </Stack>
                            {/* <Stack direction="row" justifyContent="space-between">
                                <Typography>Shipping</Typography>
                                <Typography color="success.main">Free</Typography>
                            </Stack> */}
                            <Divider sx={{ my: 1 }} />
                            <Stack direction="row" justifyContent="space-between">
                                <Typography fontWeight="bold"> Grand Total</Typography>
                                <Typography fontWeight="bold" color="error.main">${total.toFixed(2)}</Typography>
                            </Stack>
                            <Typography variant="caption" color="text.secondary">
                                (Tax included and shipping calculated at checkout)
                            </Typography>
                            <TextField
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Enter promo code"
                                size="small"
                                InputProps={{ endAdornment: <Button onClick={handleApplyDiscount}>Apply</Button> }}
                                sx={{ mt: 2 }}
                            />
                            {appliedCode && (
                                <Typography variant="body2" color="success.main" mt={1}>
                                    Promo "{appliedCode}" applied – You saved ${discountAmount.toFixed(2)}!
                                </Typography>
                            )}
                            <Button onClick={handleCheckout} variant="contained" fullWidth sx={{ mt: 2 }}>
                                Check out
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );
}
