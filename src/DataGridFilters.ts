import { matchSorter } from 'match-sorter';

import { DataGridRow } from './DataGrid';

export const fuzzy = (
  rows: DataGridRow[],
  ids: string[] | string,
  value: string | number,
) =>
  matchSorter(rows, value.toString().trim(), {
    keys: Array.isArray(ids)
      ? ids.map((id) => `values.${id}`)
      : [`values.${ids}`],
    sorter: (rankedItems) => rankedItems,
  });
fuzzy.autoRemove = (val: any) => !val;

export const contains = (
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
contains.autoRemove = (value: any) => !value;

export const startsWidth = (
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
startsWidth.autoRemove = (value: any) => !value;

export const endsWidth = (
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
endsWidth.autoRemove = (value: any) => !value;

export const equals = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) =>
  rows.filter(
    (row) =>
      row.values[id].toString().toLowerCase().trim() ===
      value.toString().toLowerCase().trim(),
  );
equals.autoRemove = (value: any) => !value;

export const notEquals = (
  rows: DataGridRow[],
  id: string,
  value: string | number,
) =>
  rows
    .filter((row) => row.values[id])
    .toString()
    .toLowerCase()
    .trim() !== value.toString().toLowerCase().trim();
notEquals.autoRemove = (value: any) => !value;

export const empty = (
  rows: DataGridRow[],
  id: string,
  _value: string | number,
) => rows.filter((row) => !row.values[id].toString().toLowerCase().trim);
empty.autoRemove = (value: any) => !value;

export const greaterThan = (
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
greaterThan.autoRemove = (value: any) => !value;

export const lessThan = (
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
lessThan.autoRemove = (value: any) => !value;

export const notEmpty = (
  rows: DataGridRow[],
  id: string,
  _value: string | number,
) => rows.filter((row) => !!row.values[id].toString().toLowerCase().trim);
notEmpty.autoRemove = (value: any) => !value;

export const defaultFilters = {
  contains,
  empty,
  endsWidth,
  equals,
  fuzzy,
  greaterThan,
  lessThan,
  notEmpty,
  notEquals,
  startsWidth,
};
