type InputProps = {
    className?: string
    placeholder?: string
    value: string
    onChange: (s: string) => void
}

const InputSingleLine = ({ className = '', placeholder, value, onChange }: InputProps) => {
    return (
        <input
            className={className}
            type="text" placeholder={placeholder}
            value={value} onChange={(ev) => onChange(ev.target.value)}/>
    )
}

const InputMultiLine = ({ className = '', placeholder, value, onChange }: InputProps) => {
    // TODO: config scrollbar style for textarea
    return (
        <textarea
            className={className}
            placeholder={placeholder}
            value={value} onChange={(ev) => onChange(ev.target.value)}/>
    )
}

export {
    InputSingleLine,
    InputMultiLine
}