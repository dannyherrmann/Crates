import { json } from "react-router-dom"

const apiUrl = 'https://localhost:7041'

export const AddUser = async (userObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    }
    await fetch(`${apiUrl}/Users`, options)
}

export const FetchUserByFirebaseId = async (uid) => {
    const response = await fetch(`${apiUrl}/users/uid/${uid}`)
    const user = await response.json()
    return user
}

export const FetchUserRecords = async (userId) => {
    const response = await fetch(`${apiUrl}/userAlbums/${userId}`)
    const records = await response.json()
    return records
}

export const FetchUserDigs = async (userId) => {
    const response = await fetch(`${apiUrl}/userDigs/${userId}`)
    const records = await response.json()
    return records
}

export const FetchAlbum = async (albumId) => {
    const response = await fetch(`${apiUrl}/albums/${albumId}`)
    const album = await response.json()
    return album
}

export const FetchAlbumTracks = async (albumId) => {
    const response = await fetch(`${apiUrl}/tracks/album/${albumId}`)
    const tracks = await response.json()
    return tracks
}

export const FetchArtists = async () => {
    const response = await fetch(`${apiUrl}/artists`)
    const artists = await response.json()
    return artists
}

export const FetchCountries = async () => {
    const response = await fetch(`${apiUrl}/countries`)
    const countries = await response.json()
    return countries
}

export const FetchLabels = async () => {
    const response = await fetch(`${apiUrl}/labels`)
    const labels = await response.json()
    return labels
}

export const FetchSizes = async () => {
    const response = await fetch(`${apiUrl}/sizes`)
    const sizes = await response.json()
    return sizes
}

export const FetchSpeeds = async () => {
    const response = await fetch(`${apiUrl}/speeds`)
    const speeds = await response.json()
    return speeds
}

export const FetchGenres = async () => {
    const response = await fetch(`${apiUrl}/genres`)
    const genres = await response.json()
    return genres
}

export const FetchStyles = async () => {
    const response = await fetch(`${apiUrl}/styles`)
    const styles = await response.json()
    return styles
}

export const AddAlbum = async (albumObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(albumObj)
    }
    const response = await fetch(`${apiUrl}/albums`, options)
    const jsonData = await response.json()
    return jsonData
}

export const AddAlbumGenre = async (albumGenreObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(albumGenreObj)
    }
    await fetch(`${apiUrl}/albumGenres`, options)
}

export const AddAlbumStyle = async (albumStyleObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(albumStyleObj)
    }
    await fetch(`${apiUrl}/albumStyles`, options)
}

export const AddTrack = async (trackObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trackObj)
    }
    await fetch(`${apiUrl}/tracks`, options)
}

export const AddArtist = async (artistObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artistObj)
    }
    await fetch(`${apiUrl}/artists`, options)
}

export const AddUserAlbum = async (userAlbumObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userAlbumObj)
    }
    await fetch(`${apiUrl}/userAlbums`, options)
}

export const AddUserDig = async (userDigObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDigObj)
    }
    await fetch(`${apiUrl}/userDigs`, options)
}

export const FetchRecords = async (pageNumber, pageSize, sortOrder, searchCriterion) => {
    const response = await fetch(`${apiUrl}/albums?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&searchCriterion=${searchCriterion}`)
    const records = await response.json()
    return records
}

export const FetchAllRecords = async () => {
    const response = await fetch(`${apiUrl}/albums`)
    const records = await response.json()
    return records
}

export const FetchPagedRecords = async (pageNumber, pageSize, sortOrder) => {
    const response = await fetch(`${apiUrl}/albums?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`)
    const records = await response.json()
    return records
}

export const FetchAllRecordsSearch = async (searchCriterion) => {
    const response = await fetch(`${apiUrl}/albums?searchCriterion=${searchCriterion}`)
    const records = await response.json()
    return records
}

export const FetchAllRecordsByFilter = async (filterType, filter) => {
    const response = await fetch(`${apiUrl}/albums?${filterType}=${filter}`)
    const records = await response.json()
    return records
}

export const FetchPagedRecordsByFilter = async (pageNumber, pageSize, sortOrder, filterType, filter) => {
    const response = await fetch(`${apiUrl}/albums?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&${filterType}=${filter}`)
    const records = await response.json()
    return records
}

export const FetchDecades = async () => {
    const response = await fetch(`${apiUrl}/albums/decades`)
    const decades = await response.json()
    return decades
}

export const FetchUserCrates = async (userId) => {
    const response = await fetch(`${apiUrl}/userCrates/${userId}`)
    const crates = await response.json()
    return crates
}

export const FetchCrateTracks = async (crateId) => {
    const response = await fetch(`${apiUrl}/crateTracks/${crateId}`)
    const crateTracks = await response.json()
    return crateTracks
}

export const FetchUserCrateById = async (crateId) => {
    const response = await fetch(`${apiUrl}/userCrates/id/${crateId}`)
    const userCrate = await response.json()
    return userCrate
}

export const FetchTracksByUser = async (userId) => {
    const response = await fetch(`${apiUrl}/tracks/user/${userId}`)
    const tracks = await response.json()
    return tracks
}

export const AddCrateTrack = async (crateTrackObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(crateTrackObj)
    }
    await fetch(`${apiUrl}/crateTracks`, options)
}

export const AddUserCrate = async (userCrateObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCrateObj)
    }
    const response = await fetch(`${apiUrl}/userCrates`, options)
    const jsonData = await response.json()
    return jsonData
}

export const DeleteUserAlbum = async (userAlbumId) => {
    const options = {
        method: "DELETE",
    }
    await fetch(`${apiUrl}/userAlbums/${userAlbumId}`, options)
}

export const DeleteUserDig = async (userDigId) => {
    const options = {
        method: "DELETE",
    }
    await fetch(`${apiUrl}/userDigs/${userDigId}`, options)
}

export const UpdateAlbum = async (albumId, newAlbumObject) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newAlbumObject)
    }
    await fetch(`${apiUrl}/albums/${albumId}`, options)
}

export const DeleteAlbumGenre = async (albumId) => {
    const options = {
        method: "DELETE",
    }
    await fetch(`${apiUrl}/albumGenres/${albumId}`, options)
}

export const DeleteAlbumStyles = async (albumId) => {
    const options = {
        method: "DELETE",
    }
    await fetch(`${apiUrl}/albumStyles/${albumId}`, options)
}

export const DeleteAlbumTracks = async (albumId) => {
    const options = {
        method: "DELETE",
    }
    await fetch(`${apiUrl}/tracks/${albumId}`, options)
}

export const DeleteAlbum = async (albumId) => {
    const options = {
        method: "DELETE",
    }
    await fetch(`${apiUrl}/albums/${albumId}`, options)
}