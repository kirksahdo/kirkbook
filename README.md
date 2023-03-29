# KIRK BOOK

![App Screenshot](https://lh3.googleusercontent.com/u/1/drive-viewer/AAOQEOQxgNFgKysNucUyj_v8HWflS2SJy9o9HQ3DGMyRqNXcI5awCpAavQlg1nhKMgpObPfsrXpBdeBzNgW8f10MN6eqT9zv=w1879-h939)

Este projeto é uma rede social desenvolvida em React com integração do banco de dados Firebase. O objetivo do projeto foi criar uma plataforma de rede social para a disciplina de Modelagem e Projeto de Sistemas, da Universidade do Estado do Amazonas (UEA), a partir de toda uma documentação feita, onde os usuários pudessem compartilhar informações, seguir outros usuários, fazer postagens e comentários, entre outras funcionalidades.

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

    1. Clone o repositório em sua máquina local.
    2. Certifique-se de ter o Node.js instalado em sua máquina.
    3. Abra um terminal na pasta do projeto e execute o comando `npm install` para instalar as dependências.
    4. Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais de acesso ao Firebase no seguinte formato:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```


Substitua `your_api_key`, `your_auth_domain`, `your_project_id`, `your_storage_bucket`, `your_sender_id` e `your_app_id` pelas suas credenciais do Firebase correspondentes.

    5. Execute o comando `npm start` para rodar o projeto em seu navegador.

## Tecnologias utilizadas

- React
- Firebase (Realtime Database, Authentication, Storage)
- Styled Components
- Bootstrap

## Funcionalidades

- Criação de conta de usuário.
- Autenticação de usuário.
- Criação de postagens.
- Visualização de postagens.
- Comentários em postagens.
- Seguindo outros usuários.
- Feed personalizado para cada usuário.

## Licença

Este projeto está licenciado sob a licença MIT. Para mais informações, consulte o arquivo `LICENSE`.
