import { auth, database, storage } from "../config/firebase"
import { ref, push, set, serverTimestamp, get, child, update} from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUsuario } from "./UserController";

export const criarPublicacao = (conteudo, imagem) => {
  return new Promise((resolve, reject) => {
    const userId = auth.currentUser.uid;
    const publiRef = push(ref(database, "publicacoes/"));
    const publiId = publiRef.key;
    const storageRef = refStorage(storage, `publicacoes/${publiId}`);
    if(imagem) {
      uploadBytes(storageRef, imagem)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then(url => {
          set(ref(database, `publicacoes/${publiId}/`), {
            id: publiId,
            userId: userId,
            timestamp: serverTimestamp(),
            conteudo: conteudo,
            midiaUrl: url,
            curtidas: {},
            comentarios: {}
          }).then(_ => {
            resolve("");
          }).catch(error => {
            reject(error);
          })
        })
      })
      .catch((error) => {
        reject(error)
      });
    } else {
      set(ref(database, `publicacoes/${publiId}/`), {
        id: publiId,
        userId: userId,
        timestamp: serverTimestamp(),
        conteudo: conteudo,
        curtidas: {},
        comentarios: {}
      }).then(_ => {
        resolve("");
      }).catch(error => {
        reject(error);
      })
    }
    
  });
}

export const getPublicacoes = () => {
  return new Promise(async (resolve, reject) => {
    try{
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `publicacoes/`))
      if(snapshot.exists()){
        const publicacoesKey = Object.keys(snapshot.val());
        const publicacoes = [];
        for (const k of publicacoesKey) {
          publicacoes.push(await getPublicacao(k));
        }
        resolve(publicacoes);
      } else {
        reject("Sem publicações no momento!");
      }
    }
    catch(error){
      reject(error)
    }
  });
}

export const getPublicacoesUsuario = (usuario) => {
  return new Promise(async (resolve, reject) => {
    try{
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `publicacoes`))
      if(snapshot.exists()){
        const publicacoesKey = Object.values(snapshot.val());
        const publicacoes = [];
        for (const k of publicacoesKey) {
          if(k.userId === usuario) {
            publicacoes.push(await getPublicacao(k.id));
          }
        }
        resolve(publicacoes);
      } else {
        reject("Sem publicações no momento!");
      }
    }
    catch(error){
      reject(error)
    }
  });
}

export const getPublicacao = (publicacao) => {
  return new Promise(async(resolve, reject) => {
    try{
      const snapshot = await get(child(ref(database), `publicacoes/${publicacao}`));
      if(snapshot.exists()){
        const publi = snapshot.val();
        publi.comentarios = publi.comentarios ? Object.values(publi.comentarios) : [];
        publi.curtidas = publi.curtidas ? Object.keys(publi.curtidas) : [];
        publi.comentarios = await Promise.all(publi.comentarios.map(async (p) => {
            const usuario = await getUsuario(p.userId);
            return { ...p, usuario: usuario };
          }));
        resolve(publi);
      } else {
        throw Error();
      }
    } catch(error) {
      console.error(error)
    }
  })
}

export const addCurtida = (publicacao, userId) => {
  return new Promise(async(resolve, reject) => {
    try{
      const dbRef = ref(database);
      const updates = {};
      updates[`publicacoes/${publicacao}/curtidas/${userId}`] = {timestamp: serverTimestamp()}
      await update(dbRef, updates);
      const publi = await getPublicacao(publicacao);
      resolve(publi);
    } catch(error){
      reject("Erro ao curtir publicação!")
    }
  });
}

export const removerCurtida = (publicacao, userId) => {
  return new Promise(async(resolve, reject) => {
    try{
      const dbRef = ref(database);
      const updates = {};
      updates[`publicacoes/${publicacao}/curtidas/${userId}`] = null;
      await update(dbRef, updates);
      const publi = await getPublicacao(publicacao);
      resolve(publi);
    } catch(error){
      reject("Erro ao descurtir publicação!")
    }
  });
}

export const addComentario = (publicacao, usuario, conteudo) => {
  return new Promise(async (resolve, reject) => {
    try{
      const dbRef = ref(database);
      const updates = {};
      const newComentKey = push(child(dbRef, `publicacoes/${publicacao}/comentarios/`)).key;
      updates[`publicacoes/${publicacao}/comentarios/${newComentKey}`] = {userId: usuario, conteudo: conteudo, timestamp: serverTimestamp()};
      await update(dbRef, updates);
      const publi = await getPublicacao(publicacao);
      resolve(publi);
    }catch(error){
      reject("Erro ao adicionar comentário!");
    }
  })
}

export const editarPublicacao = (conteudo, imagem, publicacao) => {
  return new Promise(async(resolve, reject) => {
    const storageRef = refStorage(storage, `publicacoes/${publicacao}`);
    try {
      if(imagem) {
        const snapshot = await uploadBytes(storageRef, imagem);
        const url = await getDownloadURL(snapshot.ref);
        const updates = {};
        updates[`publicacoes/${publicacao}/conteudo`] = conteudo;
        updates[`publicacoes/${publicacao}/midiaUrl`] = url;
        await update(ref(database), updates);
      } else {
        const updates = {};
        updates[`publicacoes/${publicacao}/conteudo`] = conteudo;
        await update(ref(database), updates);
      }
      const publi = await getPublicacao(publicacao);
      resolve(publi);
  } catch (error) {
    reject(error);
  }
  });
}

export const excluirPublicacao = (publicacao) => {
  return new Promise(async(resolve, reject) => {
    try {
      const updates = {};
      updates[`publicacoes/${publicacao}`] = null;
      await update(ref(database), updates);
      resolve();
  } catch (error) {
    reject(error);
  }
  });
}