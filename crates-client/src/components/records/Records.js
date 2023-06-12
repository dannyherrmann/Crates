import { useState, useEffect } from "react"
import { FetchUserRecords } from "../ApiManager"

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
  }, [records])

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">My Records</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {records.map((record) => (
            <div key={record.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={record.album.photo}
                  alt={record.album.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">

                    <span aria-hidden="true" className="absolute inset-0" />
                    {record.album.name}

                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}