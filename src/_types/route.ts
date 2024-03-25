import type { To, UIMatch } from 'react-router-dom'

export type RouteHandle = {
    // FIXME: deprecated
    showBack?: boolean
    backBuilder?: (match: UIMatch, query: URLSearchParams) => To
}