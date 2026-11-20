/*
    Arquivo: faq.js
    Projeto: DuoDrive - aluguel de veículos elétricos e a gasolina
    Disciplina: Desenvolvimento Front-End para Web
    Descrição: Abre e fecha as respostas da página de perguntas frequentes.
*/

const perguntas = document.querySelectorAll(".faq-pergunta");
const botaoAlternar = document.getElementById("alternar-todas");

function definirEstado(botao, abrir) {
    botao.setAttribute("aria-expanded", String(abrir));
    botao.nextElementSibling.hidden = !abrir;
}

perguntas.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const aberta = botao.getAttribute("aria-expanded") === "true";
        definirEstado(botao, !aberta);
    });
});

botaoAlternar.addEventListener("click", function () {
    const abrir = botaoAlternar.dataset.estado !== "abertas";
    for (const botao of perguntas) {
        definirEstado(botao, abrir);
    }
    botaoAlternar.dataset.estado = abrir ? "abertas" : "fechadas";
    botaoAlternar.textContent = abrir ? "Recolher todas" : "Expandir todas";
});
