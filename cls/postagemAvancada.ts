import { Perfil } from "./perfil";
import { Postagem } from "./postagem";
import { 
    HashtagGiganteError, HashtagPequenaError, HashtagPossuiAlgumaLetraError, HashtagRepetidaError, 
    HashtagSemSentidoError, HashtagTemSimboloError, HashtagVaziaError 
} from "./excecoes";

// Definindo a interface IPostagemAvancada que descreve a estrutura avançada de uma postagem
interface IPostagemAvancada {
    hashtags: string[];
    visualizacoesRestantes: number;

    existeHashtag(hashtag: string): boolean;
    hashtagGigante(postagem: string): boolean;
    hashtagPequena(postagem: string): boolean;
    hashtagPossuiAlgumaLetra(postagem: string): boolean;
    hashtagSemSentido(postagem: string): boolean;
    hashtagTemSimbolo(postagem: string): boolean;
    hashtagVazia(postagem: string): boolean;

    addHashtag(): void;
    adicionarHashtag(hashtag: string): void;
    decrementarVisualizacoes(): void;
}

// Definindo a interface IConsultasPostagens que descreve métodos para consultar postagens
interface IConsultasPostagens {
    consultar(id: number, hashtag: string, texto?: string, perfil?: Perfil): Postagem[];
    consultarUnico(postId: number): Postagem;
    consultarPorIdPerfil(id: number): PostagemAvancada[];
    consultarPorHashtag(hashtag: string): PostagemAvancada[];
}

//Implementação da classe PostagemAvancada que herda de Postagem e implementa as interfaces
export class PostagemAvancada extends Postagem implements IPostagemAvancada{
    private _hashtags: string[];
    private _visualizacoesRestantes: number;

     // Construtor da classe que chama o construtor da classe base (superclasse)
    constructor(
        id: number, texto: string, curtidas: number, descurtidas: number, data: string, perfil: Perfil,
        hashtags: string[], visualizacoesRestantes: number
    ) {
        super(id, texto, curtidas, descurtidas, data, perfil);
        this._hashtags = hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }
    // Métodos de acesso para as propriedades
    get hashtags(): string[] {
        return this._hashtags
    }

    get visualizacoesRestantes(): number {
        return this._visualizacoesRestantes
    }

    set visualizacoesRestantes(newValue: number) {
        this._visualizacoesRestantes = newValue
    }

    // Métodos da interface IPostagemAvancada
    existeHashtag(hashtag: string): boolean {
        return this.hashtags.includes(hashtag) ? true : false
        // if (this.hashtags.includes(hashtag)) {
        //     throw new HashtagRepetidaError("ERRO: hashtag é repetida... [postagemAvancada.ts/existeHashtag]")
        // } 
        // return false
    }

    hashtagGigante(postagem: string): boolean {
        return postagem.length > 25
    }

    hashtagPequena(postagem: string): boolean {
        return postagem.length < 3
    }

    hashtagPossuiAlgumaLetra(postagem: string): boolean {
        for (let i = 0; i < postagem.length; i++) {
            const letter = postagem[i].charCodeAt(0)
            if (letter >= 65 && letter <= 122) {
                return true
            }
        }
        return false
    }

    hashtagSemSentido(postagem: string): boolean {
        for (let i = 0; i < postagem.length; i++) {
            if (postagem[i] != " ") {
                return false
            }
        }
        return true
    }

    hashtagTemSimbolo(postagem: string): boolean {
        let n = 0
        for (let i = 0; i < postagem.length; i++) {
            if (postagem[i] === "#") {
                n++;
            }
        }
        // (app.ts -> incluirPostagem) a hashtag é incluida automaticamente
        // Se o usuário digita 1 ou mais além do padrão, ficará repetido (inválido)
        console.log("---o", n)
        return n >= 2 ? true : false
    }

    hashtagVazia(postagem: string): boolean {
        return postagem === ""
    }
    
    // app.ts -> adicionarHashtag
    addHashtag(): void {
        /*
        this.hashtags is one array of strings (each advanced post has one of these)
        this function checks if the parameter (one string hashtag) is within this array from this specific post
        */
        for (let i = 0; i < this.hashtags.length; i++) {
            if (this.hashtagGigante(this.hashtags[i])) {
                throw new HashtagGiganteError("\nERRO: hashtag excede limite de caracteres (25)...")
            }
            if (this.hashtagPequena(this.hashtags[i])) {
                throw new HashtagPequenaError("\nERRO: hashtag muito curta...")
            }
            if (!this.hashtagPossuiAlgumaLetra(this.hashtags[i])) {
                throw new HashtagPossuiAlgumaLetraError("\nERRO: hashtag sem letras...")
            }
            if (this.hashtagSemSentido(this.hashtags[i])) {
                throw new HashtagSemSentidoError("\nERRO: hashtag deve ter algum texto...")
            }
            if (this.hashtagTemSimbolo(this.hashtags[i])) {
                throw new HashtagTemSimboloError("\nERRO: hashtag não deve ser incluida...")
            }
            if (this.hashtagVazia(this.hashtags[i])) {
                throw new HashtagVaziaError("\nERRO: hashtag não pode ser vazia...")
            }
        }
    }

    adicionarHashtag(hashtag: string): void {
        this.hashtags.push(hashtag)
    }
    
    // For when a post is viewed (but not on all cases)
    decrementarVisualizacoes(): void {
        this.visualizacoesRestantes = this.visualizacoesRestantes - 1 
    }
}
