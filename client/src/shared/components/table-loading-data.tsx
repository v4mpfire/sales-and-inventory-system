import type { TableRowProps } from '@mui/material/TableRow';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { CircularProgress, circularProgressClasses } from '@mui/material';

// ----------------------------------------------------------------------

type TableNoDataProps = TableRowProps & {
  textContent: string;
};

export function TableLoadingData({ textContent, ...other }: TableNoDataProps) {
  return (
    <TableRow {...other}>
      <TableCell align="center" colSpan={7}>
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
      </TableCell>
    </TableRow>
  );
}
