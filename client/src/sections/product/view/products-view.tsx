import { Link } from 'react-router';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { useProducts } from 'src/utils/hooks/useProducts';

import { DashboardContent } from 'src/layouts/dashboard';
import LoadingSpinner from 'src/shared/components/loading-spinner';

import { Iconify } from 'src/components/iconify';

import { ProductItem } from '../product-item';
import { ProductSort } from '../product-sort';
import { ProductFilters } from '../product-filters';

import type { FiltersProps } from '../product-filters';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'shose', label: 'Shose' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'accessories', label: 'Accessories' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const defaultFilters = {
  price: '',
  gender: [GENDER_OPTIONS[0].value],
  colors: [COLOR_OPTIONS[4]],
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

export function ProductsView() {
  const [sortBy, setSortBy] = useState('featured');

  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const { products, productsLoading } = useProducts();

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  );

  return (
    <DashboardContent>
      <Typography variant="h4">Products</Typography>

      {productsLoading ? (
        <LoadingSpinner textContent="Loading products..." />
      ) : (
        <>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ my: 1 }}>
              <Button
                color="success"
                component={Link}
                to="/products/new"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                New Product
              </Button>
            </Box>

            {/* Filters and Sort on the right */}
            <Box
              sx={{
                my: 1,
                gap: 1,
                display: 'flex',
                flexShrink: 0,
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
              }}
            >
              <ProductFilters
                canReset={canReset}
                filters={filters}
                onSetFilters={handleSetFilters}
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
                onResetFilter={() => setFilters(defaultFilters)}
                options={{
                  genders: GENDER_OPTIONS,
                  categories: CATEGORY_OPTIONS,
                  ratings: RATING_OPTIONS,
                  price: PRICE_OPTIONS,
                  colors: COLOR_OPTIONS,
                }}
              />

              <ProductSort
                sortBy={sortBy}
                onSort={handleSort}
                options={[
                  { value: 'featured', label: 'Featured' },
                  { value: 'newest', label: 'Newest' },
                  { value: 'priceDesc', label: 'Price: High-Low' },
                  { value: 'priceAsc', label: 'Price: Low-High' },
                ]}
              />
            </Box>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: {
                xs: 'center',
                sm: 'flex-start',
              },
              alignItems: 'center',
            }}
          >
            {products?.map((product) => (
              <Grid key={product.productId} size={{ xs: 8, sm: 4, md: 2 }}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>

          <Pagination count={1} color="primary" sx={{ mt: 8, mx: 'auto' }} />
        </>
      )}
    </DashboardContent>
  );
}
