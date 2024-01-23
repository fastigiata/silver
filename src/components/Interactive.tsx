import type { ReactNode, TouchEvent as TE, MouseEvent as ME, KeyboardEvent as KE, CSSProperties } from 'react'
import { useRef, useMemo, useEffect, memo } from 'react'

// Saves incoming handler to the ref in order to avoid "useCallback hell"
function useEventCallback<T>(handler?: (value: T) => void): (value: T) => void {
    const callbackRef = useRef(handler)
    const fn = useRef((value: T) => {
        callbackRef.current?.(value)
    })
    callbackRef.current = handler

    return fn.current
}

// Clamps a value between an upper and lower bound.
// We use ternary operators because it makes the minified code
// 2 times shorter than `Math.min(Math.max(a,b),c)`
const clamp = (number: number, min = 0, max = 1): number => {
    return number > max ? max : number < min ? min : number
}

/**
 * Relative position of the pointer inside the node's bounding box (0..1)
 */
export interface RelativePosition {
    left: number;
    top: number;
}

/**
 * Indicates the direction of the offset (left, right, top, bottom, or 0 if no offset)
 */
export interface IndicativeOffset {
    x: -1 | 0 | 1;
    y: -1 | 0 | 1;
}

// Check if an event was triggered by touch
const isTouch = (event: MouseEvent | TouchEvent): event is TouchEvent => 'touches' in event

// Finds a proper touch point by its identifier
const getTouchPoint = (touches: TouchList, touchId: null | number): Touch => {
    for (let i = 0; i < touches.length; i++) {
        if (touches[i].identifier === touchId) return touches[i]
    }
    return touches[0]
}

// Finds the proper window object to fix iframe embedding issues
const getParentWindow = (node?: HTMLDivElement | null): Window => {
    return (node && node.ownerDocument.defaultView) || self
}

// Returns a relative position of the pointer inside the node's bounding box
const getRelativePosition = (
    node: HTMLDivElement,
    event: MouseEvent | TouchEvent,
    touchId: null | number
): RelativePosition => {
    const rect = node.getBoundingClientRect()

    // Get user's pointer position from `touches` array if it's a `TouchEvent`
    const pointer = isTouch(event) ? getTouchPoint(event.touches, touchId) : (event as MouseEvent)

    return {
        left: clamp((pointer.pageX - (rect.left + getParentWindow(node).scrollX)) / rect.width),
        top: clamp((pointer.pageY - (rect.top + getParentWindow(node).scrollY)) / rect.height),
    }
}

// Browsers introduced an intervention, making touch events passive by default.
// This workaround removes `preventDefault` call from the touch handlers.
// https://github.com/facebook/react/issues/19651
const preventDefaultMove = (event: MouseEvent | TouchEvent): void => {
    if (!isTouch(event)) event.preventDefault()
}

// Prevent mobile browsers from handling mouse events (conflicting with touch ones).
// If we detected a touch interaction before, we prefer reacting to touch events only.
const isInvalid = (event: MouseEvent | TouchEvent, hasTouch: boolean): boolean => {
    return hasTouch && !isTouch(event)
}

interface Props {
    className?: string;
    style?: CSSProperties;
    onMove?: (pos: RelativePosition) => void;
    onKey?: (offset: IndicativeOffset) => void;
    children?: ReactNode;
}

const InteractiveBase = ({ onMove, onKey, ...rest }: Props) => {
    const container = useRef<HTMLDivElement>(null)
    const onMoveCallback = useEventCallback<RelativePosition>(onMove)
    const onKeyCallback = useEventCallback<IndicativeOffset>(onKey)
    const touchId = useRef<null | number>(null)
    const hasTouch = useRef(false)

    const [ handleMoveStart, handleKeyDown, toggleDocumentEvents ] = useMemo(() => {
        const handleMoveStart = ({ nativeEvent }: ME | TE) => {
            const el = container.current
            if (!el) return

            // Prevent text selection
            preventDefaultMove(nativeEvent)

            if (isInvalid(nativeEvent, hasTouch.current) || !el) return

            if (isTouch(nativeEvent)) {
                hasTouch.current = true
                const changedTouches = nativeEvent.changedTouches || []
                if (changedTouches.length) touchId.current = changedTouches[0].identifier
            }

            el.focus()
            onMoveCallback(getRelativePosition(el, nativeEvent, touchId.current))
            toggleDocumentEvents(true)
        }

        const handleMove = (event: MouseEvent | TouchEvent) => {
            // Prevent text selection
            preventDefaultMove(event)

            // If user moves the pointer outside the window or iframe bounds and release it there,
            // `mouseup`/`touchend` won't be fired. In order to stop the picker from following the cursor
            // after the user has moved the mouse/finger back to the document, we check `event.buttons`
            // and `event.touches`. It allows us to detect that the user is just moving his pointer
            // without pressing it down
            const isDown = isTouch(event) ? event.touches.length > 0 : event.buttons > 0

            if (isDown && container.current) {
                onMoveCallback(getRelativePosition(container.current, event, touchId.current))
            } else {
                toggleDocumentEvents(false)
            }
        }

        const handleMoveEnd = () => toggleDocumentEvents(false)

        const handleKeyDown = (event: KE) => {
            const keyCode = event.which || event.keyCode

            // Ignore all keys except arrow ones
            if (keyCode < 37 || keyCode > 40) return
            // Do not scroll page by arrow keys when document is focused on the element
            event.preventDefault()
            // Send relative offset to the parent component.
            // We use codes (37←, 38↑, 39→, 40↓) instead of keys ('ArrowRight', 'ArrowDown', etc)
            // to reduce the size of the library
            onKeyCallback({
                x: keyCode === 39 ? 1 : keyCode === 37 ? -1 : 0,
                y: keyCode === 40 ? 1 : keyCode === 38 ? -1 : 0,
            })
        }

        function toggleDocumentEvents(state?: boolean) {
            const touch = hasTouch.current
            const el = container.current
            const parentWindow = getParentWindow(el)

            // Add or remove additional pointer event listeners
            const toggleEvent = state ? parentWindow.addEventListener : parentWindow.removeEventListener
            toggleEvent(touch ? 'touchmove' : 'mousemove', handleMove)
            toggleEvent(touch ? 'touchend' : 'mouseup', handleMoveEnd)
        }

        return [ handleMoveStart, handleKeyDown, toggleDocumentEvents ]
    }, [ onKeyCallback, onMoveCallback ])

    // Remove window event listeners before unmounting
    useEffect(() => toggleDocumentEvents, [ toggleDocumentEvents ])

    return (
        <div
            {...rest}
            ref={container}
            onTouchStart={handleMoveStart}
            onMouseDown={handleMoveStart}
            onKeyDown={handleKeyDown}
            tabIndex={onKey ? 0 : undefined}
        />
    )
}

export const Interactive = memo(InteractiveBase)