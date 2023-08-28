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
      })) ?? [],
    [remoteData],
  );

  return <DataGrid columns={columns} data={data} isLoading={isLoading} />;
};

export default Example;
