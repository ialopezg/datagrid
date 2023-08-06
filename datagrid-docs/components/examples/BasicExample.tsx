import { DataGrid } from 'datagrid';
import React, { useMemo } from 'react';
import faker from '@faker-js/faker';

export const BasicExample = () => {
  const columns = useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Phone Number', accessor: 'phoneNumber' },
    ],
    [],
  );
  const data = useMemo(
    () =>
      [...Array(100)].map((_) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetAddress(),
        state: faker.address.state(),
        phoneNumber: faker.phone.phoneNumber(),
      })),
    [],
  );

  return <DataGrid columns={columns} data={data} />;
};

export default BasicExample;
