import { useNavigate } from "react-router-dom";

export const Record = ({ record }) => {
    const navigate = useNavigate()

    console.log('albumId', record.album.id)

    return (
        <section onClick={() => navigate(`/albums/${record.album.id}`)} key={`userAlbum--${record.id}`}>
            <div key={record.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                        src={record.album.photo}
                        alt={record.album.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-lg text-crate-yellow font-bold font-Space-Mono bg-black">

                            <span aria-hidden="true" className="absolute inset-0" />
                            {record.album.name}

                        </h3>
                        <h4 className="bg-white font-bold">by {record.album.artist.name}</h4>
                    </div>
                </div>
            </div>
        </section>
    )
}