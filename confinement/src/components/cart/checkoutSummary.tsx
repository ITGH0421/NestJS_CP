import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { fCurrency } from '@/utils/format-number';
import { Iconify } from '@/components/iconify';

export function CheckoutSummary({
  onEdit,
  checkoutState,
  onApplyDiscount,
  promoCode,
  setPromoCode,
  appliedCode
}: {
  onEdit?: () => void;
  checkoutState: {
    subtotal: number;
    discount: number;
    total: number;
    shipping?: number;
    earlyMorningDeliverySurcharge?: number;
    offshoreDeliverySurcharge?: number;
  };
  onApplyDiscount?: () => void;
  promoCode?: string;
  setPromoCode?: (value: string) => void;
  appliedCode?: string;
}) {
  const {
    subtotal = 0,
    discount = 0,
    total = 0,
    shipping = 0,
    earlyMorningDeliverySurcharge = 0,
    offshoreDeliverySurcharge = 0,
  } = checkoutState;

  const grandTotal = subtotal + shipping + earlyMorningDeliverySurcharge + offshoreDeliverySurcharge - discount;

  return (
    <Card>
      <CardHeader
        title="Order summary"
        action={
          onEdit && (
            <Button size="small" onClick={onEdit} >
              Edit
            </Button>
          )
        }
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <SummaryRow label="Subtotal" value={fCurrency(subtotal)} />
        {shipping > 0 && <SummaryRow label="Delivery Fee" value={fCurrency(shipping)} />}
        {earlyMorningDeliverySurcharge > 0 && (
          <SummaryRow label="Early Morning Delivery Surcharge" value={fCurrency(earlyMorningDeliverySurcharge)} />
        )}
        {offshoreDeliverySurcharge > 0 && (
          <SummaryRow label="Offshore Delivery Surcharge" value={fCurrency(offshoreDeliverySurcharge)} />
        )}
        <SummaryRow label="Discount" value={discount ? fCurrency(-discount) : '-'} />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ display: 'flex' }}>
          <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
            Total
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Typography component="span" variant="subtitle1" sx={{ display: 'block', color: 'error.main' }}>
              {fCurrency(grandTotal)}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              (VAT included if applicable)
            </Typography>
          </Box>
        </Box>
        {onApplyDiscount && promoCode !== undefined && setPromoCode && (
          <>
            <TextField
              fullWidth
              placeholder="Discount codes / Gifts"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button color="primary" onClick={onApplyDiscount} sx={{ mr: -0.5 }}>
                      Apply
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            {appliedCode && (
              <Typography variant="body2" color="success.main">
                Promo "{appliedCode}" applied – You saved {fCurrency(discount)}!
              </Typography>
            )}
          </>
        )}
      </Stack>
    </Card>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | number }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography component="span" variant="body2" sx={{ flexGrow: 1, color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography component="span" variant="subtitle2">
        {value}
      </Typography>
    </Box>
  );
}
