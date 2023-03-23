import { auth, database } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database"

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

export const getUsuario = (id) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `usuarios/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        reject("Usuário não encontrado!");
      }
    }).catch((error) => {
      console.error(error);
    });
  });
}; 

export const getPerfil = (id) => {
  return new Promise((resolve, reject) => {
    getUsuario(id).then(usuario => {
      resolve({
        usuario: usuario,
        publicacoes: []
      });
    }).catch(error => {
      reject(error);
    })
  });
};