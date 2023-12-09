

function case3(): void {
    /*
    LOCAL:
        -> app.ts -> incluirPostagem
    RELACIONAMENTOS: 
        -> consultar (repositorioPerfis.ts) 
        -> incluirPostagem (redeSocial.ts) 
        -> incluir (repositorioPostagens.ts)
    ENTRADAS: 
        -> text: string
        -> profileId: number
        -> views: number
        -> hashtag: string (dentro do loop)

    [] add exceções em "case 3": incluirPostagem
    case 3 -> incluirPostagem (app.ts) -> 
    [text: string, profileId: number, views: number] não tratados
    */
}
 
/*
-> Me ajude a entender
-> Se a exceção é lançada no código 1, o código 2 não deve ser executado, certo?

this.redeSocial.incluirPostagem(newPost)
this.redeSocial.repPosts.atualizarUltimoIdPostagem()
*/