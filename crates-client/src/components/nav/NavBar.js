import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import cratesFont from '../images/crates-font.png'
import { logout } from "../helpers/logout"
import { Route, useNavigate } from 'react-router-dom'
import { FetchUserByFirebaseId } from '../ApiManager'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {

    const crateUser = localStorage.getItem("crate_user");
    const crateUserObject = JSON.parse(crateUser);

    const [avatar, setAvatar] = useState({})
    const [searchTerms, setSearchTerms] = useState("")
    const [searchDropdown, setSearchDropdown] = useState(false)

    const navigate = useNavigate();

    const submitSearch = () => {
        if (searchTerms) {
            navigate(`records/search/${searchTerms}`)
        }
    }

    useEffect(() => {
        if (searchTerms) {
            setSearchDropdown(true)
        } else {
            setSearchDropdown(false)
        }
    }, [searchTerms])

    document.body.addEventListener("click", () => {
        if (document.activeElement.id !== "search" || !searchTerms) {
            setSearchDropdown(false)
        } else {
            setSearchDropdown(true)
        }
    })

    const fetchUser = async () => {
        const user = await FetchUserByFirebaseId(crateUserObject.uid)
        setAvatar(user)
    }

    useEffect(() => {
        fetchUser()
    }, [])



    const user = {
        name: 'Chelsea Hagon',
        email: 'chelsea.hagon@example.com',
        imageUrl:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
    const navigation = [
        { name: 'Dashboard', href: '#', current: true },
        { name: 'Calendar', href: '#', current: false },
        { name: 'Teams', href: '#', current: false },
        { name: 'Directory', href: '#', current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className={({ open }) =>
                    classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-black shadow-sm lg:static lg:overflow-y-visible'
                    )
                }
            >
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link to="/">
                                            <img
                                                className="hidden h-10 w-auto lg:block"
                                                src={cratesFont}
                                                alt="Your Company"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                                    <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                                        <div className="w-full">
                                            <label htmlFor="search" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <input
                                                    id="search"
                                                    name="search"
                                                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-crate-yellow sm:text-sm sm:leading-6"
                                                    placeholder="search for artist, albums ..."
                                                    type="search"
                                                    onChange={(evt) => setSearchTerms(evt.target.value)}
                                                    onKeyDown={(evt) => {
                                                        if (evt.key === "Enter") {
                                                            evt.preventDefault()
                                                            submitSearch()
                                                            setSearchDropdown(false)
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {
                                                !searchDropdown
                                                    ? ""
                                                    : <div className='absolute z-50 w-full sm:max-w-2xl bg-white'>
                                                        <div className="pl-10 text-sm font-light italic text-gray-600 border-b border-gray-200">searching "{searchTerms}" in records</div>
                                                        <div
                                                            onClick={() => {
                                                                submitSearch()
                                                                setSearchDropdown(false)
                                                                
                                                            }}
                                                            className="pl-10 font-semibold text-lg text-gray-900 hover:bg-gray-300 hover:cursor-pointer"
                                                        >
                                                            <span>Search "{searchTerms}" in </span>
                                                            <span className="px-1.5 bg-gray-200 text-gray-800 rounded">Crates</span>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                                    {/* Mobile menu button */}
                                    <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Popover.Button>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">


                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-5 flex-shrink-0">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-white focus:outline-none">
                                                <span className="sr-only">Open user menu</span>
                                                {
                                                    avatar.photo ? (
                                                        <>
                                                            <img className="hidden h-10 w-auto lg:block" src={avatar.photo} alt="" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="h-7 w-7 object-cover rounded-full bg-gray-100">
                                                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                </svg>
                                                            </span>
                                                        </>
                                                    )
                                                }

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
                                                <Menu.Item key="sign-out">
                                                    {({ active }) => (
                                                        <a
                                                            onClick={() => logout.logout(navigate)}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Sign Out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                            <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                                            'block rounded-md py-2 px-3 text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pb-3 pt-4">
                                <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user.name}</div>
                                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">

                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </>
    )
}
