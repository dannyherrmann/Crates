import { useEffect, useState, Fragment } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
    FetchAlbum,
    FetchArtists,
    FetchCountries,
    FetchLabels,
    FetchSizes,
    FetchSpeeds,
    FetchGenres,
    FetchStyles,
    FetchAlbumTracks,
    AddAlbumGenre,
    AddAlbumStyle,
    AddTrack,
    UpdateAlbum,
    DeleteAlbumGenre,
    DeleteAlbumStyles,
    DeleteAlbumTracks
} from "../ApiManager"
import {
    Transition,
    Listbox
} from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid"
import { photoStorage } from "../helpers/photoStorage"
import InputMask from 'react-input-mask'

export const EditRecord = () => {

    const { albumId } = useParams()
    const [album, setAlbum] = useState({})
    const [artists, setArtists] = useState([])
    const [selectedArtist, setSelectedArtist] = useState({})
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState({})
    const [labels, setLabels] = useState([])
    const [selectedLabel, setSelectedLabel] = useState({})
    const [sizes, setSizes] = useState([])
    const [selectedSize, setSelectedSize] = useState({})
    const [speeds, setSpeeds] = useState([])
    const [selectedSpeed, setSelectedSpeed] = useState({})
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [currentGenres, setCurrentGenres] = useState([])
    const [styles, setStyles] = useState([])
    const [selectedStyles, setSelectedStyles] = useState([])
    const [currentStyles, setCurrentStyles] = useState([])
    const [image, setImage] = useState(null)
    const [tracks, setTracks] = useState([])
    const [currentTracks, setCurrentTracks] = useState([])

    const navigate = useNavigate()

    const fetchAlbum = async () => {
        const album = await FetchAlbum(albumId)
        setAlbum(album)
        setSelectedArtist(album.artist)
        setSelectedCountry(album.country)
        setSelectedLabel(album.label)
        setSelectedSize(album.size)
        setSelectedSpeed(album.speed)
        if (album.genreIds?.length > 0) {
            setSelectedGenres(album.genreIds?.split(',').map(Number))
            setCurrentGenres(album.genreIds?.split(',').map(Number))
        }
        if (album.styleIds?.length > 0) {
            setSelectedStyles(album.styleIds?.split(',').map(Number))
            setCurrentStyles(album.styleIds?.split(',').map(Number))
        }
        setImage(album.photo)
    }

    const fetchArtists = async () => {
        const artists = await FetchArtists()
        setArtists(artists)
    }

    const fetchCountries = async () => {
        const countries = await FetchCountries()
        setCountries(countries)
    }

    const fetchLabels = async () => {
        const labels = await FetchLabels()
        setLabels(labels)
    }

    const fetchSizes = async () => {
        const sizes = await FetchSizes()
        setSizes(sizes)
    }

    const fetchSpeeds = async () => {
        const speeds = await FetchSpeeds()
        setSpeeds(speeds)
    }

    const fetchGenres = async () => {
        const genres = await FetchGenres()
        setGenres(genres)
    }

    const fetchStyles = async () => {
        const styles = await FetchStyles()
        setStyles(styles)
    }

    const fetchAlbumTracks = async () => {
        const albumTracks = await FetchAlbumTracks(albumId)
        setTracks(albumTracks)
        setCurrentTracks(albumTracks)
    }

    const addTrack = () => {
        setTracks([...tracks, { name: '', position: '', duration: '', bpm: '', key: '', albumId: '' }])
    }

    const updateTrack = (index, field, value) => {
        let newTracks = [...tracks];
        newTracks[index][field] = value
        setTracks(newTracks)
    }

    const removeTrack = (index) => {
        let newTracks = [...tracks]
        newTracks.splice(index, 1)
        setTracks(newTracks)
    }

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
        const imagePreview = document.getElementById('image-preview')
        imagePreview.src = URL.createObjectURL(e.target.files[0])
    }

    const handleGenreChange = (e) => {
        const selectedGenre = parseInt(e.target.id)
        setSelectedGenres(prevGenres =>
            prevGenres.includes(selectedGenre)
                ? prevGenres.filter(genre => genre != selectedGenre)
                : [...prevGenres, selectedGenre]
        )
    }

    const handleStyleChange = (e) => {
        const selectedStyle = parseInt(e.target.id)
        setSelectedStyles(prevStyles =>
            prevStyles.includes(selectedStyle)
                ? prevStyles.filter(style => style != selectedStyle)
                : [...prevStyles, selectedStyle]
        )
    }

    useEffect(() => {
        fetchAlbum()
        fetchArtists()
        fetchCountries()
        fetchLabels()
        fetchSizes()
        fetchSpeeds()
        fetchGenres()
        fetchStyles()
        fetchAlbumTracks()
    }, [albumId])

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const albumToSendToApi = {
            id: parseInt(albumId),
            name: album.name,
            year: parseInt(album.year),
            catalogNumber: album.catalogNumber,
            photo: album.photo,
            dateAdded: album.dateAdded,
            artistId: selectedArtist.id,
            countryId: selectedCountry.id,
            labelId: selectedLabel.id,
            sizeId: selectedSize.id,
            speedId: selectedSpeed.id
        }

        const putAlbum = async () => {

            if (album.photo != image) {
                const photoObject = await photoStorage.upload("images", image)
                albumToSendToApi.photo = photoObject.downloadURL
            }

            await UpdateAlbum(albumToSendToApi.id, albumToSendToApi) 

            if (currentGenres?.length > 0) {
                DeleteAlbumGenre(parseInt(albumId))

                for (const genre of selectedGenres) {

                    const albumGenreObj = {
                        albumId: parseInt(albumId),
                        genreId: genre
                    }
                    await AddAlbumGenre(albumGenreObj)
                }
            }

            if (currentGenres?.length === 0 && selectedGenres.length > 0) {
                for (const genre of selectedGenres) {

                    const albumGenreObj = {
                        albumId: parseInt(albumId),
                        genreId: genre
                    }
                    await AddAlbumGenre(albumGenreObj)
                }
            }

            if (currentStyles?.length > 0) {
                DeleteAlbumStyles(parseInt(albumId))

                for (const style of selectedStyles) {

                    const albumStyleObj = {
                        albumId: parseInt(albumId),
                        styleId: style 
                    }
                    await AddAlbumStyle(albumStyleObj)
                }
            }

            if (currentStyles?.length === 0 && selectedStyles.length > 0) {
                for (const style of selectedStyles) {

                    const albumStyleObj = {
                        albumId: parseInt(albumId),
                        styleId: style 
                    }
                    await AddAlbumStyle(albumStyleObj)
                }
            }

            navigate(`/albums/${albumId}`)
        }

        putAlbum()

    }

    // classNames for tailwindUI components
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-8 bg-white font-Space-Mono pb-5">
            <form>
                <div className="space-y-12">
                    <div className="border-gray-900/10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Album</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            {/* ARTIST LISTBOX */}

                            <div className="block text-sm font-medium leading-6 text-black">
                                <div>
                                    <label
                                        htmlFor="project-name"
                                        className="block text-sm font-medium text-black sm:mt-px sm:pt-2"
                                    >
                                        Artist
                                    </label>
                                </div>
                                <div className="sm:col-span-2">
                                    <Listbox
                                        value={selectedArtist}
                                        onChange={setSelectedArtist}
                                    >
                                        {({ open }) => (
                                            <>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-crate-yellow sm:text-sm">
                                                        <span className="block truncate">
                                                            {selectedArtist.name}
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {artists.map((artist) => (
                                                                <Listbox.Option
                                                                    key={artist.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active
                                                                                ? "text-black bg-crate-yellow"
                                                                                : "text-gray-900",
                                                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                                                        )
                                                                    }
                                                                    value={artist}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span
                                                                                className={classNames(
                                                                                    selected
                                                                                        ? "font-semibold"
                                                                                        : "font-normal",
                                                                                    "block truncate"
                                                                                )}
                                                                            >
                                                                                {artist.name}
                                                                            </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active
                                                                                            ? "text-black"
                                                                                            : "text-black",
                                                                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>

                            {/* Album Title */}
                            <div className="sm:col-span-3">
                                <label htmlFor="album-title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Album Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="album-title"
                                        id="album-title"
                                        defaultValue={album.name}
                                        onChange={(evt) => {
                                            const copy = { ...album }
                                            copy.name = evt.target.value
                                            setAlbum(copy)
                                        }}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-crate-yellow sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Year */}
                            <div className="sm:col-span-1">
                                <label htmlFor="album-year" className="block text-sm font-medium leading-6 text-gray-900">
                                    Release Year
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="album-year"
                                        id="album-year"
                                        defaultValue={album.year}
                                        onChange={(evt) => {
                                            const copy = { ...album }
                                            copy.year = evt.target.value
                                            setAlbum(copy)
                                        }}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-crate-yellow sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Catalog Number */}
                            <div className="sm:col-span-1">
                                <label htmlFor="catalog-number" className="block text-sm font-medium leading-6 text-gray-900">
                                    Catalog Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="catalog-number"
                                        id="catalog-number"
                                        defaultValue={album.catalogNumber}
                                        onChange={(evt) => {
                                            const copy = { ...album }
                                            copy.catalogNumber = evt.target.value
                                            setAlbum(copy)
                                        }}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-crate-yellow sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* COUNTRY */}
                            <div className="block text-sm font-medium leading-6 text-black">
                                <div>
                                    <label
                                        htmlFor="project-name"
                                        className="block text-sm font-medium text-black sm:mt-px sm:pt-2"
                                    >
                                        Country
                                    </label>
                                </div>
                                <div className="sm:col-span-2">
                                    <Listbox
                                        value={selectedCountry}
                                        onChange={setSelectedCountry}
                                    >
                                        {({ open }) => (
                                            <>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-crate-yellow focus:outline-none focus:ring-1 focus:ring-crate-yellow sm:text-sm">
                                                        <span className="block truncate">
                                                            {selectedCountry?.name}
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {countries.map((country) => (
                                                                <Listbox.Option
                                                                    key={country.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active
                                                                                ? "text-black bg-crate-yellow"
                                                                                : "text-gray-900",
                                                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                                                        )
                                                                    }
                                                                    value={country}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span
                                                                                className={classNames(
                                                                                    selected
                                                                                        ? "font-semibold"
                                                                                        : "font-normal",
                                                                                    "block truncate"
                                                                                )}
                                                                            >
                                                                                {country.name}
                                                                            </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active
                                                                                            ? "text-black"
                                                                                            : "text-black",
                                                                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>

                            {/* LABEL */}
                            <div className="block text-sm font-medium leading-6 text-black">
                                <div>
                                    <label
                                        htmlFor="project-name"
                                        className="block text-sm font-medium text-black sm:mt-px sm:pt-2"
                                    >
                                        Label
                                    </label>
                                </div>
                                <div className="sm:col-span-2">
                                    <Listbox
                                        value={selectedLabel}
                                        onChange={setSelectedLabel}
                                    >
                                        {({ open }) => (
                                            <>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-crate-yellow focus:outline-none focus:ring-1 focus:ring-crate-yellow sm:text-sm">
                                                        <span className="block truncate">
                                                            {selectedLabel?.name}
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {labels.map((label) => (
                                                                <Listbox.Option
                                                                    key={label.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active
                                                                                ? "text-black bg-crate-yellow"
                                                                                : "text-gray-900",
                                                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                                                        )
                                                                    }
                                                                    value={label}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span
                                                                                className={classNames(
                                                                                    selected
                                                                                        ? "font-semibold"
                                                                                        : "font-normal",
                                                                                    "block truncate"
                                                                                )}
                                                                            >
                                                                                {label.name}
                                                                            </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active
                                                                                            ? "text-black"
                                                                                            : "text-black",
                                                                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>

                            {/* SIZE */}
                            <div className="block text-sm font-medium leading-6 text-black">
                                <div>
                                    <label
                                        htmlFor="project-name"
                                        className="block text-sm font-medium text-black sm:mt-px sm:pt-2"
                                    >
                                        Size
                                    </label>
                                </div>
                                <div className="sm:col-span-2">
                                    <Listbox
                                        value={selectedSize}
                                        onChange={setSelectedSize}
                                    >
                                        {({ open }) => (
                                            <>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-crate-yellow focus:outline-none focus:ring-1 focus:ring-crate-yellow sm:text-sm">
                                                        <span className="block truncate">
                                                            {selectedSize?.name}
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {sizes.map((size) => (
                                                                <Listbox.Option
                                                                    key={size.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active
                                                                                ? "text-black bg-crate-yellow"
                                                                                : "text-gray-900",
                                                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                                                        )
                                                                    }
                                                                    value={size}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span
                                                                                className={classNames(
                                                                                    selected
                                                                                        ? "font-semibold"
                                                                                        : "font-normal",
                                                                                    "block truncate"
                                                                                )}
                                                                            >
                                                                                {size.name}
                                                                            </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active
                                                                                            ? "text-black"
                                                                                            : "text-black",
                                                                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>

                            {/* SPEED */}

                            <div className="block text-sm font-medium leading-6 text-black">
                                <div>
                                    <label
                                        htmlFor="project-name"
                                        className="block text-sm font-medium text-black sm:mt-px sm:pt-2"
                                    >
                                        Speed
                                    </label>
                                </div>
                                <div className="sm:col-span-2">
                                    <Listbox
                                        value={selectedSpeed}
                                        onChange={setSelectedSpeed}
                                    >
                                        {({ open }) => (
                                            <>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-crate-yellow focus:outline-none focus:ring-1 focus:ring-crate-yellow sm:text-sm">
                                                        <span className="block truncate">
                                                            {selectedSpeed?.name}
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {speeds.map((speed) => (
                                                                <Listbox.Option
                                                                    key={speed.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active
                                                                                ? "text-black bg-crate-yellow"
                                                                                : "text-gray-900",
                                                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                                                        )
                                                                    }
                                                                    value={speed}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span
                                                                                className={classNames(
                                                                                    selected
                                                                                        ? "font-semibold"
                                                                                        : "font-normal",
                                                                                    "block truncate"
                                                                                )}
                                                                            >
                                                                                {speed.name}
                                                                            </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active
                                                                                            ? "text-black"
                                                                                            : "text-black",
                                                                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>

                            {/* ALBUM PHOTO */}

                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Album Photo
                                </label>
                                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                    {
                                        album.photo ? (
                                            <>
                                                <img
                                                    id="image-preview"
                                                    className="h-12 w-12 rounded-full object-cover"
                                                    src={album.photo}
                                                    alt=""
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <span className="h-12 w-12 object-cover rounded-full bg-gray-100">
                                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </span>
                                            </>
                                        )
                                    }


                                </span>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <input type="file" className="text-sm font-medium text-gray-700" onChange={(event) => handleImageChange(event)} />
                                </div>
                            </div>

                            {/* GENRES */}

                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-black">Genres</legend>
                                <div className="mt-6 space-y-6">
                                    {genres.map((genre) => {
                                        return (
                                            <div className="relative flex gap-x-3">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id={genre.id}
                                                        name="genres"
                                                        type="checkbox"
                                                        checked={selectedGenres?.includes(genre.id)}
                                                        onChange={(e) => handleGenreChange(e)}
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-crate-yellow"
                                                    />
                                                </div>
                                                <div className="text-sm leading-6">
                                                    <label htmlFor="genres" className="font-medium text-gray-900">
                                                        {genre.name}
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </fieldset>

                            {/* STYLES */}

                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-black">STYLES</legend>
                                <div className="mt-6 space-y-6">
                                    {styles.map((style) => {
                                        return (
                                            <div className="relative flex gap-x-3">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id={style.id}
                                                        name="styles"
                                                        type="checkbox"
                                                        checked={selectedStyles?.includes(style.id)}
                                                        onChange={(e) => handleStyleChange(e)}
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-crate-yellow"
                                                    />
                                                </div>
                                                <div className="text-sm leading-6">
                                                    <label htmlFor="styles" className="font-medium text-gray-900">
                                                        {style.name}
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </form>

            {/* TRACKS */}
            {/* <form>
                <div>
                    <label
                        htmlFor="project-name"
                        className="block text-sm font-medium text-black sm:mt-px sm:pt-2 mb-3"
                    >
                        Tracks
                    </label>
                </div>
                {tracks.map((track, index) => {
                    return (
                        <div key={index} className='flex'>
                            <input
                                type="text"
                                value={track.position}
                                onChange={e => updateTrack(index, 'position', e.target.value)}
                                placeholder="Position"
                                className='focus:ring-2 focus:ring-inset focus:ring-crate-yellow'
                            />
                            <input
                                type="text"
                                value={track.name}
                                onChange={e => updateTrack(index, 'name', e.target.value)}
                                placeholder="Name"
                                className='focus:ring-2 focus:ring-inset focus:ring-crate-yellow'
                            />
                            <InputMask mask="99:99:99" placeholder="HH:MM:SS" value={track.duration} onChange={e => updateTrack(index, 'duration', e.target.value)} className='focus:ring-2 focus:ring-inset focus:ring-crate-yellow'>
                                {(inputProps) => <input {...inputProps} type="text" />}
                            </InputMask>
                            <input
                                type="number"
                                value={track.bpm}
                                onChange={e => updateTrack(index, 'bpm', e.target.value)}
                                placeholder="BPMs"
                                className='focus:ring-2 focus:ring-inset focus:ring-crate-yellow'
                            />
                            <input
                                type="text"
                                value={track.key}
                                onChange={e => updateTrack(index, 'key', e.target.value)}
                                placeholder="Key"
                                className='focus:ring-2 focus:ring-inset focus:ring-crate-yellow'
                            />
                        </div>
                    )
                })}
                <button type="button" onClick={addTrack} className='rounded-md bg-crate-yellow px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2 mt-3'>Add Track</button>
                <button type="button" onClick={removeTrack} className='rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Remove Track</button>
            </form> */}

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
                    Save
                </button>
            </div>
        </div>
    )

}