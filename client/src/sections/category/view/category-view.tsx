import { useState, useContext, useCallback, createContext } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useCategories } from 'src/utils/hooks/useCategories';

import { DashboardContent } from 'src/layouts/dashboard';
import TransitionsModal from 'src/shared/components/transition-modal';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from 'src/sections/user/table-no-data';
import { TableEmptyRows } from 'src/sections/user/table-empty-rows';

import CategoryForm from '../form/category-form';
import { CategoryTableRow } from '../category-table-row';
import { CategoryTableHead } from '../category-table-head';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { CategoryTableToolbar } from '../category-table-toolbar';
// import { emptyRows, applyFilter, getComparator } from 'src/sections/category/utils';

// ----------------------------------------------------------------------

type Props = {
  handleSelectCategory: (id: number) => void;
};
// You allow `undefined` as the default value
const CategoryContext = createContext<Props | undefined>(undefined);

export function CategoryView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  const { categories, loadingCategories } = useCategories(true);

  if (loadingCategories || !categories) return <Typography>Loading...</Typography>;

  const dataFiltered: Category[] | undefined = applyFilter({
    inputData: categories!,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleSelectCategory = (id: number) => {
    setSelectedCategory(categories.find((x) => x.categoryId === id));
    setOpen(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(undefined);
  };

  return (
    <CategoryContext.Provider value={{ handleSelectCategory }}>
      <DashboardContent>
        <TransitionsModal
          title={selectedCategory ? 'Update Category' : 'Create Category'}
          open={open}
          onClose={handleClose}
        >
          <CategoryForm onCancel={handleClose} category={selectedCategory} />
        </TransitionsModal>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Categories
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleOpen}
          >
            New category
          </Button>
        </Box>

        <Card>
          <CategoryTableToolbar
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
                <CategoryTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={categories.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      categories.map((category) => category.categoryId)
                    )
                  }
                  headLabel={[
                    { id: 'categoryId', label: 'Id' },
                    { id: 'name', label: 'Name' },
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
                      <CategoryTableRow
                        key={row.categoryId}
                        row={row}
                        selected={table.selected.includes(row.categoryId)}
                        onSelectRow={() => table.onSelectRow(row.categoryId)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, categories.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={table.page}
            count={categories.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>
    </CategoryContext.Provider>
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

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
