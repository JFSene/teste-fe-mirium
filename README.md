# Teste FE Mirium

Teste realizado par ao processo seletivo da Mirium

## Funcionalidades requeridas
- Quando o usuário clica no botão "Cadastro" na primeira tela, o usuário deve ser
direcionado para a próxima página com o formulário de registro.
O formulário de inscrição deve permitir ao usuário:
- Carregar uma foto
- Selecione a idade
- Campo de interesse: o usuário deve poder inserir os respectivos interesses, que devem
aparecer abaixo do campo. O usuário deve ter o recurso para remover interesses se
desejado, clicando no botão de remover (x).
- Depois que o usuário envia o formulário de registro com sucesso de todos os dados
preenchidos, mostra a tela 3 representando os dados do usuário de uma forma simples.
- Os dados podem ser editáveis clicando no botão Editar Perfil.
- A foto do usuário pode ser alterável ao clicar no botão Editar foto.
- Para o campo Primeiro nome, a validação deve estar usando regex. A condição é que
deve ter caracteres alfabéticos e o comprimento não deve exceder 20 caracteres.
- O campo de endereço terá dois valores:
- Casa: Quando selecionado, um novo campo aparece abaixo onde será possível
adicionar o endereço.
- Empresa: Quando selecionado, um novo campo aparece abaixo onde será
possível adicionar o endereço.
- Na tela 3 configurar o botão “Confirmar” para enviar os dados em um HTTP request
method POST.

## Guias gerais
Usar HTML semântico
Usar React.js
Usar padrão de código Orientado a Objeto

### Getting Started
```
> git clone https://github.com/StephenGrider/ReduxSimpleStarter.git
> cd ReduxSimpleStarter
> npm install
> npm start
```
Acesse `localhost:8080` para dar inicio.

### Dependêmcas utitlizadas
- Redux
- Redux-Form
- React-Router
- React-Bootstrap
- React-Text-Mask
- React-Widgets
- Axios
- MockApi.io 

#### Known Bugs
- Image uploader wont work when creating a new user;
- Was not able to send image to mockapi.io;
- Needs refactoring and code cleaning;
- Was not able to import local images to show on screen.




