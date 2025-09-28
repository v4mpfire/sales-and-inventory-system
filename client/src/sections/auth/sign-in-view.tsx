import type { LoginSchema } from 'src/utils/schemas/loginSchema';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useAccount } from 'src/utils/hooks/useAccount';
import { loginSchema } from 'src/utils/schemas/loginSchema';

import TextInput from 'src/shared/components/text-input';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema),
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser } = useAccount();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || '/');
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Login Your Account</Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <TextInput name="email" label="Email" control={control} />

        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          Forgot password?
        </Link>
        <TextInput
          name="password"
          label="Password"
          control={control}
          type={showPassword ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          typeof="submit"
          disabled={isSubmitting || !isValid}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
