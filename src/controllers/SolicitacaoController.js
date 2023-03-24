import { child, get, ref, serverTimestamp, update } from "@firebase/database";
import { database } from "../config/firebase";
import Solicitacao from "../models/Solicitacao";
import { getUsuario } from "./UserController";

export const enviarSolicitacao = (usuario, destinatario) => {
  return new Promise((resolve, reject) => {
    getUsuario(destinatario).then(destino => {
      var solicitacoes = destino.solicitacoes ? destino.solicitacoes : {};
      solicitacoes = {...solicitacoes, [usuario]: {timestamp: serverTimestamp(), userId: usuario}}
      const updates = {};
      updates[`usuarios/${destino.id}/solicitacoes`] = solicitacoes;
      update(ref(database), updates)
        .then(snapshot => resolve(snapshot))
        .catch(error => reject(error));
    });
  });
}

export const getSolicitacoes = (usuario) => {
  return new Promise(async(resolve, reject) => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `usuarios/${usuario}/solicitacoes`));
      if (snapshot.exists()){
        const solicitacoes = Object.values(snapshot.val());
        for (const s of solicitacoes) {
          s.usuario = await getUsuario(s.userId);
        }
        resolve(solicitacoes);
      } else {
        resolve([])
      }
    } catch (error) {
      reject(error);
    }
    
  }); 
}

export const aceitarSolicitacao = (remetente, destinatario) => {
  return new Promise(async(resolve, reject) => {
    try {
      const dbRef = ref(database);
      const updates = {};
      updates[`usuarios/${destinatario}/solicitacoes/${remetente}`] = null;
      updates[`usuarios/${destinatario}/amigos/${remetente}`] = {userId: remetente, timestamp: serverTimestamp()}
      updates[`usuarios/${remetente}/amigos/${destinatario}`] = {userId: destinatario, timestamp: serverTimestamp()}
      await update(dbRef, updates);
      resolve("Amizade aceita com sucesso!");
    } catch (error) {
      reject(error);
    }
  }); 
}

export const negarSolicitacao = (remetente, destinatario) => {
  return new Promise(async(resolve, reject) => {
    try {
      const dbRef = ref(database);
      const updates = {};
      updates[`usuarios/${destinatario}/solicitacoes/${remetente}`] = null;
      await update(dbRef, updates);
      resolve("Amizade rejeitada com sucesso!");
    } catch (error) {
      reject(error);
    }
  }); 
}