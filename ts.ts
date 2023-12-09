

class AplicacaoError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class NumeroInvalidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

function percorrer(sentence: string) {
    const stringArray: string[] = []
    for (let i = 0; i < sentence.length; i++) {
        stringArray.push(sentence[i])
    }
    return stringArray
}

function entradaSemEspacos(inputData: string): boolean {
    return !percorrer(inputData).includes(" ") 
}

function entradaNaoNegativa(inputData: number): boolean {
    return Number(inputData) > 0
}

function entradaNaoVazia(inputData: string): boolean {
    return inputData !== ""
}

function charEhNumero(item: string): boolean {
    const n: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    return n.includes(Number(item))
}

function entradaEhApenasNumero(inputData: string): boolean {
    for (let i = 0; i < inputData.length; i++) {
        console.log(inputData[i], charEhNumero(inputData[i]))
        if (!charEhNumero(inputData[i])) {
            return false
        }
    }
    return true
}

function numeroInvalido(inputData: number): void {
    console.log("A", entradaNaoNegativa(inputData))
    console.log("B", entradaNaoVazia(inputData.toString()))
    console.log("C", entradaSemEspacos(inputData.toString()))
    console.log("D", entradaEhApenasNumero(inputData.toString()))
    // if (
    //     !entradaNaoNegativa(inputData) ||
    //     !entradaNaoVazia(inputData.toString()) ||
    //     !entradaSemEspacos(inputData.toString()) ||
    //     !entradaEhApenasNumero(inputData.toString()) 
    // ) {
    //     throw new NumeroInvalidoError("ERRO: Número inválido...")
    // }
}

const value: number = 2
const value2: string = "2."
// console.log(value2.toString())
// numeroInvalido(value)
// numeroInvalido(Number(value2))
const media: number = (8 + 2.5 + 9) / 3
console.log(media)
console.log(12 - media)

