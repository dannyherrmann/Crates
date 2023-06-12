import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FetchAlbum } from "../ApiManager"

export const RecordDetail = () => {
    const { albumId } = useParams()
    const [record, setRecord] = useState([])

    const fetchAlbum = async () => {
        const album = await FetchAlbum(albumId)
        setRecord(album)
    }

    useEffect(() => {
        fetchAlbum()
    }, [albumId])

    return (
        <>
            <img src={record.photo}></img>
        </>
    )
}