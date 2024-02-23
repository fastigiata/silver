const sleep = (ms: number) => new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))

export {
    sleep
}