const USER_NAME_DICTIONNARY = ['dbz_toz', 'mayne', 'narvalo', 'jean_ferosinge', 'joint_de_culasse', 'destiny_xxx']

export function getRandomUserName() {
    const i = Math.floor(Math.random() * USER_NAME_DICTIONNARY.length)
    return USER_NAME_DICTIONNARY[i] + '_#' + generateId()
}
