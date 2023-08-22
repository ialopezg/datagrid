export interface DataGridLocalization {
  actions: string;
  cancel: string;
  changeFilterMode: string;
  clearFilter: string;
  clearSearch: string;
  clearSorting: string;
  columnActions: string;
  containsExact: string;
  edit: string;
  editRow: string;
  empty: string;
  endsWith: string;
  equals: string;
  expand: string;
  expandAll: string;
  filter: string;
  filterByColumn: string;
  filterMode: string;
  fuzzyMatch: string;
  groupByColumn: string;
  groupedBy: string;
  ungroupByColumn: string;
  hideAll: string;
  hideColumn: string;
  loadingData: string;
  notEmpty: string;
  notEquals: string;
  rowActions: string;
  save: string;
  search: string;
  selectAllRows: string;
  selectionMessage: string;
  selectRow: string;
  showAll: string;
  sortByColumnAscending: string;
  sortByColumnDescending: string;
  startsWidth: string;
  thenByMessage: string;
  toggleColumnVisibility: string;
  toggleDensePadding: string;
  toggleFilters: string;
  toggleFullScreen: string;
  toggleSearch: string;
}

export const DefaultLocalization: DataGridLocalization = {
  actions: 'Actions',
  cancel: 'Cancel',
  changeFilterMode: 'Change filter mode',
  clearFilter: 'Clear filter',
  clearSearch: 'Clear search',
  clearSorting: 'Clear sorting',
  columnActions: 'Column actions',
  containsExact: 'Contains exact',
  edit: 'Edit',
  editRow: 'Edit row',
  empty: 'Empty',
  endsWith: 'Ends with',
  equals: 'Equals',
  expand: 'Expand',
  expandAll: 'Expand all',
  filter: 'Filter',
  filterByColumn: 'Filter by {column}',
  filterMode: 'Filter mode',
  fuzzyMatch: 'Fuzzy match',
  groupByColumn: 'Group by {column}',
  groupedBy: 'Grouped by ',
  ungroupByColumn: 'Ungroup by {column}',
  hideAll: 'Hide all',
  hideColumn: 'Hide {column} column',
  loadingData: 'Loading data',
  notEmpty: 'Not empty',
  notEquals: 'Not equals',
  rowActions: 'Row actions',
  save: 'Save',
  search: 'Search',
  selectAllRows: 'Toggle select all rows',
  selectionMessage: '{selectedCount} of {rowCount} row(s) selected',
  selectRow: 'Toggle select row',
  showAll: 'Show all',
  sortByColumnAscending: 'Sort by {column} ascending',
  sortByColumnDescending: 'Sort by {column} descending',
  startsWidth: 'Starts width',
  thenByMessage: ', then by ',
  toggleColumnVisibility: 'Toggle columns visibility',
  toggleDensePadding: 'Toggle dense padding',
  toggleFilters: 'Toggle filters',
  toggleFullScreen: 'Toggle full screen',
  toggleSearch: 'Toggle search',
};
