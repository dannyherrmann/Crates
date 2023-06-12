import { useState, useEffect } from "react"
import { FetchUserRecords } from "../ApiManager"
import myRecords from "../images/my-records.png"
import { Record } from "./Record"

export const Records = () => {

  const [records, setRecords] = useState([])

  const crateUser = localStorage.getItem("crate_user")
  const currentUser = JSON.parse(crateUser)

  const fetchRecords = async () => {
    const records = await FetchUserRecords(currentUser.id)
    setRecords(records)
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <img className="w-100 h-20 object-cover" src={myRecords}/>
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