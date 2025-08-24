import type { ChangeEvent } from 'react';

import { useState } from 'react';

import { Box, Button, Divider, TextField } from '@mui/material';

import { useCategories } from 'src/utils/hooks/useCategories';

type Props = {
  onCancel: () => void;
  category?: Category;
};

export default function CategoryForm({ onCancel, category }: Props) {
  const { createCategory, updateCategory } = useCategories();
  const [name, setName] = useState(category?.name ?? '');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    const cat: Category = {
      categoryId: category?.categoryId ?? 0,
      name,
    };

    if (category) {
      await updateCategory.mutateAsync(cat);
    } else {
      await createCategory.mutateAsync(cat);
    }

    onCancel();
  };

  return (
    <Box component="form" display="flex" flexDirection="column" gap={3}>
      <Divider />
      <TextField name="Name" label="Name" value={name} onChange={handleOnChange} />
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
          onClick={handleSubmit}
          disabled={updateCategory.isPending || createCategory.isPending}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
