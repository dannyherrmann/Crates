import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const SearchRecord = ({ record }) => {
    const navigate = useNavigate()

    return (
        <section onClick={() => navigate(`/albums/${record.id}`)} key={`album--${record.id}`}>
            <div key={record.id} className="group relative">
                <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                    <img
                        src={record.photo}
                        alt={record.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="flex flex-col items-start w-full pt-4 gap-y-1">

                        <h3 className="text-lg text-crate-yellow font-bold font-Space-Mono bg-black">

                            <span aria-hidden="true" className="absolute inset-0" />
                            {record.name}

                        </h3>
                        <h4 className="bg-white font-bold">by {record.artist.name}</h4>

                </div>
            </div>
        </section>
    )
}