import { child, get, ref } from "firebase/database";
import { database } from "../config/firebase";
import { getUsuario } from "./UserController";

export const getAmigos = (usuario) => {
  return new Promise( async (resolve, reject) => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `usuarios/${usuario}/amigos`));
      if (snapshot.exists()) {
        const amigos = Object.values(snapshot.val());
        const novoAmigos = [];
        for (const a of amigos) {
          novoAmigos.push(await getUsuario(a.userId));
        }
        resolve(novoAmigos);
      }else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
}