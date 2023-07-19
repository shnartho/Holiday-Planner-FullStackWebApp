import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/auth/authSlice';
import {
    BellIcon,
} from '@heroicons/react/24/outline'
import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const [profile, setProfile] = useState({})
    const user = useSelector(state => state.authentication.user);

    useEffect(()=>{
        setProfile(user);
    }, [])

    const dispatch = useDispatch();
    const logoutHandler = (e) => {
        console.log(`logoutHandler called`)
        e.preventDefault();
        dispatch(logout());
    };


    return (
        // <div className="flex sticky h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
        <div className="sticky top-0 z-10 flex h-16 w-full flex-shrink-0 border-b border-gray-300 bg-white dark:bg-slate-700 dark:border-slate-900">
            {/* Search bar */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="flex flex-1">

                </div>
                <div className="ml-4 flex items-center md:ml-6">

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                        <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                                <Image
                                    width={35}
                                    height={35}
                                    className="h-8 w-8 rounded-full"
                                    src="/images/dummy-user.jpg"
                                    alt=""
                                />
                                <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                                    <span className="sr-only">Open user menu for </span>{profile?.name}
                                </span>
                                <ChevronDownIcon
                                    className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href=""
                                            onClick={logoutHandler}
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Logout
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    )
}