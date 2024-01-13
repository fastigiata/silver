import { Link, Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div className={'w-full h-full flex flex-col items-center'}>
            {/* header */}
            <div className={'w-full h-10'}
                style={{
                    // backgroundImage: 'linear-gradient(to right,rgb(49,60,54),rgb(61,84,63),rgb(39,40,46))'
                }}>
                <Link className={'underline underline-offset-4'} to={'/dashboard'}>Home</Link>
                <Link className={'underline underline-offset-4'} to={'/misc'}>Misc</Link>
            </div>

            {/* body */}
            <div className={'w-full flex-1 shrink-0'}>
                <Outlet/>
            </div>
        </div>
    )
}

export default RootLayout