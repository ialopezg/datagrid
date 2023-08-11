import DataGrid from '@ialopezg/datagrid';
import React, { FC, useMemo } from 'react';

import { getMockData } from '../getMockData';

export const BasicExample: FC = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName' as const,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName' as const,
      },
      {
        Header: 'Address',
        accessor: 'address' as const,
      },
      {
        Header: 'State',
        accessor: 'state' as const,
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber' as const,
      },
    ],
    [],
  );
  const data = useMemo(() => getMockData(), []);

  return (
    <DataGrid
      columns={columns}
      data={data}
      disableColumnActions
      disableSortBy
      hideToolbarBottom
      hideToolbarTop
      manualPagination
    />
  );
};

export default BasicExample;
