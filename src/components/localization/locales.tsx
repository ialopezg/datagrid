export interface Localization {
  clear?: string;
  expand?: string;
  expandAll?: string;
  filter?: string;
  hideColumns?: string;
  search?: string;
}

export const defaultLocalization: Localization = {
  clear: 'Clear',
  expand: 'Expand',
  expandAll: 'Expand all',
  filter: 'Filter',
  hideColumns: 'Hide columns',
  search: 'Search',
};
