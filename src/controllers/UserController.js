import { auth, database } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database"

export const fazerLogin = (email, senha) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const realizarCadastro = (usuario, senha) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, usuario.email, senha)
      .then((userCredential) => {
        usuario.id = userCredential.user.uid;
        set(ref(database, `usuarios/${usuario.id}`), usuario)
          .then(_ => {
            resolve(usuario)
          })
          .catch(error => {
            reject(error);
          })
      })
      .catch((error) => {
        reject(error);
      })
  })
}