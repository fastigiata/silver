type InputProps = {
    /**
     * @default false
     */
    autoFocus?: boolean
    className?: string
    placeholder?: string
    value: string
    onChange: (s: string) => void
}

const InputSingleLine = ({ autoFocus, className = '', placeholder, value, onChange }: InputProps) => {
    return (
        <input
            autoFocus={autoFocus}
            className={className}
            type="text" placeholder={placeholder}
            value={value} onChange={(ev) => onChange(ev.target.value)}/>
    )
}

const InputMultiLine = ({ autoFocus, className = '', placeholder, value, onChange }: InputProps) => {
    // TODO: config scrollbar style for textarea
    return (
        <textarea
            autoFocus={autoFocus}
            className={className}
            placeholder={placeholder}
            value={value} onChange={(ev) => onChange(ev.target.value)}/>
    )
}

export {
    InputSingleLine,
    InputMultiLine
}