import { useNavigate, useRevalidator } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'

const ExceptionView = ({ text }: { text: string }) => {
    const navigate = useNavigate()
    const { revalidate } = useRevalidator()

    return (
        <div className={'w-[400px] p-5 bg-white rounded-[4px] shadow-card space-y-4'}>
            <p className={'h-6 text-primary text-[18px] leading-[24px] font-primary'}>
                Exception occurred!
            </p>

            <p className={'h-12 text-secondary text-[16px] leading-[24px] font-secondary line-clamp-2'}>
                {text}
            </p>

            <div className={'w-full h-9 flex items-center justify-between space-x-2'}>
                <SecondaryButton
                    className={'flex-1'} text={'Back'}
                    onClick={() => navigate(-1)}/>
                <PrimaryButton
                    className={'flex-1'} text={'Retry'}
                    onClick={revalidate}/>
            </div>
        </div>
    )
}

export {
    ExceptionView,
}