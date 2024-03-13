const runMode = ('__TAURI_INTERNALS__' in window) ? 'embed' : 'web'
const runEmbed = ('__TAURI_INTERNALS__' in window)

export {
    runMode,
    runEmbed,
}