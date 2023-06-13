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