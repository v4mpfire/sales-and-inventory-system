import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, Divider } from '@mui/material';

import { useCustomers } from 'src/utils/hooks/useCustomers';
import { customerSchema, type CustomerSchema } from 'src/utils/schemas/customerSchema';

import TextInput from 'src/shared/components/text-input';

type Props = {
  onCancel: () => void;
  customer?: Customer;
};

export default function CustomerForm({ onCancel, customer }: Props) {
  const { createCustomer, updateCustomer } = useCustomers();
  const { reset, handleSubmit, control } = useForm<CustomerSchema>({
    mode: 'onTouched',
    resolver: zodResolver(customerSchema),
  });

  useEffect(() => {
    if (customer) {
      reset({ ...customer });
    }
  }, [customer, reset]);

  const onSubmit = async (data: CustomerSchema) => {
    const request: Customer = {
      ...data,
      customerId: customer?.customerId ?? 0,
    };

    if (customer) {
      await updateCustomer.mutateAsync(request);
    } else {
      await createCustomer.mutateAsync(request);
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
      <TextInput name="email" label="Email" control={control} />
      <Box display="flex" justifyContent="end" gap={3}>
        <Button
          color="inherit"
          onClick={onCancel}
          disabled={updateCustomer.isPending || createCustomer.isPending}
        >
          Cancel
        </Button>
        <Button
          color="success"
          variant="contained"
          type="submit"
          disabled={updateCustomer.isPending || createCustomer.isPending}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
