export interface Localization {
  actions?: string;
  cancel?: string;
  clear?: string;
  clearSorting?: string;
  columnActions?: string;
  edit?: string;
  expand?: string;
  expandAll?: string;
  filter?: string;
  groupByColumn?: string;
  ungroupByColumn?: string;
  hideColumn?: string;
  hideColumns?: string;
  loadingData?: string;
  rowActions?: string;
  save?: string;
  search?: string;
  selectAll?: string;
  sortAscending?: string;
  sortDescending?: string;
  toggleDensePadding?: string;
  toggleFilters?: string;
}

export const defaultLocalization: Localization = {
  actions: 'Actions',
  cancel: 'Cancel',
  clear: 'Clear',
  clearSorting: 'Clear sorting',
  columnActions: 'Column actions',
  edit: 'Edit',
  expand: 'Expand',
  expandAll: 'Expand all',
  filter: 'Filter',
  groupByColumn: 'Group by column',
  ungroupByColumn: 'Ungroup column',
  hideColumn: 'Hide column',
  hideColumns: 'Hide columns',
  loadingData: 'Loading data',
  rowActions: 'Row actions',
  save: 'Save',
  search: 'Search',
  selectAll: 'Select all',
  sortAscending: 'Sort ascending',
  sortDescending: 'Sort descending',
  toggleDensePadding: 'Toggle dense padding',
  toggleFilters: 'Toggle filters',
};
