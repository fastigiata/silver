import { ModalWrapper } from '@/modal/base.tsx'
import type { ChangeEvent } from 'react'
import { IOImpl } from '@/utils/io.ts'

const BatchImport = () => {
    const handleFilePick = async (ev: ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.[0]
        if (!file) return

        const text = await file.text()
        const result = IOImpl.batchImport(text)
        console.log(result)
    }

    return (
        <ModalWrapper>
            <input type="file" onChange={handleFilePick}/>
        </ModalWrapper>
    )
}

export { BatchImport }