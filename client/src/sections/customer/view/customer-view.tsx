import { useState, useContext, useCallback, createContext } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useCustomers } from 'src/utils/hooks/useCustomers';

import { DashboardContent } from 'src/layouts/dashboard';
import { TableNoData } from 'src/shared/components/table-no-data';
import TransitionsModal from 'src/shared/components/transition-modal';
import { TableLoadingData } from 'src/shared/components/table-loading-data';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableEmptyRows } from 'src/sections/user/table-empty-rows';

import CustomerForm from '../form/customer-form';
import { CustomerTableRow } from '../customer-table-row';
import { CustomerTableHead } from '../customer-table-head';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { CustomerTableToolbar } from '../customer-table-toolbar';

// ----------------------------------------------------------------------

type Props = {
  handleSelectCustomer: (id: number) => void;
};
// You allow `undefined` as the default value
const CustomerContext = createContext<Props | undefined>(undefined);

export function CustomerView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);

  const { customers, loadingCustomers } = useCustomers(true);

  const safeCustomers = customers ?? [];

  const dataFiltered: Customer[] | undefined = applyFilter({
    inputData: safeCustomers,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleSelectCustomer = (id: number) => {
    setSelectedCustomer(safeCustomers.find((x) => x.customerId === id));
    setOpen(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(undefined);
  };

  return (
    <CustomerContext.Provider value={{ handleSelectCustomer }}>
      <DashboardContent>
        <TransitionsModal
          title={selectedCustomer ? 'Update Customer' : 'Create Customer'}
          open={open}
          onClose={handleClose}
        >
          <CustomerForm onCancel={handleClose} customer={selectedCustomer} />
        </TransitionsModal>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Customers
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleOpen}
          >
            New customer
          </Button>
        </Box>

        <Card>
          <CustomerTableToolbar
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <CustomerTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={safeCustomers.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      safeCustomers.map((customer) => customer.customerId)
                    )
                  }
                  headLabel={[
                    { id: 'customerId', label: 'Id' },
                    { id: 'name', label: 'Name' },
                    { id: 'email', label: 'Email' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <CustomerTableRow
                        key={row.customerId}
                        row={row}
                        selected={table.selected.includes(row.customerId)}
                        onSelectRow={() => table.onSelectRow(row.customerId)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, safeCustomers.length)}
                  />
                  {loadingCustomers && <TableLoadingData textContent="Loading customers..." />}
                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={table.page}
            count={safeCustomers.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>
    </CustomerContext.Provider>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: number[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: number) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};
