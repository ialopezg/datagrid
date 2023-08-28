import { useEffect, useMemo, useState } from 'react';
import DataGrid from '../../../src/components/DataGrid';

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

export const Example = () => {
  const [remoteData, setRemoteData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const json = await response.json();
      setRemoteData(json);
      setIsLoading(false);
    };
    void fetchData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: 'Id', accessor: 'id' as const },
      { Header: 'Name', accessor: 'name' as const },
      { Header: 'Username', accessor: 'username' as const },
      { Header: 'Email', accessor: 'email' as const },
      { Header: 'Address', accessor: 'address' as const },
      { Header: 'City', accessor: 'city' as const },
      { Header: 'Zip Code', accessor: 'zipcode' as const },
    ],
    [],
  );

  const data = useMemo(
    () =>
      remoteData.map((rd) => ({
        id: rd.id,
        name: rd.name,
        username: rd.username,
        email: rd.email,
        address: rd.address.street,
        city: rd.address.city,
        zipcode: rd.address.zipcode,
      })) ?? [],
    [remoteData],
  );

  // @ts-ignore
  return <DataGrid columns={columns} data={data} isLoading={isLoading} />;
};

export default Example;
