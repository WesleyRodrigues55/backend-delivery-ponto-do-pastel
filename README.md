<div align="center">
    <img src="https://github.com/WesleyRodrigues55/app-delivery-ponto-do-pastel/raw/main/img/logo-pastel-fundo-branco.jpg?raw=true" alt="Logo" width="250" height="250" />
    <br>
    <b>Backend do Ponto do Pastel</b>
    <br>
    <span>Um aplicativo delivery de pastel</span>
</div>


## Overview

O Backend do Ponto do pastel tem como objetivo dispor por meio de APIs acesso a solicitaçãos HTTP entre o app mobile e uma parte web de gerenciamento da loja.

O Projeto backend foi escrito utilizando `nodejs` e `express`.

Ponto do Pastel é uma aplicativo delivery mobile desenvolvido em Flutter, e que faz parte de um Projeto Acadêmico da Universidade de Sorocaba  - Uniso.

Pode saber mais sobre o aplicativo [clicando aqui](https://github.com/WesleyRodrigues55/app-delivery-ponto-do-pastel).


## Getting Started

Para iniciar os teste e uso desta aplicação, precisamos configurar algumas dependências necessárias para uso do projeto.

Se pretende utilizar o app completo (app delivery, backend e gerenciamento web), será necessário instalação e configuração de todos.

Poderá acessar cada repositório e seguir suas instalações em:
- [X] [Repositório App Delivery](https://github.com/WesleyRodrigues55/app-delivery-ponto-do-pastel)
- [X] [Repositório Web Manager](https://github.com/WesleyRodrigues55/web-management-system-ponto-do-pastel)

Mas caso queira testar apenas o backend, fica a vontade para clonar e realizar os testes necessários.

É possível testar as requisições usando o POSTMAN, segue o arquivo com as requisições criadas  neste projeto, acesse o arquivo [clicando aqui](https://github.com/WesleyRodrigues55/backend-delivery-ponto-do-pastel/tree/main/file_postman).
Maioria das ROTAS são privadas, então utilize o POSTMAN para realizar as autenticações necessárias.

Configurando e instalando a aplicação backend (Se baseando no uso do VS Code como IDE).

ATENÇÃO, antes de iniciarmos o passo a passo de instalção deve ser considera algumas configurações iniciais, são elas:

O projeto depende do serviço de pagamento do Mercado Pago PIX, saiba mais sobre a configuração em:
- [x] [Começando agora com o Mercado Pago](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-configuration/integrate-with-pix)
- [x] [Integrando o PIX - TUTORIAL](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-configuration/integrate-with-pix)

Também é necessário um serviço de envio de mensagens ao whatsapp, utilizamos o Twillo ele permite um gerencimento FREE num sandbox, saiba mais de como configurar o serviço em:

- [x] [Começando com Twillo com  whatsapp e nodejs](https://www.twilio.com/docs/whatsapp/quickstart/node)

E por fim, necessita de um base de dados, como o projeto está configurando para o uso do MongoDB, é necessário que tenha uma instância mongo (local ou não).
Supondo que esteja usando o [MongoDB Atlas](https://www.mongodb.com/pt-br/lp/cloud/atlas/try4?utm_source=bing&utm_campaign=search_bs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-br_ps-all_desktop_eng_lead&utm_term=mongo%20atlas%20database&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=415204511&adgroup=1208363748748865&msclkid=434519e64bc51ceaf8407f8069734eb9?utm_source=bing&utm_campaign=search_bs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-br_ps-all_desktop_eng_lead&utm_term=mongo%20atlas%20database&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=415204511&adgroup=1208363748748865&msclkid=434519e64bc51ceaf8407f8069734eb9) guarde sua string de conexão, pois utilizaremos.

Ótimo, após essas configurações em com as KEYS (públicas ou privadas em mãos) e a string de conexão, podemos adicioná-las em nossa arquivo `.env` mantive um arquivo exemplo na raíz do projeto, como o nome `env-example` renomeie para `.env` e preencha as KEYS lá presentes.

Crie um banco de dados chamado `ponto_do_pastel` e import o script inicial com as coleções [baixar coleções](https://github.com/WesleyRodrigues55/backend-delivery-ponto-do-pastel/tree/main/collections) o nome de cada coleção é o nome do arquivo, importe isso no seu banco de dados mongo para ter uma abse inicial no projeto.

O projeto backend usa o Mongoose para criar Schemmas das coleções, então algumas coleções serão criadas a partir do uso do mongoose automaticamente quando necessário.

Agora com as dependências configuradas, podemos iniciar nosso passo a passo para a instalação do projeto.

1. Tenha em sua máquina a seguinte IDE e ferramentas instaladas:
- [x] Visual Studio Code
- [x] Node (de preferência a última versão LTS)

2. Com as ferramentas instaladas, clone o projeto em:
    ```sh
    git clone https://github.com/WesleyRodrigues55/backend-delivery-ponto-do-pastel.git
    ```

3. Em seguida, abra o projeto.
    ```sh
    cd backend-delivery-ponto-do-pastel
    ```

4. Instale as dependências do `package.json` rodando o comando:
    ```sh
    npm install
    ```

5. Agora precisamos rodar a aplicação que por padrão roda na porta 5000:
    ```sh
    npm start
    ```

6. Pronto, agora seu projeto estará sendo emulado.


Tudo dando certo, o app será executado e abrirá sua tela inicial "Página de Login", agora é necessário o uso do backend e configuração dos apontamentos dos links de requisição.

Há, uma dica.

Existe um usuário inicial na coleção usuario.
Para realizar a autenticação usando o POSTMAN, considere executar a seguinte requisição no postman, caminho `Auth/Login with email/Authenticator login system adm` a resposta dessa requisição te devolverá um TOKEN de acesso para algumas requisições privadas.

Também foi criado um modelinho DER para exebição das coleções e quais relações elas criaram no backend, veja:

<img src="https://github.com/WesleyRodrigues55/backend-delivery-ponto-do-pastel/blob/main/der/der.png?raw=true" style="width: 100%" />


## Contributors

[<img src="https://avatars.githubusercontent.com/u/74609771?v=4" width="80" height="80" style="border-radius: 100%">](https://github.com/WesleyRodrigues55)
[<img src="https://avatars.githubusercontent.com/u/116026829?v=4" width="80" height="80" style="border-radius: 100%">](https://github.com/Encattani)
[<img src="https://avatars.githubusercontent.com/u/101207959?v=4" width="80" height="80" style="border-radius: 100%">](https://github.com/marilialloureiro)
[<img src="https://avatars.githubusercontent.com/u/134734144?v=4" width="80" height="80" style="border-radius: 100%">](https://github.com/joaooliveira376)
[<img src="https://avatars.githubusercontent.com/u/100249233?v=4" width="80" height="80" style="border-radius: 100%">](https://github.com/lucassuzuki)