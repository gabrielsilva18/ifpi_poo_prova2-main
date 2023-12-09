// perfil.ts
// perfil.ts
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