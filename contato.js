/*
    Arquivo: contato.js
    Projeto: DuoDrive - aluguel de veículos elétricos e a gasolina
    Disciplina: Desenvolvimento Front-End para Web
    Descrição: Contador de caracteres e envio do formulário de contato, com gravação no localStorage.
*/

const CHAVE_MENSAGENS = "duodrive_mensagens";
const formulario = document.getElementById("form-contato");
const campoMensagem = document.getElementById("mensagem");
const contadorCaracteres = document.getElementById("contador-caracteres");
const retorno = document.getElementById("retorno");

campoMensagem.addEventListener("input", function () {
    contadorCaracteres.textContent = campoMensagem.value.length + "/" + campoMensagem.maxLength;
});

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const dados = new FormData(formulario);
    const mensagens = JSON.parse(localStorage.getItem(CHAVE_MENSAGENS)) || [];
    mensagens.push({
        nome: dados.get("nome"),
        email: dados.get("email"),
        assunto: dados.get("assunto"),
        mensagem: dados.get("mensagem"),
        data: new Date().toLocaleString("pt-BR")
    });
    localStorage.setItem(CHAVE_MENSAGENS, JSON.stringify(mensagens));
    retorno.textContent = "Obrigado, " + dados.get("nome") + "! Recebemos sua mensagem e responderemos por e-mail.";
    retorno.className = "aviso sucesso";
    formulario.reset();
    contadorCaracteres.textContent = "0/" + campoMensagem.maxLength;
});
