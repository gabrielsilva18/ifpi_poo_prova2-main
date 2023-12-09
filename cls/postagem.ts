import { IPerfil } from "./perfil";

export interface IPostagem {
    id: number;
    texto: string;
    curtidas: number;
    descurtidas: number;
    data: string;
    perfil: IPerfil;
}

export interface IPopularidade {
    curtir(): void;
    descurtir(): void;
    ehPopular(): boolean;
    ehPopularPorcentagem(): number;
}

export class Postagem implements IPostagem, IPopularidade {
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _data: string;
    private _perfil: IPerfil;

    constructor(id: number, texto: string, curtidas: number, descurtidas: number, data: string, perfil: IPerfil) {
        this._id = id;
        this._texto = texto;
        this._curtidas = curtidas;
        this._descurtidas = descurtidas;
        this._data = data;
        this._perfil = perfil;
    } 

    get id(): number {
        return this._id;
    }

    get texto(): string {
        return this._texto;
    }

    set texto(newContent: string) {
        this._texto = newContent;
    }

    get curtidas(): number {
        return this._curtidas;
    }

    set curtidas(newValue: number) {
        this._curtidas = newValue;
    }

    get descurtidas(): number {
        return this._descurtidas;
    }

    set descurtidas(newValue: number) {
        this._descurtidas = newValue;
    }

    get data(): string {
        return this._data;
    }

    get perfil(): IPerfil {
        return this._perfil;
    }

    curtir(): void {
        this.curtidas++;
    }

    descurtir(): void {
        this.descurtidas++;
    }

    ehPopular(): boolean {
        if (this.curtidas >= this.descurtidas) {
            const operation: number = ((this._curtidas - this.descurtidas) / this.descurtidas) * 100;
            return operation >= 50;
        }
        return false;
    }

    ehPopularPorcentagem(): number {
        if (this.curtidas >= this.descurtidas) {
            const operation: number = ((this._curtidas - this.descurtidas) / this.descurtidas) * 100;
            return operation;
        }
        return 0;
    }
}
