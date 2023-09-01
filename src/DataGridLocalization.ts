export interface DataGridLocalization {
  actions: string;
  cancel: string;
  changeFilterMode: string;
  clearFilter: string;
  clearSearch: string;
  clearSort: string;
  clickToCopy: string;
  columnActions: string;
  contains: string;
  copiedToClipboard: string;
  edit: string;
  empty: string;
  endsWidth: string;
  equals: string;
  expand: string;
  expandAll: string;
  filter: string;
  filterByColumn: string;
  filterMode: string;
  filterModeByColumn: string;
  fuzzy: string;
  greaterThan: string;
  groupByColumn: string;
  groupedBy: string;
  ungroupByColumn: string;
  hideAll: string;
  hideColumn: string;
  lessThan: string;
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
  showAllColumns: string;
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
  clearSort: 'Clear sorting',
  clickToCopy: 'Click to copy',
  columnActions: 'Column actions',
  contains: 'Contains exact',
  copiedToClipboard: 'Copied to clipboard!',
  edit: 'Edit',
  empty: 'Empty',
  endsWidth: 'Ends with',
  equals: 'Equals',
  expand: 'Expand',
  expandAll: 'Expand all',
  filter: 'Filter',
  filterByColumn: 'Filter by {column}',
  filterMode: 'Filter mode: {filterType}',
  filterModeByColumn: 'Filtering by {column} - {filterType} ({filterValue})',
  fuzzy: 'Fuzzy match',
  greaterThan: 'Greater than',
  groupByColumn: 'Group by {column}',
  groupedBy: 'Grouped by ',
  ungroupByColumn: 'Ungroup by {column}',
  hideAll: 'Hide all',
  hideColumn: 'Hide {column} column',
  lessThan: 'Less than',
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
  showAllColumns: 'Show all columns',
  sortByColumnAscending: 'Sort by {column} ascending',
  sortByColumnDescending: 'Sort by {column} descending',
  startsWidth: 'Starts width',
  thenByMessage: ', then by ',
  toggleColumnVisibility: 'Toggle columns visibility',
  toggleDensePadding: 'Toggle dense padding',
  toggleFilters: 'Show/Hide filters',
  toggleFullScreen: 'Toggle full screen',
  toggleSearch: 'Show/Hide search',
};
