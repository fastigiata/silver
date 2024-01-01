/**
 * Whether the page is embedded in the tauri app
 */
const isEmbed = '__TAURI_INTERNALS__' in window

export {
    isEmbed
}