import { TableInstance } from 'react-table';
import { useMemo } from 'react';

export interface RowOptions {
  hasExpandableRows: boolean;
  maxColumnDepth: number;
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

  const maxColumnDepth = useMemo(() => {
    let maxDepth = 1;

    table.columns.forEach((c) => {
      if (c.columns?.length) {
        maxDepth = Math.max(maxDepth, c.columns.length);
      }
    });

    return maxDepth - 1;
  }, [table.columns]);

  return { hasExpandableRows, maxColumnDepth };
};
