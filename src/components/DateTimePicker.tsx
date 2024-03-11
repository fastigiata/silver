import enUS from 'air-datepicker/locale/en'
import { useEffect, useRef } from 'react'
import AirDatepicker from 'air-datepicker'

type DateTimePickerProps = {
    className?: string
    placeholder?: string
    initialDate?: Date | null
    onSelected: (date: Date | null) => void
}
const DateTimePicker = ({ className, placeholder, initialDate, onSelected }: DateTimePickerProps) => {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const dp = new AirDatepicker(ref.current!, {
            locale: enUS,
            // autoClose: true,
            selectedDates: !!initialDate ? [ initialDate ] : undefined,
            isMobile: true,
            toggleSelected: false,
            timepicker: true,
            dateFormat: 'yyyy-MM-dd',
            timeFormat: 'HH:mm',
            onSelect({ date }) {
                onSelected(date as Date ?? null)
            },
            buttons: [
                // {
                //     content: '+1 Hour',
                //     className: 'underline underline-offset-4',
                //     onClick(_dp) {
                //         _dp.selectDate(Date.now() + 60 * 60 * 1000, { updateTime: true })
                //     }
                // },
                {
                    content: 'Today',
                    className: 'underline underline-offset-4',
                    onClick(_dp) {
                        _dp.selectDate(new Date(), { updateTime: true })
                    }
                },
                {
                    content: 'Clear',
                    className: '!text-red',
                    onClick(_dp) {
                        _dp.clear()
                        _dp.hide()
                    }
                },
                {
                    content: 'Done',
                    className: '!bg-primary-button !text-white',
                    onClick(_dp) {
                        _dp.hide()
                    }
                },
            ]
        })

        return () => dp.destroy()
    }, [])

    return <input ref={ref} className={className} placeholder={placeholder} type="text" readOnly/>
}

export type { DateTimePickerProps }
export { DateTimePicker }