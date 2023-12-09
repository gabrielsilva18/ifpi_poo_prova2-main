

import { PerfilInexistenteError } from "./excecoes"
// iPerfil.ts
// perfil.ts
export interface IPerfil {
  id: number;
  nome: string;
  email: string;
}
export interface IPerfilCompleto extends IPerfil {
  getId(): number;
  getNome(): string;
  getEmail(): string;
}


export class Perfil implements IPerfilCompleto {
  constructor(public id: number, public nome: string, public email: string) {}

  getId(): number {
      return this.id;
  }

  getNome(): string {
      return this.nome;
  }

  getEmail(): string {
      return this.email;
  }
}


// repositorioDePerfis.ts
export interface IRepositorioDePerfis {
  incluir(perfil: IPerfil): void;
  consultar(id?: number, nome?: string, email?: string): IPerfil;
  tamanhoRepositorio(): number;
  verRepositorioPerfis(): void;
  atualizarUltimoIdPerfil(): void;
}

export class RepositorioDePerfis implements IRepositorioDePerfis {
  private _perfis: IPerfilCompleto[]; // Use IPerfilCompleto para incluir métodos getId(), getNome(), getEmail()
  lastId: number;

  constructor(perfis: IPerfilCompleto[]) {
      this._perfis = perfis;
      this.lastId = 0;
  }

  get perfis(): IPerfilCompleto[] {
      return this._perfis;
  }

  incluir(perfil: IPerfilCompleto): void {
      this.perfis.push(perfil);
  }

  consultar(id?: number, nome?: string, email?: string): IPerfilCompleto {
      for (let i = 0; i < this.perfis.length; i++) {
          if (id == this.perfis[i].getId()) {
              return this.perfis[i];
          }
      }
      throw new PerfilInexistenteError("\nERRO: Perfil não encontrado... [repositorioPers.ts/consultar]");
  }
  tamanhoRepositorio(): number {
      return this.perfis.length;
  }

  verRepositorioPerfis(): void {
      console.log("\n[");
      for (let i = 0; i < this.tamanhoRepositorio(); i++) {
          const thisProfile = this.perfis[i];
          console.log(thisProfile);
      }
      console.log("]");
  }

  atualizarUltimoIdPerfil(): void {
      this.lastId++;
  }
}
