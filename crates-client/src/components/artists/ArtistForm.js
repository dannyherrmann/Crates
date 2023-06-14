import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { photoStorage } from "../helpers/photoStorage"
import { AddArtist } from "../ApiManager"

export const ArtistForm = () => {

    const [artist, setArtist] = useState({
        name: "",
        bio: ""
    })
    const [image, setImage] = useState(null)

    const navigate = useNavigate()

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const artistToSendToApi = {
            name: artist.name,
            bio: artist.bio,
            photo: null
        }

        const postArtist = async () => {

            if (image != null) {
                const photoObject = await photoStorage.upload("images", image)
                artistToSendToApi.photo = photoObject.downloadURL
            }

            await AddArtist(artistToSendToApi)

            navigate("/newAlbum")
        }

        postArtist()
    }

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-8 bg-white font-Space-Mono pb-5">
            <form>
                <div className="space-y-12">
                    <div className="border-gray-900/10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Create New Artist</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            {/* Artist Name */}
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Artist Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={(evt) => {
                                            const copy = { ...artist }
                                            copy.name = evt.target.value
                                            setArtist(copy)
                                        }}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-crate-yellow sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Artist Bio */}
                            <div className="col-span-full">
                                <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                                    Bio
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-crate-yellow sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        onChange={(evt) => {
                                            const copy = { ...artist }
                                            copy.bio = evt.target.value
                                            setArtist(copy)
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Artist Photo */}
                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Artist Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <input type="file" className="text-sm font-medium text-gray-700" onChange={(event) => handleImageChange(event)} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate("/newAlbum")}>
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