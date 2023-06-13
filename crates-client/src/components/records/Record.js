import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Record = ({ record }) => {
    const navigate = useNavigate()

    console.log('albumId', record.album.id)

    return (
        <section onClick={() => navigate(`/albums/${record.album.id}`)} key={`userAlbum--${record.id}`}>
            <div key={record.id} className="group relative">
                <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                    <img
                        src={record.album.photo}
                        alt={record.album.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="flex flex-col items-start w-full pt-4 gap-y-1">

                        <h3 className="text-lg text-crate-yellow font-bold font-Space-Mono bg-black">

                            <span aria-hidden="true" className="absolute inset-0" />
                            {record.album.name}

                        </h3>
                        <h4 className="bg-white font-bold">by {record.album.artist.name}</h4>

                </div>
            </div>
        </section>
    )
}