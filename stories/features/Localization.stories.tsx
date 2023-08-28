import faker from '@faker-js/faker';
import { createTheme, ThemeProvider } from '@mui/material';
import { esES } from '@mui/material/locale';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Localization',
  component: DataGrid,
  parameters: {
    status: {
      type: 'stable',
    },
  },
};
export default meta;

const columns = [
  {
    Header: 'Primer nombre',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Apellido',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Dirección',
    accessor: 'address' as const,
  },
  {
    Header: 'Ciudad',
    accessor: 'city' as const,
  },
  {
    Header: 'Estado',
    accessor: 'state' as const,
  },
];

const data = [...Array(100)].map((_) => ({
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  state: faker.address.state(),
}));

export const SpanishLocalization: Story<DataGridProps> = () => (
  <ThemeProvider theme={createTheme({}, esES)}>
    <DataGrid
      // @ts-ignore
      columns={columns}
      data={data}
      enableColumnGrouping
      enableRowEditing
      enableRowSelection
      localization={{
        actions: 'Acciones',
        columnActions: 'Acciones de columna',
        clearFilter: 'Quitar filtro',
        clearSort: 'Quitar filtro',
        clearSearch: 'Limpiar búsqueda',
        edit: 'Editar',
        groupByColumn: 'Agrupar por {column}',
        hideColumn: 'Ocultar columna {column}',
        sortByColumnAscending: 'Ordenar {column} ascendente',
        sortByColumnDescending: 'Ordenar {column} descendente',
        ungroupByColumn: 'Desagrupar {column} column',
        hideAll: 'Ocultar todo',
        showAll: 'Mostrar todo',
        expandAll: 'Expandir todo',
        expand: 'Expandir',
        filterByColumn: 'Filtrar por {column}',
        cancel: 'Cancelar',
        save: 'Guardar',
        rowActions: 'Acciones de fila',
        search: 'Buscar',
        selectAllRows: 'Seleccionar todo',
        selectRow: 'Seleccionar fila',
        toggleColumnVisibility: 'Mostrar/Ocultar columnas',
        toggleDensePadding: 'Cambiar densidad de relleno',
        toggleFilters: 'Mostrar/Ocultar filtros',
        toggleFullScreen: 'Activar/Desactivar pantalla completa',
        toggleSearch: 'Mostrar/Ocultar búsqueda',
        selectionMessage: '{selectedCount} de {rowCount} fila(s) seleccionadas',
        groupedBy: 'Agrupado por ',
        thenByMessage: ', luego por ',
      }}
    />
  </ThemeProvider>
);
