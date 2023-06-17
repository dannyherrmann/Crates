import myCrates from "../images/my-crates.png"
import { PlusSmallIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router-dom"
import { FetchUserCrates } from "../ApiManager"
import { useEffect, useState } from "react"
import { Crate } from "./Crate"

export const Crates = () => {

    const [userCrates, setUserCrates] = useState([])

    const crateUser = localStorage.getItem("crate_user")
    const currentUser = JSON.parse(crateUser)

    const fetchCrates = async () => {
        const crates = await FetchUserCrates(currentUser.id)
        setUserCrates(crates)
    }

    useEffect(() => {
        fetchCrates()
    }, [])

    const navigate = useNavigate()

    return (
        <>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap pr-2 pt-6">

                    <img className="w-20 h-20 object-cover" src={myCrates} />

                    <a
                        onClick={() => navigate('/newCrate')}
                        className="ml-auto flex items-center gap-x-1 rounded-md bg-crate-yellow px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                        New Crate
                    </a>
                </div>
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {userCrates.map((userCrate) => {
                            return (
                                <Crate 
                                    userCrate ={userCrate}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}