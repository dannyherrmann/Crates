import myCrates from '../images/my-crates.png'
import myRecords from '../images/my-records.png'
import myDigs from '../images/my-digs.png'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <div className='flex flex-row justify-center space-y-4 mb-20 flex-wrap'>
                    <div className='mx-6'>
                        <Link to={'/myRecords'}>
                            <img src={myRecords} className='h-80 w-auto'></img>
                        </Link>
                    </div>
                    <div className='mx-6'>
                        <Link to={'/myCrates'}>
                            <img src={myCrates} className='h-80 w-auto'></img>
                        </Link>
                    </div>
                    <div className='mx-6'>
                        <Link to={'/myDigs'}>
                            <img src={myDigs} className='h-80 w-auto'></img>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}