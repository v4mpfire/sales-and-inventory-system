import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { Box, Card, Grid, Button, Typography } from '@mui/material';

import { useProducts } from 'src/utils/hooks/useProducts';
import { productSchema, type ProductSchema } from 'src/utils/schemas/productSchema';

import TextInput from 'src/shared/components/text-input';

import CategoryAutoComplete from 'src/sections/category/category-auto-complete';

type Props = {
  modifyProduct?: Product;
};
export default function ProductForm({ modifyProduct }: Props) {
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

  const { createProduct } = useProducts();

  useEffect(() => {
    if (modifyProduct) {
      methods.reset({
        ...modifyProduct,
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
    const product: Product = {
      productId: modifyProduct?.productId ?? 0,
      name: data.name,
      barcode: data?.barcode,
      price: parseFloat(data.price),
      stockQuantity: data.stockQuantity ? parseInt(data.stockQuantity) : 0,
      categoryId: data.category.categoryId,
      categoryName: data.category.name,
    };

    await createProduct.mutateAsync(product);
  };

  return (
    <Grid justifyContent="center" sx={{ maxWidth: '100%' }}>
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
          <Typography variant="h5" gutterBottom color="success" marginBottom={2}>
            New Product
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
                <Button color="inherit">Cancel</Button>
                <Button
                  color="success"
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
