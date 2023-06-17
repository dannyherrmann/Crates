import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    FetchAlbum,
    FetchAlbumTracks,
    AddUserAlbum,
    AddUserDig,
    FetchUserRecords,
    FetchUserDigs,
    DeleteUserAlbum,
    DeleteUserDig
}
    from "../ApiManager"

export const RecordDetail = () => {
    const { albumId } = useParams()
    const [record, setRecord] = useState([])
    const [tracks, setTracks] = useState([])
    const [userAlbums, setUserAlbums] = useState([])
    const [userDigs, setUserDigs] = useState([])
    const [userAlbum, setUserAlbum] = useState(null)
    const [userDig, setUserDig] = useState(null)

    const crateUser = localStorage.getItem("crate_user")
    const currentUser = JSON.parse(crateUser)

    const navigate = useNavigate()

    const fetchAlbum = async () => {
        const album = await FetchAlbum(albumId)
        setRecord(album)
    }

    const fetchTracks = async () => {
        const tracks = await FetchAlbumTracks(albumId)
        setTracks(tracks)
    }

    const fetchUserAlbums = async () => {
        const albums = await FetchUserRecords(currentUser.id)
        setUserAlbums(albums)
        findAlbum(albums)
    }

    const findAlbum = (albums) => {
        const foundAlbum = albums.find((userAlbum) => userAlbum.albumId === parseInt(albumId))
        setUserAlbum(foundAlbum)
    }

    const fetchUserDigs = async () => {
        const userDigs = await FetchUserDigs(currentUser.id)
        setUserDigs(userDigs)
        findDig(userDigs)
    }

    const findDig = (digs) => {
        const foundDig = digs.find((userDig) => userDig.albumId === parseInt(albumId))
        setUserDig(foundDig)
    }

    useEffect(() => {
        fetchAlbum()
        fetchTracks()
        fetchUserAlbums()
        fetchUserDigs()
    }, [albumId])

    const inCollection = () => {
        if (userAlbum != undefined) {
            return true
        } else {
            return false
        }
    }

    const inDigList = () => {
        if (userDig != undefined) {
            return true
        } else {
            return false
        }
    }

    const addToCollection = async (e) => {
        e.preventDefault()

        const userAlbumToSendToApi = {
            userId: currentUser.id,
            albumId: albumId,
            dateAdded: new Date()
        }

        await AddUserAlbum(userAlbumToSendToApi)

        if (userDig != undefined) {
            await DeleteUserDig(userDig.id)
        }

        navigate("/myRecords")
    }

    const deleteFromCollection = async (e) => {
        e.preventDefault()
        await DeleteUserAlbum(userAlbum.id)
        navigate("/myRecords")
    }

    const addToDigs = async (e) => {
        e.preventDefault()

        const userDigToSendToApi = {
            userId: currentUser.id,
            albumId: albumId,
            dateAdded: new Date()
        }

        await AddUserDig(userDigToSendToApi)

        navigate("/myDigs")
    }

    const deleteFromDigs = async (e) => {
        e.preventDefault()
        await DeleteUserDig(userDig.id)
        navigate("/myDigs")
    }


    return (
        <div>
            <div className="pt-6 flex flex-col">
                <div className="mr-auto ml-80 mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">


                    <div className="relative aspect-square w-full h-full rounded-md overflow-hidden flex flex-wrap flex-col">
                        <img
                            src={record.photo}
                            alt={record.name}
                            className="h-96 w-96 object-cover object-center lg:h-96 lg:w-96"
                        />

                    </div>



                    <div className="hidden overflow-hidden rounded-lg lg:block">
                        <div className="lg:col-span-2 lg:border-gray-200 lg:pr-8 items-start flex flex-col gap-y-1">
                            <h1 className="text-2xl font-bold tracking-tight text-crate-yellow bg-black font-Space-Mono sm:text-3xl">
                                {record.name}</h1>
                            <h4 className="bg-white font-bold">by {record.artist?.name}</h4>
                        </div>

                        <div className="flex">
                            <div className="mt-7 p-3 bg-black font-Space-Mono text-crate-yellow">
                                <ul role="list" className="list-none space-y-2 text-sm">
                                    <li key="catalogNumber">
                                        <span><b>Catalog Number:</b> {record.catalogNumber}</span>
                                    </li>
                                    <li key='label'>
                                        <span><b>Label:</b> {record.label?.name}</span>
                                    </li>
                                    <li key='size'>
                                        <span><b>Size:</b> {record.size?.name}</span>
                                    </li>
                                    <li key='country'>
                                        <span><b>Country:</b> {record.country?.name}</span>
                                    </li>
                                    <li key='year'>
                                        <span><b>Released:</b> {record.year}</span>
                                    </li>
                                    <li key='genre'>
                                        <span><b>Genre:</b> {record.genres}</span>
                                    </li>
                                    <li key='style'>
                                        <span><b>Style:</b> {record.styles}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-5">
                            {/* <button
                                type="button"
                                className="mr-1 rounded-md bg-crate-yellow px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                edit album
                            </button> */}
                            {
                                inCollection() ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={(e) => deleteFromCollection(e)}
                                            className="rounded-md bg-red-400 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            remove from collection
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={(e) => addToCollection(e)}
                                            className="rounded-md bg-crate-yellow px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            add to collection
                                        </button>
                                    </>
                                )
                            }
                            {
                                inDigList() ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={(e) => deleteFromDigs(e)}
                                            className="ml-1 rounded-md bg-red-400 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            remove from digs
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={(e) => addToDigs(e)}
                                            className="ml-1 rounded-md bg-crate-yellow px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            add to digs
                                        </button>
                                    </>
                                )
                            }
                        </div>

                    </div>
                </div>

                <div className="mr-auto ml-80 mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8 bg-black font-Space-Mono text-crate-yellow">

                    <header className="text-2xl font-bold">tracklist</header>
                    <div>
                        <table>
                            <tbody>
                                {tracks.map((track) => {
                                    return (
                                        <tr>
                                            <td>{track.position}&emsp;&emsp;</td>
                                            <td>{track.name}&emsp;&emsp;</td>
                                            <td>{track.duration}&emsp;&emsp;</td>
                                            <td>{track.key}&emsp;&emsp;</td>
                                            <td>{track.bpm}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>


            </div>



        </div>
    )
}