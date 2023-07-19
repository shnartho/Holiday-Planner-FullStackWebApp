import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/auth/authSlice';
import {
    CogIcon,
    CreditCardIcon,
    DocumentChartBarIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ShieldCheckIcon,
    XMarkIcon,
    FolderOpenIcon,
    MagnifyingGlassPlusIcon,
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';

const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, current: true },
    { name: 'Scrape', href: '/scrape', icon: MagnifyingGlassPlusIcon, current: false },
    { name: 'Projects', href: '/projects', icon: FolderOpenIcon, current: false },
    { name: 'Balances', href: '/balances', icon: ScaleIcon, current: false },
    { name: 'Cards', href: '/cards', icon: CreditCardIcon, current: false },
    { name: 'Reports', href: '/reports', icon: DocumentChartBarIcon, current: false },
]
const secondaryNavigation = [
    { name: 'Settings', href: '/settings', icon: CogIcon },
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
    { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const router = useRouter();
    const isAuthenticated = useSelector(state=> state.authentication.isAuthenticated)
    console.log('path: ', router.pathname);
    
    const dispatch = useDispatch();
    const logoutHandler = (e) => {
        console.log(`logoutHandler called`)
        e.preventDefault();
        dispatch(logout());
    };

    useEffect(()=>{
        if(!isAuthenticated){
            router.push("/login");
        }
    }, [isAuthenticated, router])

    return (
        <div className="dark:bg-slate-500">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pt-5 pb-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex items-center justify-center">
                                    <h1 className="text-xl">SerupAI</h1>
                                </div>
                                <nav
                                    className="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto"
                                    aria-label="Sidebar"
                                >
                                    <div className="space-y-1 px-2">
                                        {navigation.map((item) => (
                                            <Link href={item.href} key={item.name}>
                                                <a
                                                    className={classNames(
                                                        item.href == router.pathname
                                                            ? 'bg-cyan-800 text-white dark:bg-slate-800'
                                                            : 'text-cyan-100 hover:text-white hover:bg-cyan-600 dark:hover:bg-slate-800',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" aria-hidden="true" />
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-6 pt-6">
                                        <div className="space-y-1 px-2">
                                            {secondaryNavigation.map((item) => (
                                                <Link href={item.href} key={item.name}>
                                                    <a
                                                        className={classNames(
                                                            item.href == router.pathname
                                                                ? 'bg-cyan-800 text-white dark:bg-slate-800'
                                                                : 'text-cyan-100 hover:text-white hover:bg-cyan-600 dark:hover:bg-slate-800',
                                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                        )}                                                    >
                                                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            ))}
                                            <Link href="/login">
                                                <a
                                                    onClick={logoutHandler}
                                                    className={classNames(
                                                        'text-cyan-100 hover:text-white hover:bg-cyan-600 dark:bg-slate-800',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                >
                                                    <CogIcon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                                                    Logout
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pt-5 pb-4 dark:bg-slate-700">
                    <div className="flex items-center justify-center">
                        <h1 className="text-2xl">SerupAI</h1>
                    </div>
                    <nav className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                        <div className="space-y-1 px-2">
                            {navigation.map((item) => (
                                <Link href={item.href} key={item.name}>
                                    <a
                                        className={classNames(
                                            item.href == router.pathname
                                                ? 'bg-cyan-800 text-white dark:bg-slate-800'
                                                : 'text-cyan-100 hover:text-white hover:bg-cyan-600 dark:hover:bg-slate-800',
                                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" aria-hidden="true" />
                                        {item.name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6 pt-6">
                            <div className="space-y-1 px-2">
                                {secondaryNavigation.map((item) => (
                                    <Link href={item.href} key={item.name}>
                                        <a
                                            className={classNames(
                                                item.href == router.pathname
                                                    ? 'bg-cyan-800 text-white dark:bg-slate-800'
                                                    : 'text-cyan-100 hover:text-white hover:bg-cyan-600 dark:hover:bg-slate-800',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                        >
                                            <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                                            {item.name}
                                        </a>
                                    </Link>
                                ))}
                                <Link href="/login">
                                    <a
                                        onClick={logoutHandler}
                                        className={classNames(
                                            'text-cyan-100 hover:text-white hover:bg-cyan-800 dark:hover:bg-slate-800',
                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                        )}
                                    >
                                        <CogIcon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                                        Logout
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}