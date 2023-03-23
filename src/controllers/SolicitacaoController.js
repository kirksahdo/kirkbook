import { get, ref, serverTimestamp, update } from "@firebase/database";
import { database } from "../config/firebase";
import Solicitacao from "../models/Solicitacao";
import Usuario from "../models/Usuario";
import { getUsuario } from "./UserController";

export const enviarSolicitacao = (usuario, destinatario) => {
  return new Promise((resolve, reject) => {
    getUsuario(destinatario).then(destino => {
      var solicitacoes = destino.solicitacoes ? destino.solicitacoes : {};
      solicitacoes = {...solicitacoes, [usuario]: new Solicitacao(serverTimestamp())}
      const updates = {};
      updates[`usuarios/${destino.id}/solicitacoes`] = solicitacoes;
      update(ref(database), updates)
        .then(snapshot => resolve(snapshot))
        .catch(error => reject(error));
    });
  });
}