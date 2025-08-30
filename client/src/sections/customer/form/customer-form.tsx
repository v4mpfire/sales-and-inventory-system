import { useState } from 'react';

import { Box, Button, Divider, TextField } from '@mui/material';

import { useCustomers } from 'src/utils/hooks/useCustomers';

type Props = {
  onCancel: () => void;
  customer?: Customer;
};

export default function CustomerForm({ onCancel, customer }: Props) {
  const { createCustomer, updateCustomer } = useCustomers();
  const [name, setName] = useState(customer?.name ?? '');
  const [email, setEmail] = useState(customer?.email ?? '');

  const handleSubmit = async () => {
    const cus: Customer = {
      customerId: customer?.customerId ?? 0,
      name,
      email,
    };

    console.log(cus);

    if (customer) {
      await updateCustomer.mutateAsync(cus);
    } else {
      await createCustomer.mutateAsync(cus);
    }

    onCancel();
  };

  return (
    <Box component="form" display="flex" flexDirection="column" gap={3}>
      <Divider />
      <TextField name="Name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField
        name="Email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
          onClick={handleSubmit}
          disabled={updateCustomer.isPending || createCustomer.isPending}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
