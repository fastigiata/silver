abstract class Env {
    static isEmbed = ('__TAURI_INTERNALS__' in window)
}

export {
    Env
}