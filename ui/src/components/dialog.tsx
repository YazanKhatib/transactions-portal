import * as React from "react";
import axios from "axios";
import Select from "react-select";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { DialogComponentProps } from "./types";

export const DialogComponent: React.FC<DialogComponentProps> = ({
  state,
  setState,
  options,
  setTransactions,
}) => {
  const cancelButtonRef = useRef(null);
  const [coin, setCoin] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [address, setAddress] = React.useState("");

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const { data } = await axios.post(
        "http://localhost:3000/transactions",
        {
          type: "send",
          coin,
          amount,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setTransactions((previous) => [...previous, data]);
      setState(false);
      toast.success("Transaction was sent successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setState}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <form
                onSubmit={handleSubmit}
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <BanknotesIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="mb-3 mt-2 text-left text-xl font-medium leading-6 text-gray-900"
                      >
                        Send a transaction
                      </Dialog.Title>

                      <div className="mb-3">
                        <label
                          htmlFor="coin"
                          className="flex justify-start text-sm font-medium leading-6 text-gray-900"
                        >
                          Coin
                        </label>

                        <Select
                          required
                          name="coin"
                          options={options}
                          onChange={(e) => setCoin(e!.label)}
                          placeholder="bitcoin"
                          className="rounded-md py-1.5 text-left text-gray-900 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="amount"
                          className="flex justify-start pb-1 text-sm font-medium leading-6 text-gray-900"
                        >
                          Amount
                        </label>
                        <input
                          type="number"
                          inputMode="numeric"
                          required
                          min="1"
                          name="amount"
                          className="w-full rounded-md border-0 py-2 pl-3 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          placeholder="0.00"
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="flex justify-start pb-1 text-sm font-medium leading-6 text-gray-900"
                        >
                          Address
                        </label>
                        <input
                          required
                          type="text"
                          name="address"
                          className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          placeholder="Wallet address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to send this transaction. This
                          action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary sm:ml-3 sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setState(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
