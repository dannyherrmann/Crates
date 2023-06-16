import { useState, useEffect } from "react"
import {
    FetchRecords,
    FetchAllRecordsSearch
} from "../components/ApiManager"
import { SearchRecord } from "../components/records/SearchRecord"
import { useNavigate, useParams } from "react-router-dom"
import ReactPaginate from "react-paginate"

export const SearchResults = () => {
    const { searchCriterion } = useParams()
    const [records, setRecords] = useState([])
    const [pageCount, setPageCount] = useState(0)
    let limit = 8

    const crateUser = localStorage.getItem("crate_user")
    const currentUser = JSON.parse(crateUser)

    const navigate = useNavigate();

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1
        const records = await FetchRecords(currentPage, limit, 0, searchCriterion)
        setRecords(records)
    }

    const fetchPageOne = async () => {
        const pageOne = await FetchRecords(1, limit, 0, searchCriterion)
        setRecords(pageOne)
    }

    useEffect(() => {
        const getSearchedRecords = async () => {
            const allRecordsFromSearch = await FetchAllRecordsSearch(searchCriterion)
            const totalRecordCount = allRecordsFromSearch.length
            setPageCount(Math.ceil(totalRecordCount / limit))
            fetchPageOne()
        }
        getSearchedRecords()
    }, [searchCriterion])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <div className="">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                            {/* Filters */}


                            {/* Product grid */}
                            <div className="lg:col-span-3">

                                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                        {records.map((record) => {
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

                    </section>
                </main>
            </div>
        </div>
    )
}