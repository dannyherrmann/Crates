import { useState, useEffect } from "react"
import {
    FetchAllRecords,
    FetchPagedRecords,
    FetchGenres,
    FetchStyles,
    FetchRecordsByGenre,
    FetchPagedRecordsGenre,
    FetchPagedRecordsByStyle,
    FetchRecordsByStyle
} from "../ApiManager"
import { SearchRecord } from "../records/SearchRecord"
import { useNavigate } from "react-router-dom"
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import ReactPaginate from "react-paginate"

export const AllRecords = () => {
    const [records, setRecords] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [filteredRecords, setFilteredRecords] = useState([])
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [styles, setStyles] = useState([])
    const [selectedStyles, setSelectedStyles] = useState([])
    const [sortOptions, setSortOptions] = useState([
        { name: 'A-Z', value: 'Alphabetical' },
        { name: 'Date Added', value: 'DateAdded' },
        { name: 'Artist Name', value: 'Artist' }
    ])
    const [sortOption, setSortOption] = useState(sortOptions[0])
    let limit = 8

    const crateUser = localStorage.getItem("crate_user")
    const currentUser = JSON.parse(crateUser)

    const navigate = useNavigate();

    const fetchGenres = async () => {
        const genres = await FetchGenres()
        setGenres(genres)
    }

    const fetchStyles = async () => {
        const styles = await FetchStyles()
        setStyles(styles)
    }

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1
        const records = await FetchPagedRecords(currentPage, limit, sortOption.value)
        setFilteredRecords(records)
    }

    const handleFilterChange = (filterName, selectedState, setSelectedState) => {
        if (selectedState.includes(filterName)) {
            setSelectedState(selectedState.filter(name => name != filterName))
        } else {
            setSelectedState([...selectedState, filterName])
        }
    }

    const fetchPageOne = async () => {
        const pageOne = await FetchPagedRecords(1, limit, sortOption.value)
        setFilteredRecords(pageOne)
    }

    const fetchPageOneGenres = async () => {
        const pageOne = await FetchPagedRecordsGenre(1, limit, sortOption.value, selectedGenres)
        setFilteredRecords(pageOne)
    }

    const fetchPageOneStyles = async () => {
        const pageOne = await FetchPagedRecordsByStyle(1, limit, sortOption.value, selectedStyles)
        setFilteredRecords(pageOne)
    }
    
   useEffect(() => {
    const getRecords = async () => {
        const allRecords = await FetchAllRecords()
        const totalRecordCount = allRecords.length
        setPageCount(Math.ceil(totalRecordCount / limit))
        fetchPageOne()
    }
    getRecords()
    fetchGenres()
    fetchStyles()
   }, [sortOption])

   useEffect(() => {
    const getGenreRecords = async () => {
        const allRecords = await FetchRecordsByGenre(selectedGenres)
        const totalRecordCount = allRecords.length
        setPageCount(Math.ceil(totalRecordCount / limit))
        fetchPageOneGenres()
        setFilteredRecords(allRecords)
    }
    getGenreRecords()
   }, [selectedGenres])

   useEffect(() => {
    const getStyleRecords = async () => {
        const allRecords = await FetchRecordsByStyle(selectedStyles)
        const totalRecordCount = allRecords.length
        setPageCount(Math.ceil(totalRecordCount / limit))
        fetchPageOneStyles()
        setFilteredRecords(allRecords)
    }
    getStyleRecords()
   }, [selectedStyles])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (
        <div className="">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>

                                        {genres.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {genres.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Search Results</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                            onClick={() => {
                                                                setSortOption(option)
                                                            }}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                {/* GENRES */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">Genres</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                    {genres.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`filter-${option.id}-${optionIdx}`}
                                                                name={`${option.id}[]`}
                                                                defaultValue={option.value}
                                                                type="checkbox"
                                                                defaultChecked={option.checked}
                                                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-indigo-500"
                                                                onClick={() => {
                                                                    handleFilterChange(option.name, selectedGenres, setSelectedGenres)
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={`filter-${option.id}-${optionIdx}`}
                                                                className="ml-3 text-sm text-black"
                                                            >
                                                                {option.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                {/* STYLES */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">Styles</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                    {styles.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`filter-${option.id}-${optionIdx}`}
                                                                name={`${option.id}[]`}
                                                                defaultValue={option.value}
                                                                type="checkbox"
                                                                defaultChecked={option.checked}
                                                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-indigo-500"
                                                                onClick={() => {
                                                                    handleFilterChange(option.name, selectedStyles, setSelectedStyles)
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={`filter-${option.id}-${optionIdx}`}
                                                                className="ml-3 text-sm text-black"
                                                            >
                                                                {option.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">

                                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                        {filteredRecords.map((record) => {
                                            return (
                                                <SearchRecord
                                                    record={record}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                                {/* PAGINATION */}
                                <ReactPaginate
                                    previousLabel={"previous"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination justify-content-center"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    breakClassName={"page-item"}
                                    breakLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}