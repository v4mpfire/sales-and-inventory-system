import type { TableRowProps } from '@mui/material/TableRow';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import LoadingSpinner from './loading-spinner';

// ----------------------------------------------------------------------

type TableNoDataProps = TableRowProps & {
  textContent: string;
};

export function TableLoadingData({ textContent, ...other }: TableNoDataProps) {
  return (
    <TableRow {...other}>
      <TableCell align="center" colSpan={7}>
        <LoadingSpinner textContent={textContent} />
      </TableCell>
    </TableRow>
  );
}
