import {
  child,
  get,
  onChildAdded,
  push,
  ref,
  serverTimestamp,
  set,
} from 'firebase/database';
import { database } from '../config/firebase';

export const criarConversa = (usuario1, usuario2) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = ref(database, 'conversas/');
      const key = push(dbRef).key;
      await set(ref(database, `conversas/${key}`), {
        usuarios: [usuario1, usuario2],
        id: key,
      });
      resolve(key);
    } catch (error) {
      reject(error);
    }
  });
};

export const getConversaId = (usuario1, usuario2) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, 'conversas/'));
      if (snapshot.exists()) {
        const conversas = Object.values(snapshot.val());
        var idConversa = '';
        for (const conversa of conversas) {
          if (
            conversa.usuarios.includes(usuario1) &&
            conversa.usuarios.includes(usuario2)
          ) {
            idConversa = conversa.id;
            break;
          }
        }
        resolve(idConversa);
      } else {
        throw Error();
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const addMensagem = (conversa, mensagem, autor) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = ref(database, `conversas/${conversa}/mensagens`);
      const key = push(dbRef).key;
      await set(ref(database, `conversas/${conversa}/mensagens/${key}`), {
        autor: autor,
        mensagem: mensagem, 
        timestamp: serverTimestamp(),
      });
      resolve(key);
    } catch (error) {
      reject(error);
    }
  });
};

export const lerMensagens = (conversa) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(
        child(dbRef, `conversas/${conversa}/mensagens`)
      );
      if (snapshot.exists()) {
        const mensagens = Object.values(snapshot.val());
        resolve(mensagens);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const lerNovasMensagens = (conversaId, callback) => {
  const dbRef = ref(database, `conversas/${conversaId}/mensagens`);
  const listener = onChildAdded(dbRef, (snapshot) => {
    const mensagem = snapshot.val();
    callback(mensagem);
  });

  return listener;
};
