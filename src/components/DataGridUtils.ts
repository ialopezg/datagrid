import { DataGridColumnInterface } from './DataGrid';

export const findLowestLevelCols = (columns: DataGridColumnInterface[]) => {
  let lowestLevelColumns: DataGridColumnInterface[] = columns;
  let currentCols: DataGridColumnInterface[] | undefined = columns;
  while (!!currentCols?.length && currentCols.some((col) => col.columns)) {
    const nextCols: DataGridColumnInterface[] = currentCols
      .filter((col) => !!col.columns)
      .map((col) => col.columns)
      .flat() as DataGridColumnInterface[];
    if (nextCols.every((col) => !col?.columns)) {
      lowestLevelColumns = [...lowestLevelColumns, ...nextCols];
    }
    currentCols = nextCols;
  }

  return lowestLevelColumns.filter((col) => !col.columns);
};
