import { useState, useEffect } from "react"
import { FetchUserRecords } from "../ApiManager"
import myRecords from "../images/my-records.png"
import { Record } from "./Record"
import { PlusSmallIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import ReactPaginate from "react-paginate"

export const Records = () => {

  const [records, setRecords] = useState([])
  const [pageCount, setPageCount] = useState([])


  const crateUser = localStorage.getItem("crate_user")
  const currentUser = JSON.parse(crateUser)

  const navigate = useNavigate();

  const fetchRecords = async () => {
    const records = await FetchUserRecords(currentUser.id)
    setRecords(records)
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const handlePageClick = async (data) => {
    // let currentPage = data.selected + 1
    // const records = await FetchRecords(currentPage, limit, 0, searchCriterion)
    // setRecords(records)
}

  return (
    <div>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap pr-2 pt-6">

          <img className="w-20 h-20 object-cover" src={myRecords} />

          <a
            onClick={() => navigate('/newAlbum')}
            className="ml-auto flex items-center gap-x-1 rounded-md bg-crate-yellow px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
            New Album
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {records.map((record) => {
            return (
              <Record
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
  )
}