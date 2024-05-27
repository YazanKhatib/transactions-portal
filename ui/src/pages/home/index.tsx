import * as React from "react";
import axios from "axios";
import { Grid } from "yaa-grid";
import { Navbar, DialogComponent, Footer } from "../../components";
import { Transaction } from "../../components/types";

import "yaa-grid/dist/style.css";

const Home: React.FC = () => {
  const [userData, setUserData] = React.useState({ balances: [] });
  const [state, setState] = React.useState(false);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const user = JSON.parse(localStorage.getItem("user")!);
  React.useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/users/${user?.id}`,
      );
      setUserData(data);
    };

    fetchUserData();
  }, []);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchTransactions = async () => {
      const { data } = await axios.get("http://localhost:3000/transactions", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  const columns = [
    { field: "id", header: "ID", width: "350" },
    { field: "type", header: "Type", width: "50" },
    { field: "coin", header: "Coin", width: "100" },
    { field: "amount", header: "Amount", width: "100" },
    { field: "address", header: "Address", width: "200" },
    { field: "createdAt", header: "CreatedAt", width: "200" },
  ];

  return (
    <>
      <Navbar username={user?.username} />

      <div className="mx-auto min-h-[80vh] max-w-7xl bg-secondary px-4 sm:px-6 lg:px-8">
        <div className="my-20 flex flex-col items-center justify-between text-center md:flex-row md:text-left">
          <h1 className="text-5xl font-bold leading-[4rem] text-white">
            <span className="text-primary">Boost </span> Your <br />
            Crypto Portfolio
          </h1>
          <button
            className="mt-8 rounded-xl bg-primary bg-opacity-20 p-3 px-8 font-light text-white hover:bg-primary hover:bg-opacity-80 md:mt-0"
            onClick={() => setState(!state)}
          >
            Send a Transaction
          </button>
        </div>

        <h1 className="mb-4 text-2xl font-medium text-white">My Balance</h1>

        <div className="mb-20 flex cursor-pointer flex-wrap justify-between">
          {userData?.balances?.map(({ coin, code, amount }) => (
            <div
              key={code}
              className="m-2 flex w-40 items-center justify-between rounded-full bg-primary bg-opacity-20 p-2 text-white hover:bg-primary hover:bg-opacity-80 lg:m-0"
            >
              <div className="flex">
                <img className="mr-2 " src={`/${code}.svg`} alt="Bitcoin" />
                <div>
                  <p className="text-lg font-normal">
                    {String(code).toUpperCase()}
                  </p>
                  <p className="text-xs font-light">{coin}</p>
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

        <h1 className="mb-4 text-2xl font-medium text-white">
          My Transactions
        </h1>

        <Grid
          rtl={false}
          search={false}
          jsonExport={false}
          data={transactions}
          // loading={loading}
          columns={columns}
          pageSize={10}
        />
      </div>

      <Footer />
    </>
  );
};

export default Home;
