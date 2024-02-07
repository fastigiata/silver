import { useRouteError } from 'react-router-dom'
import { useEffect } from 'react'

/**
 * shown when a fatal error occurs
 */
const ExceptionPage = () => {
    const error = useRouteError()

    useEffect(() => {
        console.log('error is ', error)
    }, [ error ])

    return (
        <div>
            fatal error occurred
        </div>
    )
}

export default ExceptionPage