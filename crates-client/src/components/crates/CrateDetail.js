import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { 
    FetchCrateTracks,
    FetchUserCrateById, 
    DeleteCrateTrack, 
    DeleteUserCrate } 
from "../ApiManager"
import crate from "../images/crate.png"
import { PlusSmallIcon, MinusIcon } from '@heroicons/react/20/solid'

export const CrateDetail = () => {
    const { crateId } = useParams()
    const [crateTracks, setCrateTracks] = useState([])
    const [userCrate, setUserCrate] = useState([])

    const navigate = useNavigate()

    const crateUser = localStorage.getItem("crate_user")
    const currentUser = JSON.parse(crateUser)

    const fetchCrateTracks = async () => {
        const crateTracks = await FetchCrateTracks(crateId)
        setCrateTracks(crateTracks)
    }

    const fetchUserCrate = async () => {
        const userCrate = await FetchUserCrateById(crateId)
        setUserCrate(userCrate)
    }

    useEffect(() => {
        fetchUserCrate()
        fetchCrateTracks()
    }, [crateId])

    const deleteUserCrate = async (e) => {
        e.preventDefault()
        await DeleteCrateTrack(crateId)
        await DeleteUserCrate(crateId)
        navigate("/myCrates")
    }

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap pr-2 pt-6">

                <img className="w-20 h-20 object-cover" src={crate} />


                    <h3 className="text-lg text-crate-yellow font-bold font-Space-Mono bg-black">
                        {userCrate.name}
                    </h3>

                <a
                    onClick={(e) => deleteUserCrate(e)}
                    className="ml-auto flex items-center gap-x-1 rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <MinusIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                    Delete
                </a>
            </div>

            <div className="mr-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:px-8 bg-black font-Space-Mono text-crate-yellow">
                <div>
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">
                                    Position
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold ">
                                    Title
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold ">
                                    Duration
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold ">
                                    Key
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold ">
                                    Track BPM
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold ">
                                    My BPM
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {crateTracks.map((crateTrack) => (
                                <tr key={crateTrack.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
                                        {crateTrack.track.position}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm ">{crateTrack.track.name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm ">{crateTrack.track.duration}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm ">{crateTrack.track.key}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm ">{crateTrack.track.bpm}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm ">{crateTrack.bpm}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}