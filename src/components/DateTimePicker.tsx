import ZhCN from 'air-datepicker/locale/zh'
import { useEffect, useRef } from 'react'
import AirDatepicker from 'air-datepicker'

const DateTimePicker = ({ onSelected }: { onSelected: (date: Date) => void }) => {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const dp = new AirDatepicker(ref.current!, {
            locale: ZhCN,
            autoClose: true,
            toggleSelected: false,
            timepicker: true,
            minutesStep: 5,
            onSelect({ date }) {
                onSelected(date as Date)
            }
        })

        return () => dp.destroy()
    }, [])

    return <input ref={ref} type="text" readOnly/>
}

export {
    DateTimePicker,
}