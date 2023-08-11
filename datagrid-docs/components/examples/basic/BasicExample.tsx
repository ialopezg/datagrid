import React, { FC, useMemo } from 'react';
import DataGrid from '@ialopezg/datagrid';

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

  const data = useMemo(
    () => [
      {
        firstName: 'Dylan',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        state: 'Kentucky',
        phoneNumber: '(283) 448-8406 x3430',
      },
      {
        firstName: 'Raquel',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        state: 'Ohio',
        phoneNumber: '237.441.8991 x5595',
      },
      {
        firstName: 'Ervin',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        state: 'West Virginia',
        phoneNumber: '672-649-3434',
      },
      {
        firstName: 'Brittany',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        state: 'Nebraska',
        phoneNumber: '1-832-387-9361 x40362',
      },
      {
        firstName: 'Branson',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        state: 'South Carolina',
        phoneNumber: '268.525.1996',
      },
    ],
    [],
  );
  return <DataGrid columns={columns} data={data} />;
};

export default BasicExample;
