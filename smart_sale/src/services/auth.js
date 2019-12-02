export const usuarioAutenticado = () => localStorage.getItem("user-smartsale") !== null

export const parseJwt = () => {
    var base64 = localStorage.getItem("user-smartsale").split('.')[1]
    return JSON.parse(window.atob(base64))  // atob() decode encoded string to decoded
}