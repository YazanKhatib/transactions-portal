import * as React from 'react';
import axios from 'axios';
import { Grid } from 'yaa-grid';
import { Navbar, DialogComponent, Footer } from '../../components';
import { Transaction } from '../../components/types';

import 'yaa-grid/dist/style.css';

const Home: React.FC = () => {
  const [userData, setUserData] = React.useState({ balances: [] });
  const [state, setState] = React.useState(false);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const user = JSON.parse(localStorage.getItem('user')!);
  React.useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get(`http://localhost:3000/users/${user?.id}`);
      setUserData(data);
    };

    fetchUserData();
  }, []);

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const fetchTransactions = async () => {
      const { data } = await axios.get('http://localhost:3000/transactions', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  const columns = [
    { field: 'id', header: 'ID', width: '350' },
    { field: 'type', header: 'Type', width: '50' },
    { field: 'coin', header: 'Coin', width: '100' },
    { field: 'amount', header: 'Amount', width: '100' },
    { field: 'address', header: 'Address', width: '200' },
  ];

  return (
    <>
      <Navbar username={user?.username} />

      <div className='max-w-7xl px-4 sm:px-6 lg:px-8 bg-secondary mx-auto'>
        <div className='flex-col text-center md:text-left md:flex-row flex justify-between items-center my-20'>
          <h1 className='text-5xl font-bold leading-[4rem] text-white'>
            <span className='text-primary'>Boost </span> Your <br />
            Crypto Portfolio
          </h1>
          <button
            className='mt-8 md:mt-0 bg-primary font-light bg-opacity-20 hover:bg-primary hover:bg-opacity-80 text-white p-3 px-8 rounded-xl'
            onClick={() => setState(!state)}>
            Send a Transaction
          </button>
        </div>

        <h1 className='text-2xl font-medium mb-4 text-white'>My Balance</h1>

        <div className='flex justify-between mb-20 cursor-pointer flex-wrap'>
          {userData?.balances?.map(({ coin, code, amount }) => (
            <div
              key={code}
              className='flex m-2 lg:m-0 justify-between items-center rounded-full bg-primary bg-opacity-20 hover:bg-primary hover:bg-opacity-80 w-40 p-2 text-white'>
              <div className='flex'>
                <img className='mr-2 ' src={`/${code}.svg`} alt='Bitcoin' />
                <div>
                  <p className='font-normal text-lg'>{String(code).toUpperCase()}</p>
                  <p className='text-xs font-light'>{coin}</p>
                </div>
              </div>
              <p>{amount}</p>
            </div>
          ))}
        </div>

        <DialogComponent
          setTransactions={setTransactions}
          state={state}
          setState={setState}
          options={userData?.balances
            ?.filter(({ amount }) => amount > 0) // Filter items based on the condition
            .map(({ coin, amount }) => ({
              // Map over the filtered items
              value: coin,
              label: coin,
              amount: amount,
            }))}
        />

        <h1 className='text-2xl font-medium mb-4 text-white'>My Transactions</h1>

        <Grid
          rtl={false}
          search={false}
          jsonExport={false}
          data={transactions}
          // loading={loading}
          columns={columns}
          pageSize={10}
        />

        <Footer />
      </div>
    </>
  );
};

export default Home;
