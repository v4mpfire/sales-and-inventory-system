import { Box, Typography, CircularProgress, circularProgressClasses } from '@mui/material';

type Props = {
  textContent: string;
};

export default function LoadingSpinner({ textContent }: Props) {
  return (
    <Box sx={{ py: 15, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {textContent}
      </Typography>

      <Typography variant="body2">
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={(theme) => ({
            color: '#1a90ff',
            animationDuration: '550ms',
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
            ...theme.applyStyles('dark', {
              color: '#308fe8',
            }),
          })}
          size={40}
          thickness={4}
        />
      </Typography>
    </Box>
  );
}
