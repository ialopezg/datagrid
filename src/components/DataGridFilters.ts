import { matchSorter } from 'match-sorter';

import { DataGridRow } from './DataGrid';

export const fuzzySearch = (
  rows: DataGridRow[],
  ids: string[],
  value: string | number,
) =>
  matchSorter(rows, value.toString().trim(), {
    keys: ids.map((id) => `values.${id}`),
    sorter: (rankedItems) => rankedItems,
  });
fuzzySearch.autoRemove = (val: any) => !val;

export const fuzzyFilter = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) =>
  matchSorter(rows, value.toString().trim(), {
    keys: [`values.${id}`],
    sorter: (rankedItems) => rankedItems,
  });
fuzzyFilter.autoRemove = (value: any) => !value;

export const containsFilter = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) => {
  return rows
    .filter((row) => row.values[id])
    .toString()
    .toLowerCase()
    .trim()
    .includes(value.toString().toLowerCase().trim());
};
containsFilter.autoRemove = (value: any) => !value;

export const startsWidthFilter = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) =>
  rows
    .filter((row) => row.values[id])
    .toString()
    .toLowerCase()
    .trim()
    .startsWith(value.toString().toLowerCase().trim());
startsWidthFilter.autoRemove = (value: any) => !value;

export const endsWidthFilter = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) =>
  rows
    .filter((row) => row.values[id])
    .toString()
    .toLowerCase()
    .trim()
    .endsWith(value.toString().toLowerCase().trim());
endsWidthFilter.autoRemove = (value: any) => !value;

export const equalsFilter = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) =>
  rows.filter(
    (row) =>
      row.values[id].toString().toLowerCase().trim() ===
      value.toString().toLowerCase().trim(),
  );
equalsFilter.autoRemove = (value: any) => !value;

export const notEqualsFilter = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) =>
  rows
    .filter((row) => row.values[id])
    .toString()
    .toLowerCase()
    .trim() !== value.toString().toLowerCase().trim();
notEqualsFilter.autoRemove = (value: any) => !value;

export const emptyFilter = (
  rows: DataGridRow[],
  id: string,
  _value: string | number,
) => rows.filter((row) => !row.values[id].toString().toLowerCase().trim);
emptyFilter.autoRemove = (value: any) => !value;

export const greaterThanFilter = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) =>
  rows.filter((row) =>
    !isNaN(+value) && !isNaN(+row.values[id])
      ? +row.values[id] > +value
      : row.values[id].toString().toLowerCase().trim() >
        value.toString().toLowerCase().trim(),
  );
greaterThanFilter.autoRemove = (value: any) => !value;

export const lessThanFilter = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) =>
  rows.filter((row) =>
    !isNaN(+value) && !isNaN(+row.values[id])
      ? +row.values[id] < +value
      : row.values[id].toString().toLowerCase().trim() <
        value.toString().toLowerCase().trim(),
  );
lessThanFilter.autoRemove = (value: any) => !value;

export const notEmptyFilter = (
  rows: DataGridRow[],
  id: string,
  _value: string | number,
) => rows.filter((row) => !!row.values[id].toString().toLowerCase().trim);
notEmptyFilter.autoRemove = (value: any) => !value;

export const defaultFilters = {
  contains: containsFilter,
  empty: emptyFilter,
  endsWith: endsWidthFilter,
  equals: equalsFilter,
  fuzzy: fuzzyFilter,
  globalFuzzy: fuzzySearch,
  greaterThan: greaterThanFilter,
  lessThan: lessThanFilter,
  notEmpty: notEmptyFilter,
  notEquals: notEqualsFilter,
  startsWidth: startsWidthFilter,
};
