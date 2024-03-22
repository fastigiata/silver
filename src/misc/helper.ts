const sleep = (ms: number) => new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))

/**
 * 格式化到n个字符内
 */
const formatToN = (str: string, n: number) => {
    if (n < 3) throw new Error('n must be greater than 3')
    return str.length <= n ? str : `${str.slice(0, n)}...`
}

const getArchiveFile = async (): Promise<File | null> => {
    try {
        // @ts-expect-error ...
        const handler: FileSystemFileHandle[] = await window.showOpenFilePicker({
            types: [
                {
                    description: 'Archive Files',
                    accept: {
                        'application/json': [ '.json' ],
                        'text/yaml': [ '.yaml' ],
                        'text/toml': [ '.toml' ]
                    }
                }
            ]
        })
        return handler[0]!.getFile()
    } catch (_) {
        console.log(_)
        return null
    }
}

export {
    sleep,
    formatToN,
    getArchiveFile,
}