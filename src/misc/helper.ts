const sleep = (ms: number) => new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))

/**
 * 格式化到n个字符内
 */
const formatToN = (str: string, n: number) => {
    if (n < 3) throw new Error('n must be greater than 3')
    return str.length <= n ? str : `${str.slice(0, n)}...`
}

export {
    sleep,
    formatToN
}