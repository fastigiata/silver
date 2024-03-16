type PlaceholderProps = {
    placeholder: string
}

const Placeholder = ({ placeholder }: PlaceholderProps) => {
    return (
        <span className={'text-tertiary font-tertiary select-none'}>&lt;{placeholder}&gt;</span>
    )
}

export {
    Placeholder
}