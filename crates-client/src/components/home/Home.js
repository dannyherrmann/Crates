import myCrates from '../images/my-crates.png'
import myRecords from '../images/my-records.png'
import myDigs from '../images/my-digs.png'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <>
            <div className='flex flex-row justify-center items-center h-screen flex-wrap'>
                <Link to={'/myRecords'}>
                    <img src={myRecords} className='h-90 w-96'></img>
                </Link>
                <Link to={'/myCrates'}>
                    <img src={myCrates} className='h-90 w-96'></img>
                </Link>
                <Link to={'/myDigs'}>
                    <img src={myDigs} className='h-90 w-96'></img>
                </Link>
            </div>
        </>
    )
}