import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FetchCrateTracks, FetchUserCrateById } from "../ApiManager"
import crate from "../images/crate.png"

export const CrateDetail = () => {
    const { crateId } = useParams()
    const [crateTracks, setCrateTracks] = useState([])
    const [userCrate, setUserCrate] = useState([])

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
    }, [])

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className=" group relative">
                <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap pr-2 pt-6">
                    <img className="w-20 h-20 object-cover" src={crate} />
                </div>
                <div className="flex flex-row w-full pt-4 gap-y-1">
                    <h3 className="text-lg text-crate-yellow font-bold font-Space-Mono bg-black">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {userCrate.name}
                    </h3>
                </div>
            </div>

            <div className="mr-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:px-8 bg-black font-Space-Mono text-crate-yellow">
                <div>
                    <table>
                        <tbody>
                            {crateTracks.map((crateTrack) => {
                                return (
                                    <tr>
                                        <td>{crateTrack.track.position}&emsp;&emsp;</td>
                                        <td>{crateTrack.track.name}&emsp;&emsp;</td>
                                        <td>{crateTrack.track.duration}&emsp;&emsp;</td>
                                        <td>{crateTrack.track.key}&emsp;&emsp;</td>
                                        <td>{crateTrack.bpm}&emsp;&emsp;</td>
                                        <td>{crateTrack.track.bpm}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}