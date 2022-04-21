interface Usuario {
  nombres: string;
  apellidos: string;
  usuario: string;
  avatar?: string;
}

interface Permission {
  id: number;
  add: boolean;
  delete: boolean;
  view: boolean;
  update: boolean;
}

interface Modulo {
  id: number;
  nombre: string;
  shortName: string;
  icon: string;
  permission: Permission;
}

interface Perfil {
  id: number;
  nombre: string;
  estado: string;
  modulos: Modulo[];
}

export interface User {
  usuario: Usuario;
  perfil: Perfil;
}
