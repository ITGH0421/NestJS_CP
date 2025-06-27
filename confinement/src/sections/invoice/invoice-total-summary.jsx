import Box from '@mui/material/Box';

import { fPercent, fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export function InvoiceTotalSummary({
  sx,
  taxes,
  shipping,
  subtotal,
  discount,
  totalAmount,
  ...other
}) {
  const rowStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const labelStyles = {
    color: 'text.secondary',
  };

  const valueStyles = {
    width: 160,
  };

  return (
    <Box
      sx={[
        {
          mt: 3,
          gap: 2,
          display: 'flex',
          textAlign: 'right',
          typography: 'body2',
          alignItems: 'flex-end',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={rowStyles}>
        <Box component="span" sx={labelStyles}>
          Subtotal
        </Box>
        <Box component="span" sx={[valueStyles, { fontWeight: 'fontWeightSemiBold' }]}>
          {fCurrency(subtotal) || '-'}
        </Box>
      </Box>

      <Box sx={rowStyles}>
        <Box component="span" sx={labelStyles}>
          Shipping
        </Box>
        <Box component="span" sx={[{ ...valueStyles }, !!shipping && { color: 'error.main' }]}>
          {shipping ? `- ${fCurrency(shipping)}` : '-'}
        </Box>
      </Box>

      <Box sx={rowStyles}>
        <Box component="span" sx={labelStyles}>
          Discount
        </Box>

        <Box component="span" sx={[{ ...valueStyles }, !!discount && { color: 'error.main' }]}>
          {discount ? `- ${fCurrency(discount)}` : '-'}
        </Box>
      </Box>

      <Box sx={rowStyles}>
        <Box component="span" sx={labelStyles}>
          Taxes
        </Box>
        <Box component="span" sx={valueStyles}>
          {taxes ? fPercent(taxes) : '-'}
        </Box>
      </Box>

      <Box sx={[rowStyles, { typography: 'subtitle1' }]}>
        <Box component="span">Total</Box>
        <Box component="span" sx={valueStyles}>
          {fCurrency(totalAmount) || '-'}
        </Box>
      </Box>
    </Box>
  );
}
