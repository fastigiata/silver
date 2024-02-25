import { Await, defer, useFetcher, useLoaderData, useRevalidator } from 'react-router-dom'
import { Suspense, useEffect } from 'react'

const DeferLoader = () => {
    const fetcher = useFetcher()
    const { revalidate } = useRevalidator()
    const deferValue = useLoaderData() as { result: Promise<string> }

    useEffect(() => {
        console.log('deferValue updated')
    }, [ deferValue ])

    return (
        <div>
            <h1>Test Page</h1>

            <button onClick={() => revalidate()}>revalidate</button>
            <button onClick={() => fetcher.submit({}, { method: 'POST' })}>action</button>

            <Suspense fallback={<p>loading ...</p>}>
                <Await resolve={deferValue.result}>
                    {result => {
                        console.log('result', result)
                        return <p>{result}</p>
                    }}
                </Await>
            </Suspense>
        </div>
    )
}

let count = 0
const longTimeFetch = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'count: ' + count++
}

DeferLoader.loader = () => {
    return { result: longTimeFetch() }
    // return defer({ result: longTimeFetch() })
}

DeferLoader.action = () => {
    // do something here ...
    return null
}

export {
    DeferLoader
}