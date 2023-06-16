import { useState, useEffect } from "react"
import { FetchUserDigs } from "../ApiManager"
import myDigs from "../images/my-digs.png"
import { Record } from "../records/Record"
import { useNavigate } from "react-router-dom"

export const Digs = () => {

  const [records, setRecords] = useState([])

  const crateUser = localStorage.getItem("crate_user")
  const currentUser = JSON.parse(crateUser)

  const fetchRecords = async () => {
    const records = await FetchUserDigs(currentUser.id)
    setRecords(records)
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  return (
    <div>

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap pr-2 pt-6">       
            <img className="w-20 h-20 object-cover" src={myDigs} />
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
    </div>
  )
}