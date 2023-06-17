import {
    FetchTracksByUser,
    AddCrateTrack,
    AddUserCrate
} from '../ApiManager'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CrateForm = () => {

    const [userTracks, setUserTracks] = useState([])
    const [selectedTracks, setSelectedTracks] = useState([
        
    ])
    const [crate, setCrate] = useState({
        name: ""
    })

    const crateUser = localStorage.getItem("crate_user")
    const currentUser = JSON.parse(crateUser)

    const navigate = useNavigate()

    const fetchUserTracks = async () => {
        const userTracks = await FetchTracksByUser(currentUser.id)
        setUserTracks(userTracks)
    }

    const handleCheckboxChange = (track, event) => {
        if (event.target.checked) {
            setSelectedTracks(prevTracks => [...prevTracks, { ...track, crateBpm: track.bpm }])
        } else {
            setSelectedTracks(prevTracks => prevTracks.filter(t => t.id !== track.id))
        }
    }

    const handleBPMChange = (trackId, crateBpm) => {
        setSelectedTracks(prevTracks =>
            prevTracks.map(track =>
                track.id === trackId ? { ...track, crateBpm } : track
            )
        )
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const userCrateObj = {
            name: crate.name,
            userId: currentUser.id,
            dateCrated: new Date()
        }

        const postUserCrate = async () => {
            const newUserCrate = await AddUserCrate(userCrateObj)

            for (const crateTrack of selectedTracks) {

                const crateTrackObj = {
                    crateId: newUserCrate.id,
                    trackId: crateTrack.id,
                    bpm: parseInt(crateTrack.crateBpm)
                }

                AddCrateTrack(crateTrackObj)
            }

            navigate(`/crates/${newUserCrate.id}`)
        }

        postUserCrate()
    }

    useEffect(() => {
        fetchUserTracks()
    }, [])

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-2 bg-white font-Space-Mono pb-5">
            <form>
                <div className='space-y-12'>
                    <div className='border-gray-900/10'>
                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className="sm:col-span-3">
                                <label htmlFor="album-title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Crate Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="album-title"
                                        id="album-title"
                                        onChange={(evt) => {
                                            const copy = { ...crate }
                                            copy.name = evt.target.value
                                            setCrate(copy)
                                        }}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-crate-yellow sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                    Track
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Artist
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    BPM
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Duration
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {userTracks.map((userTrack) => (
                                                <tr key={userTrack.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                        {userTrack.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{userTrack.artistName}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <input
                                                            type="number"
                                                            defaultValue={userTrack.bpm}
                                                            onChange={(event) => handleBPMChange(userTrack.id, event.target.value)}
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{userTrack.duration}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                        <div className="ml-3 flex h-6 items-center">
                                                            <input
                                                                id="offers"
                                                                aria-describedby="offers-description"
                                                                name="offers"
                                                                type="checkbox"
                                                                onClick={(event) => handleCheckboxChange(userTrack, event)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </form>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate("/")}>
                    Cancel
                </button>
                <button
                    type="submit"
                    onClick={(clickEvent) => {
                        handleSaveButtonClick(clickEvent)
                    }}
                    className="rounded-md bg-crate-yellow px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}