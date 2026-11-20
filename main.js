/*
    Arquivo: main.js
    Projeto: DuoDrive - aluguel de veículos elétricos e a gasolina
    Disciplina: Desenvolvimento Front-End para Web
    Descrição: Menu responsivo e saudação por horário nas páginas feitas só com HTML, CSS e JavaScript.
*/

const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");
const saudacao = document.getElementById("saudacao");

botaoMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
});

if (saudacao) {
    const hora = new Date().getHours();
    let cumprimento = "Boa noite!";
    if (hora < 12) {
        cumprimento = "Bom dia!";
    } else if (hora < 18) {
        cumprimento = "Boa tarde!";
    }
    saudacao.textContent = cumprimento + " Que veículo vamos reservar hoje?";
}
