import { useCallback, useEffect, useState } from 'react';
import server from '../server';

export const DisplayAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  const getAccounts = useCallback(async () => {
    try {
      const response = await server.get('accounts');
      setAccounts(response.data.testAccounts);
    } catch (error) {
      console.log({ 'getAccounts Error: ': error.message });
    }
  });

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className='container'>
      <h1>(***For Quick Viewing Only***) Accounts Available: </h1>
      <ul>
        {Object.entries(accounts).map((account, index) => {
            const [pubKey, privKey] = account;
          return (
            <li key={index}>
              <p>
                Account#: {pubKey}
                </p>
              <p>
                Key#: {privKey}
                </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
