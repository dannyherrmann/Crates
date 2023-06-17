import { useNavigate, Link } from "react-router-dom"
import crate from "../images/crate.png"

export const Crate = ({ userCrate }) => {

    const navigate = useNavigate()

    return (
        <section onClick={() => navigate(`/crates/${userCrate.id}`)} key={`userCrate--${userCrate.id}`}>
            <div key={userCrate.id} className="group relative">
                <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                    <img
                        src={crate}
                        alt={crate.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="flex flex-col items-center w-full pt-4 gap-y-1">
                    <h3 className="text-lg text-crate-yellow font-bold font-Space-Mono bg-black">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {userCrate.name}
                    </h3>
                </div>
            </div>
        </section>
    )
}