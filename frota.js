/*
    Arquivo: frota.js
    Projeto: DuoDrive - aluguel de veículos elétricos e a gasolina
    Disciplina: Desenvolvimento Front-End para Web
    Descrição: Monta os cartões dos veículos e filtra a frota por tipo (usa dados.js).
*/

const listaFrota = document.getElementById("lista-frota");
const contador = document.getElementById("contador");
const botoesFiltro = document.querySelectorAll("[data-filtro]");
let filtroAtual = document.body.dataset.tipo || "todos";

function criarCartao(veiculo) {
    const coluna = document.createElement("div");
    const medida = veiculo.tipo === "eletrico" ? "por carga" : "por tanque";
    coluna.className = "col-12 col-sm-6 col-xl-3";
    coluna.innerHTML = `
        <article class="card h-100 ${veiculo.tipo}">
            <img src="${veiculo.imagem}" class="card-img-top" alt="${veiculo.nome}">
            <div class="card-body d-flex flex-column">
                <span class="selo ${veiculo.tipo} align-self-start">${nomeDoTipo(veiculo.tipo)}</span>
                <h3 class="card-title mt-2">${veiculo.nome}</h3>
                <p class="card-text">${veiculo.descricao}</p>
                <ul class="list-unstyled text-secondary">
                    <li>${veiculo.categoria}, ${veiculo.lugares} lugares</li>
                    <li>Autonomia de ${veiculo.autonomia} km ${medida}</li>
                </ul>
                <p class="fs-4 fw-bold mb-3">${formatarMoeda(veiculo.diaria)} <small class="fs-6 fw-normal text-secondary">por dia</small></p>
                <a href="reserva.html?veiculo=${veiculo.id}" class="btn btn-${veiculo.tipo} mt-auto">Reservar este veículo</a>
            </div>
        </article>`;
    return coluna;
}

function exibirFrota() {
    let total = 0;
    listaFrota.innerHTML = "";
    for (const veiculo of frota) {
        if (filtroAtual === "todos" || veiculo.tipo === filtroAtual) {
            listaFrota.appendChild(criarCartao(veiculo));
            total++;
        }
    }
    contador.textContent = total + (total === 1 ? " veículo disponível" : " veículos disponíveis");
}

botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        filtroAtual = botao.dataset.filtro;
        botoesFiltro.forEach(function (outro) {
            outro.classList.remove("active");
        });
        botao.classList.add("active");
        exibirFrota();
    });
});

exibirFrota();
