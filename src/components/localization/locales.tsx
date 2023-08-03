export interface Localization {
  clear?: string;
  columnActions?: string;
  expand?: string;
  expandAll?: string;
  filter?: string;
  hideColumn?: string;
  hideColumns?: string;
  search?: string;
}

export const defaultLocalization: Localization = {
  clear: 'Clear',
  columnActions: 'Column actions',
  expand: 'Expand',
  expandAll: 'Expand all',
  filter: 'Filter',
  hideColumn: 'Hide column',
  hideColumns: 'Hide columns',
  search: 'Search',
};
