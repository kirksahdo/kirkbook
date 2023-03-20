export default class Publicacao {
  constructor(conteudo, timestamp, urlMidia, id) {
    this.conteudo = conteudo;
    this.urlMidia = urlMidia;
    this.timestamp = timestamp;
    this.id = id;
  }
}