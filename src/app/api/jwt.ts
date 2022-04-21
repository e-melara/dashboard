import jwtDecode, { JwtPayload } from "jwt-decode";

import { api } from "./axios";
import { User } from "app/interfaces";
import { KEY_TOKEN_STORAGE } from "app/const";

function inValidToken(accessToken: string) {
  if (accessToken) {
    const currentTime = Date.now() / 1000;
    const decoded = jwtDecode<JwtPayload>(accessToken);
    return decoded.exp && decoded.exp > currentTime;
  }
  return false;
}

function setSession(accessToken: string | null) {
  if (!accessToken) {
    localStorage.removeItem(KEY_TOKEN_STORAGE);
    delete api.defaults.headers.common.Authorization;
  }

  localStorage.setItem(KEY_TOKEN_STORAGE, accessToken ?? "");
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

function jsonTranform(data: any): User {
  const { usuario, perfil } = data;
  const { id, nombre, estado, modulos } = perfil[0];

  const modulosArray = modulos.map(
    ({ id, icon, nombre, short_name, pivot }: any) => ({
      id,
      icon,
      nombre,
      shortName: short_name,
      permission: {
        id: pivot.id,
        view: true,
        add: pivot.add === 'A',
        delete: pivot.delete === 'A',
        update: pivot.update === 'A',
      },
    })
  );

  return {
    usuario: {
      ...usuario,
    },
    perfil: {
      estado,
      id,
      nombre,
      modulos: modulosArray,
    },
  };
}

export { inValidToken, setSession, jsonTranform };
