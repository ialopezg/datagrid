export interface Localization {
  clear?: string;
  clearSorting?: string;
  columnActions?: string;
  expand?: string;
  expandAll?: string;
  filter?: string;
  groupByColumn?: string;
  ungroupByColumn?: string;
  hideColumn?: string;
  hideColumns?: string;
  search?: string;
  sortAscending?: string;
  sortDescending?: string;
  toggleDensePadding?: string;
  toggleFilters?: string;
}

export const defaultLocalization: Localization = {
  clear: 'Clear',
  clearSorting: 'Clear sorting',
  columnActions: 'Column actions',
  expand: 'Expand',
  expandAll: 'Expand all',
  filter: 'Filter',
  groupByColumn: 'Group by column',
  ungroupByColumn: 'Ungroup column',
  hideColumn: 'Hide column',
  hideColumns: 'Hide columns',
  search: 'Search',
  sortAscending: 'Sort ascending',
  sortDescending: 'Sort descending',
  toggleDensePadding: 'Toggle dense padding',
  toggleFilters: 'Toggle filters',
};
