import { TableInstance } from 'react-table';
import { useMemo } from 'react';

export interface RowOptions {
  hasExpandableRows: boolean;
  hasExpandedRows: boolean;
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

  const hasExpandedRows = useMemo(
    () => table.rows.some((r) => r.isExpanded),
    [table.rows],
  );

  return { hasExpandableRows, hasExpandedRows };
};
