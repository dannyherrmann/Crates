import myDigs from "../images/my-digs.png"

export const Digs = () => {
    return (
        <>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap pr-2 pt-6">

                    <img className="w-100 h-20 object-cover" src={myDigs} />

                </div>
            </div>
        </>
    )
}