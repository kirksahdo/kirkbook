export default class Usuario {
  constructor(email, nome, dataDeNascimento, cidade, estado, sexo, amigos={}, solicitacoes={}, biografia = "", urlFotoPerfil = "", urlFotoCapa = "", id = "") {
    this.id = id;
    this.email = email;
    this.nome = nome;
    this.dataDeNascimento = dataDeNascimento;
    this.cidade = cidade;
    this.estado = estado;
    this.sexo = sexo;
    this.biografia = biografia;
    this.urlFotoPerfil = urlFotoPerfil;
    this.urlFotoCapa = urlFotoCapa;
    this.amigos = amigos;
    this.solicitacoes = solicitacoes;
  }
}