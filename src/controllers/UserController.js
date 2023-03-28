import { auth, database, storage } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import { getPublicacoesUsuario } from './PublicacaoController';
import { getAmigos } from './AmigosController';
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

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
          .then((_) => {
            resolve(usuario);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUsuario = (id) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `usuarios/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usuario = snapshot.val();
          usuario.amigos = usuario.amigos ? Object.values(usuario.amigos) : [];
          resolve(usuario);
        } else {
          reject('Usuário não encontrado!');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

export const getPerfil = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const usuario = await getUsuario(id);
      const publicacoes = await getPublicacoesUsuario(id);
      const amigos = await getAmigos(id);
      const resultado = {
        usuario: usuario,
        publicacoes: publicacoes,
        amigos: amigos,
      };
      resolve(resultado);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllUsuarios = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, 'usuarios/'));
      if (snapshot.exists()) {
        const usuarios = Object.values(snapshot.val());
        for (const u of usuarios) {
          u.amigos = u.amigos ? Object.values(u.amigos) : [];
        }
        resolve(usuarios);
      } else {
        throw Error('Erro ao carregar usuários');
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const editarPerfil = (id, dados) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = ref(database);
      const updates = {};
      updates[`usuarios/${id}/biografia`] = dados.biografia;
      updates[`usuarios/${id}/nome`] = dados.nome;
      updates[`usuarios/${id}/dataDeNascimento`] = dados.dataDeNascimento;
      updates[`usuarios/${id}/sexo`] = dados.sexo;
      updates[`usuarios/${id}/cidade`] = dados.cidade;
      updates[`usuarios/${id}/estado`] = dados.estado;
      if (dados.fotoPerfil) {
        const storageRef = refStorage(storage, `usuarios/perfil/${id}`);
        const snapshot = await uploadBytes(storageRef, dados.fotoPerfil);
        const url = await getDownloadURL(snapshot.ref);
        updates[`usuarios/${id}/urlFotoPerfil`] = url;
      }
      if (dados.fotoCapa) {
        const storageRef = refStorage(storage, `usuarios/capa/${id}`);
        const snapshot = await uploadBytes(storageRef, dados.fotoCapa);
        const url = await getDownloadURL(snapshot.ref);
        updates[`usuarios/${id}/urlFotoCapa`] = url;
      }
      await update(dbRef, updates);
      if (dados.senha.trim() !== '') {
        await updatePassword(auth.currentUser, dados.senha);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
