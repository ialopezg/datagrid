import DataGrid from '@ialopezg/datagrid';
import React, { FC, useMemo } from 'react';

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Props {
  data: {
    name: string;
    username: string;
    email: string;
    address: string;
    city: string;
    zipcode: string;
  }[];
}

const Example: FC<Props> = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name' as const,
      },
      {
        Header: 'Username',
        accessor: 'username' as const,
      },
      {
        Header: 'Email',
        accessor: 'email' as const,
      },
      {
        Header: 'Address',
        accessor: 'address' as const,
      },
      {
        Header: 'City',
        accessor: 'city' as const,
      },
      {
        Header: 'Zip Code',
        accessor: 'zipcode' as const,
      },
    ],
    [],
  );

  // @ts-ignore
  return <DataGrid columns={columns} data={data} />;
};

export async function getServerSideProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const json: UserData[] = await response.json();

  const data =
    json.map((userData: UserData) => ({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      address: userData.address.street,
      city: userData.address.city,
      zipcode: userData.address.zipcode,
    })) ?? [];

  return { props: { data } };
}

export default Example;
