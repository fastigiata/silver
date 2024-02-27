import type { ActionFunctionArgs } from 'react-router-dom'
import { useFetcher } from 'react-router-dom'

type CollectionCreateActionConfig = {
    name: string
    desc: string
}

const CollectionCreatePage = () => {
    const submit = useFetcher()

    return (
        <div className={'w-full h-full flex flex-col items-center justify-center'}>
            <div className={'w-[400px] h-[400px] bg-white rounded-[4px] shadow-card'}>
                TODO: CollectionCreateForm
            </div>
        </div>
    )
}

CollectionCreatePage.action = async ({ request }: ActionFunctionArgs) => {
    const form: CollectionCreateActionConfig = await request.json()
    console.log('CollectionCreatePage.action', form)
    return null
}

export default CollectionCreatePage