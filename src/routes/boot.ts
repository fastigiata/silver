import type { LoaderFunction } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import { logger } from '../utils/logger.ts'

/**
 * initialize all plugins and restore necessary data from storage,
 * then redirect to the '/dashboard' route
 */
const bootLoader: LoaderFunction = async () => {
    // Initialize all plugins here
    await logger.initialize()

    console.log('bootLoader start')
    await new Promise(r => setTimeout(r, 3000))
    console.log('bootLoader done')

    throw redirect('/dashboard')
}

export default bootLoader