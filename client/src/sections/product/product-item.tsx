import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export type Props = {
  product: Product;
};

const STOCKS_FLOORING = 10;

export function ProductItem({ product }: Props) {
  // product.imageUrl =
  //   'https://res.cloudinary.com/dkjpuhbdi/image/upload/v1756048338/Reactivities/zfybszf7ve5vhptcvm88.png';
  const status =
    product.stockQuantity === 0
      ? 'Out of stocks'
      : product.stockQuantity > 0 && product.stockQuantity >= STOCKS_FLOORING
        ? 'Low inventory'
        : 'Good';

  const renderStatus = (
    <Label
      variant="inverted"
      color={(status === 'Out of stocks' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.imageUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = <Typography variant="subtitle1">{fCurrency(product.price)}</Typography>;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {renderPrice}
        </Box>
      </Stack>
    </Card>
  );
}
