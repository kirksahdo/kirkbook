export default class Publicacao {
  constructor(conteudo, timestamp, urlMidia="", id, curtidas = {}, comentarios={}) {
    this.conteudo = conteudo;
    this.urlMidia = urlMidia;
    this.timestamp = timestamp;
    this.id = id;
    this.curtidas = curtidas;
    this.comentarios = comentarios;
  }
}