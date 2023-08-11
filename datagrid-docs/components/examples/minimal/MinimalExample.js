import DataGrid from '@ialopezg/datagrid';
import React, { useMemo } from 'react';

import { getMockData } from '../getMockData';

export const BasicExample = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
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
