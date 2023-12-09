

const txt = "Az"
// console.log(txt[0].charCodeAt(0))
// console.log(txt[1].charCodeAt(0))

function entradaSomenteLetras(txt) {
    for (let i = 0; i < txt.length; i++) {
        const letter = txt[i].charCodeAt(0)
        if (letter < 65 || letter > 122) {
            return false
        }
    } 
    return true
}

console.log(entradaSomenteLetras(txt))
