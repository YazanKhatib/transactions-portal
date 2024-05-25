import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { logout } from '../utils';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '../RoutePath';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar: React.FC<{ username: string }> = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(RoutePaths.Login);
  };

  return (
    <Disclosure as='nav' className='bg-secondary'>
      <>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='flex flex-1 items-center'>
              <div className='flex flex-shrink-0 items-center'>
                <img
                  className='bg-primary mx-auto h-12 w-auto'
                  src='/darklogo.jpeg'
                  alt='M2 logo'
                />
              </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
              {/* Profile dropdown */}
              <Menu as='div' className='relative ml-3'>
                <div>
                  <Menu.Button className='relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none'>
                    <span className='absolute -inset-1.5' />
                    <p className='text-white text-md p-2'>Hi {username}!</p>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={handleLogout}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                          )}>
                          Sign out
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
};
