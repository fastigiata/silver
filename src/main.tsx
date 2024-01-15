import 'air-datepicker/air-datepicker.css'
import './styles/variables.css'
import './styles/index.css'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Loading } from './components/Loading.tsx'

createRoot(document.getElementById('root') as HTMLElement)
    .render(<RouterProvider router={router} fallbackElement={<Loading/>}/>)
