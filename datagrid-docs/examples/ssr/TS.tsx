import { FC, useMemo } from 'react';

import DataGrid from '../../../src';

interface User {
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

interface ExampleProps {
  data: {
    name: string;
    username: string;
    email: string;
    address: string;
    city: string;
    zipcode: string;
  }[];
}

export const Example: FC<ExampleProps> = ({ data }) => {
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
  const json: User[] = await response.json();

  const data =
    json.map((user: User) => ({
      name: user.name,
      username: user.username,
      email: user.email,
      address: user.address.street,
      city: user.address.city,
      zipcode: user.address.zipcode,
    })) ?? [];

  return { props: { data } };
}

export default Example;
