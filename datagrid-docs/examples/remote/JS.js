import { useEffect, useMemo, useState } from 'react';

import DataGrid from '../../../src';

export const Example = () => {
  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      { Header: 'Id', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'City', accessor: 'city' },
      { Header: 'Zip Code', accessor: 'zipcode' },
    ],
    [],
  );

  const data = useMemo(
    () =>
      remoteData.map((user) => ({
        name: user.name,
        username: user.username,
        email: user.email,
        address: user.address.street,
        city: user.address.city,
        zipcode: user.address.zipcode,
      })) ?? [],
    [remoteData],
  );

  return <DataGrid columns={columns} data={data} isLoading={isLoading} />;
};

export default Example;
