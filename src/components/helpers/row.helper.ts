import { TableInstance } from 'react-table';
import { useMemo } from 'react';

export interface RowOptions {
  hasExpandableRows: boolean;
}

interface RowHelperProps<D extends {}> {
  table: TableInstance<D>;
}

export const RowHelper = <D extends {}>({
  table,
}: RowHelperProps<D>): RowOptions => {
  const hasExpandableRows = useMemo(
    () => table.rows.some((r) => r.canExpand),
    [table.rows],
  );

  return { hasExpandableRows };
};
