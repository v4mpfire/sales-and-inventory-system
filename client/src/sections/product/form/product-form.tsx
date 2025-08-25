import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { Box, Card, Grid, Button, Typography } from '@mui/material';

import { useProducts } from 'src/utils/hooks/useProducts';
import { useCategories } from 'src/utils/hooks/useCategories';
import { productSchema, type ProductSchema } from 'src/utils/schemas/productSchema';

import TextInput from 'src/shared/components/text-input';
import SplashScreen from 'src/shared/components/splash-screen';

import CategoryAutoComplete from 'src/sections/category/category-auto-complete';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const methods = useForm<ProductSchema>({
    mode: 'onTouched',
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: '',
      category: {
        name: '',
      },
    },
  });

  const {
    product: modifyProduct,
    productLoading,
    createProduct,
    updateProduct,
  } = useProducts(Number(id));
  const { categories, loadingCategories } = useCategories(true);

  useEffect(() => {
    if (modifyProduct) {
      methods.reset({
        ...modifyProduct,
        barcode: modifyProduct.barcode === null ? '' : modifyProduct.barcode,
        price: modifyProduct.price.toString(),
        stockQuantity: modifyProduct.stockQuantity.toString(),
        category: {
          categoryId: modifyProduct.categoryId,
          name: modifyProduct.categoryName,
        },
      });
    }
  }, [modifyProduct, methods]);

  const onSubmit = async (data: ProductSchema) => {
    const request: Product = {
      productId: modifyProduct?.productId ?? 0,
      name: data.name,
      barcode: data?.barcode,
      price: parseFloat(data.price),
      stockQuantity: data.stockQuantity ? parseInt(data.stockQuantity) : 0,
      categoryId: data.category.categoryId,
      categoryName: data.category.name,
    };

    if (modifyProduct) {
      await updateProduct.mutateAsync(request, {
        onSuccess: () => {
          navigate('/products');
        },
      });
    } else {
      await createProduct.mutateAsync(request, {
        onSuccess: () => {
          navigate('/products');
        },
      });
    }
  };

  if (productLoading || loadingCategories) return <SplashScreen />;

  return (
    <Grid justifyContent="center" sx={{ maxWidth: '100%', my: 2 }}>
      <Grid
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '90%',
            md: '80%',
            lg: '70%',
          },
        }}
      >
        <Card sx={{ borderRadius: 1, padding: 3, mx: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            color={modifyProduct ? 'info' : 'success'}
            marginBottom={2}
          >
            {modifyProduct ? 'Edit Product' : 'New Product'}
          </Typography>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={methods.handleSubmit(onSubmit)}
              display="flex"
              flexDirection="column"
              gap={3}
              marginBottom={3}
            >
              <CategoryAutoComplete
                control={methods.control}
                name="category"
                label="Select Category"
                categories={categories!}
              />
              <TextInput name="name" label="Name" control={methods.control} />
              <TextInput name="barcode" label="Barcode" control={methods.control} />
              <TextInput name="price" label="Price" type="number" control={methods.control} />
              <TextInput
                name="stockQuantity"
                label="Stock Quantity"
                type="number"
                control={methods.control}
              />
              <Box display="flex" justifyContent="end" gap={3}>
                <Button color="inherit" component={Link} to="/products">
                  Cancel
                </Button>
                <Button
                  color={modifyProduct ? 'info' : 'success'}
                  variant="contained"
                  type="submit"
                  disabled={createProduct.isPending}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </FormProvider>
        </Card>
      </Grid>
    </Grid>
  );
}
