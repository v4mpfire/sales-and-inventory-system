import React, { useState, useEffect } from 'react';
import {
  useController,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

import { TextField, Typography, Autocomplete } from '@mui/material';

import { useCategories } from 'src/utils/hooks/useCategories';

type Props<T extends FieldValues> = { label: string } & UseControllerProps<T>;

export default function CategoryAutoComplete<T extends FieldValues>(props: Props<T>) {
  const { field } = useController({ ...props });
  const { formState } = useFormContext();
  const [name, setName] = useState(field.value || '');
  const [touched, setTouched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { categories, loadingCategories } = useCategories(true);

  useEffect(() => {
    if (field.value && typeof field.value === 'object') {
      setName(field.value.name || '');
    } else {
      setName(field.value || '');
    }
  }, [field.value]);

  if (loadingCategories || !categories) return <Typography>Loading...</Typography>;

  return (
    <Autocomplete
      options={categories}
      getOptionLabel={(option) => option.name}
      value={selectedCategory}
      onChange={(_, newValue) => {
        const category: Category = newValue === null ? { categoryId: 0, name: '' } : newValue;
        setSelectedCategory(category);
        setName(category.name);
        field.onChange(category);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={name}
          label={props.label}
          onBlur={() => setTouched(true)}
          error={(formState.isSubmitting || formState.isSubmitted || touched) && name === ''}
          helperText={
            (formState.isSubmitting || formState.isSubmitted || touched) && name === ''
              ? 'Category is required'
              : ''
          }
        />
      )}
      isOptionEqualToValue={(option, value) => option.categoryId === value.categoryId}
    />
  );
}
