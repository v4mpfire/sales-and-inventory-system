import type { CategorySchema } from 'src/utils/schemas/categorySchema';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, Divider } from '@mui/material';

import { useCategories } from 'src/utils/hooks/useCategories';
import { categorySchena } from 'src/utils/schemas/categorySchema';

import TextInput from 'src/shared/components/text-input';

type Props = {
  onCancel: () => void;
  category?: Category;
};

export default function CategoryForm({ onCancel, category }: Props) {
  const { createCategory, updateCategory } = useCategories();
  const { reset, handleSubmit, control } = useForm<CategorySchema>({
    mode: 'onTouched',
    resolver: zodResolver(categorySchena),
  });

  useEffect(() => {
    if (category) {
      reset({
        ...category,
      });
    }
  }, [category, reset]);

  const onSubmit = async (data: CategorySchema) => {
    const request: Category = {
      ...data,
      categoryId: category?.categoryId ?? 0,
    };

    if (category) {
      await updateCategory.mutateAsync(request);
    } else {
      await createCategory.mutateAsync(request);
    }

    onCancel();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <Divider />
      <TextInput name="name" label="Name" control={control} />
      <Box display="flex" justifyContent="end" gap={3}>
        <Button
          color="inherit"
          onClick={onCancel}
          disabled={updateCategory.isPending || createCategory.isPending}
        >
          Cancel
        </Button>
        <Button
          color="success"
          variant="contained"
          type="submit"
          disabled={updateCategory.isPending || createCategory.isPending}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
