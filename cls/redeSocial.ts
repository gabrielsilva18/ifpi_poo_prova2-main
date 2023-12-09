

import { Perfil } from "./repositorioPerfis";
import { IPerfilCompleto } from "./repositorioPerfis";
import { Postagem } from "./postagem";
import { PostagemAvancada } from "./postagemAvancada";
import { RepositorioDePerfis } from "./repositorioPerfis";
import { RepositorioDePostagens } from "./repositorioPostagens";
import { PerfilSemPostagemError, PostagemSemHashtagAlvoError } from "./excecoes";

export class RedeSocial {
    private _repPerfis: RepositorioDePerfis;
    private _repPosts: RepositorioDePostagens;

    constructor(repPerfis: RepositorioDePerfis, repPosts: RepositorioDePostagens) {
        this._repPerfis = repPerfis;
        this._repPosts = repPosts;
    }

    get repPerfis(): RepositorioDePerfis {
        return this._repPerfis;
    }

    get repPosts(): RepositorioDePostagens {
        return this._repPosts;
    }
    
   // redeSocial.ts
incluirPerfil(perfil: IPerfilCompleto): void {
    // Certifique-se de criar uma instância de Perfil usando os dados da IPerfilCompleto
    const perfilCompleto = new Perfil(perfil.id, perfil.nome, perfil.email);
    
    // Agora, inclua usando a interface IPerfilCompleto
    (<RepositorioDePerfis>this.repPerfis).incluir(perfilCompleto);
}


consultarPerfil(id: number, nome: string, email: string): IPerfilCompleto {
    const perfilConsultado = (<RepositorioDePerfis>this.repPerfis).consultar(id);
    return perfilConsultado;
}

    
    // I think it would be better if this function had return "number" (but I am not allowed to change)
    incluirPostagem(postagem: Postagem): void {
        // let p = postagem
        // let postFields: number[] = []
        
        // // Regular post
        // if (p instanceof Postagem && !(postagem instanceof PostagemAvancada)) {
        //     postFields.push(p.data === undefined || p.data === "" ? 1 : 0)
        //     postFields.push(p.texto === undefined || p.texto === "" ? 1 : 0)
        //     postFields.push(p.id === undefined || p.id < 0 ? 1: 0)
        //     postFields.push(p.curtidas === undefined || p.curtidas < 0 ? 1 : 0)
        //     postFields.push(p.descurtidas === undefined || p.descurtidas < 0 ? 1 : 0)
        //     postFields.push(p.perfil === undefined ? 1 : 0)    
        // } 
        // // Advanced post
        // if (p instanceof PostagemAvancada) {
        //     postFields.push(p.data === undefined || p.data === "" ? 1 : 0)
        //     postFields.push(p.texto === undefined || p.texto === "" ? 1 : 0)
        //     postFields.push(p.id === undefined || p.id < 0 ? 1: 0)
        //     postFields.push(p.curtidas === undefined || p.curtidas < 0 ? 1 : 0)
        //     postFields.push(p.descurtidas === undefined || p.descurtidas < 0 ? 1 : 0)
        //     postFields.push(p.perfil === undefined ? 1 : 0)
        //     postFields.push(p.hashtags.length === 0 ? 1 : 0)
        //     postFields.push(p.curtidas === undefined || p.curtidas < 0 ? 1 : 0)
        // }
        
        // const undefinedCountage: number = postFields.reduce((current, next) => {return current + next})
            
        // // If there is no invalid attribute
        // if (undefinedCountage === 0) {
        //     for (let i = 0; i < this.repPosts.postagens.length; i++) {
        //         // Check for existence of repeated id. If there is, function breaks and nothing is added
        //         if (postagem.id === this.repPosts.postagens[i].id) {
        //             return 
        //         }
        //     }
        //     // If post is ok, it is added to the posts repository
        //     (<RepositorioDePostagens> this.repPosts).incluir(postagem)
        // }
        (<RepositorioDePostagens> this.repPosts).incluir(postagem)
    }

    consultarPostagens(id: number, hashtag: string, texto?: string, perfil?: Perfil): Postagem[] {
        return (<RepositorioDePostagens> this.repPosts).consultar(id, hashtag)
    }

    consultarPostagensPorPerfil(id: number) {
        return (<RepositorioDePostagens> this.repPosts).consultarPorIdPerfil(id)
    }

    consultarPostagensPorHashtag(hashtag: string) {
        return (<RepositorioDePostagens> this.repPosts).consultarPorHashtag(hashtag)
    }

    curtir(idPostagem: number): void {
        // for(let i = 0; i < this.repPosts.postagens.length; i++) {
        //     if (idPostagem === this.repPosts.postagens[i].id) {
        //         (<Postagem> this.repPosts.postagens[i]).curtir()
        //     }
        // }
        
        /* -1?
        Ex: app.ts/curtir
        -> "postId" recebe 5
        -> "this.repPosts.postagens" começa do 0, então 5 é na verdade 4 
        */ 
        (<Postagem> this.repPosts.postagens[idPostagem - 1]).curtir()
    }

    descurtir(idPostagem: number): void {
        // for(let i = 0; i < this.repPosts.postagens.length; i++) {
        //     if (idPostagem == this.repPosts.postagens[i].id) {
        //         if (this.repPosts.postagens[i].curtidas > 0) {
        //             (<Postagem> this.repPosts.postagens[i]).descurtir()
        //         }
        //     }
        // }
        (<Postagem> this.repPosts.postagens[idPostagem - 1]).descurtir()
    }
    
    decrementarVisualizacoes(postagem: PostagemAvancada): void {
        if (postagem.visualizacoesRestantes > 0) {
            (<PostagemAvancada> postagem).decrementarVisualizacoes()
        }
    }

    decrementarVisualizacoesMultiplas(postagem: PostagemAvancada[]): void {
        for (let i = 0; i < postagem.length; i++) {
            this.decrementarVisualizacoes(postagem[i])
        }
    }

    decrementarVisualizacoesPostagensAvancadas(array: Postagem[]) {
        array.forEach(i => {
            i instanceof PostagemAvancada ? this.decrementarVisualizacoes(i) : null
        })
    }
    
    exibirPostagensPorPerfil(id: number): Postagem[] {
        // First: take all posts from a certain profile id
        // Others outside the "ifs" will be excluded (return false)
        let profilePosts: Postagem[] = this.repPosts.postagens.filter((i: Postagem) => {
            if (i.perfil.id == id) {
                return true
            }
            return false
        })
        
        // Third: include advanced posts with 1+ views left OR regular posts
        // Others outside the "ifs" will be excluded (return false)
        profilePosts = profilePosts.filter((i: Postagem) => {
            if (
                i instanceof PostagemAvancada && i.visualizacoesRestantes > 0 || 
                i instanceof Postagem && !(i instanceof PostagemAvancada)
            ) {
                return true
            }
            return false
        })

        if (profilePosts.length === 0) {
            throw new PerfilSemPostagemError("\nERRO: perfil existe, mas não possui qualquer postagem... [redeSocial.ts/exibirPostagensPorPerfil]")
        }
        
        return profilePosts
    }

    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        // Filtrar as postagens avançadas (+ de 1 operação estava dando erros)
        let advancedPosts: Postagem[] = this.repPosts.postagens.filter((i: Postagem) => {
            if (i instanceof PostagemAvancada) {
                // this.decrementarVisualizacoes(i)
                return true
            }
            return false
        })
        
        // Postagem avançada, com alguma views restante e com a hashtag procurada em seu conteúdo
        advancedPosts = advancedPosts.filter((i: Postagem) => {
            if (i instanceof PostagemAvancada && i.visualizacoesRestantes > 0 && i.hashtags.includes(hashtag)) {
                return true
            }
            return false
        })
        
        /*
        advancedPosts começa como "Postagem[]", pois ela não pode ser "PostagemAvancada[]" no momento da filtragem
        quando a filtragem acontece, eu não posso mais mudar "Postagem[]" para "PostagemAvancada[]"
        sendo assim, eu criei outro array do tipo "PostagemAvancada[]"
        este array receberá os dados da consulta
        */
        let advancedPostsFinal: PostagemAvancada[] = []
        advancedPosts.forEach(i => {
            i instanceof PostagemAvancada ? advancedPostsFinal.push(i) : null
        })

        if (advancedPosts.length === 0) {
            throw new PostagemSemHashtagAlvoError("\nERRO: hashtag nunca foi mencionada... [redeSocial.ts/exibirPostagensPorHashtag]")
        }

        return advancedPostsFinal
    }

    // Treatment for date handling (not complete though)
    tratarDadosData(date: string, separator: string): boolean {
        let correct: number = 0
        const dateArray: string[] = date.split(separator)
        Number(dateArray[0]) <= new Date().getFullYear() ? correct++ : null
        Number(dateArray[1]) <= 12 ? correct++ : null
        Number(dateArray[2]) <= 31 ? correct++ : null
        Number(dateArray[0]) <= 9 ? dateArray[0] = `0${dateArray[0]}` : null
        Number(dateArray[1]) <= 9 ? dateArray[1] = `0${dateArray[1]}` : null
        Number(dateArray[2]) <= 9 ? dateArray[0] = `0${dateArray[2]}` : null
        return correct == 3 ? true : false
    }
}
