import { auth, database, storage } from "../config/firebase"
import { ref, push, set, serverTimestamp} from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";

export const criarPublicacao = (conteudo, imagem) => {
  return new Promise((resolve, reject) => {
    const userId = auth.currentUser.uid;
    const publiRef = push(ref(database, "publicacoes/"));
    const publiId = publiRef.key;
    const storageRef = refStorage(storage, `publicacoes/${publiId}`);
    console.log(imagem);
    uploadBytes(storageRef, imagem)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then(url => {
          console.log(url);
          set(ref(database, `publicacoes/${publiId}/`), {
            id: publiId,
            userId: userId,
            timestamp: serverTimestamp(),
            conteudo: conteudo,
            midiaUrl: url
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
  })
}