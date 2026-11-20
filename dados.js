/*
    Arquivo: dados.js
    Projeto: DuoDrive - aluguel de veículos elétricos e a gasolina
    Disciplina: Desenvolvimento Front-End para Web
    Descrição: Dados da frota e dos adicionais, com funções auxiliares usadas por várias páginas.
*/

const frota = [
    {
        id: 1,
        nome: "Volt Mini",
        tipo: "eletrico",
        categoria: "Hatch",
        lugares: 5,
        autonomia: 300,
        diaria: 189,
        imagem: "img/volt-mini.svg",
        descricao: "Compacto elétrico para o dia a dia da cidade, com recarga rápida."
    },
    {
        id: 2,
        nome: "Volt Sedan",
        tipo: "eletrico",
        categoria: "Sedan",
        lugares: 5,
        autonomia: 420,
        diaria: 259,
        imagem: "img/volt-sedan.svg",
        descricao: "Conforto e silêncio para viagens médias, com porta-malas amplo."
    },
    {
        id: 3,
        nome: "Volt SUV",
        tipo: "eletrico",
        categoria: "SUV",
        lugares: 5,
        autonomia: 480,
        diaria: 329,
        imagem: "img/volt-suv.svg",
        descricao: "Posição de dirigir elevada e a maior autonomia da linha elétrica."
    },
    {
        id: 4,
        nome: "Volt Cargo",
        tipo: "eletrico",
        categoria: "Picape",
        lugares: 5,
        autonomia: 380,
        diaria: 349,
        imagem: "img/volt-cargo.svg",
        descricao: "Picape elétrica para trabalho, com caçamba e resposta imediata."
    },
    {
        id: 5,
        nome: "Classic Mini",
        tipo: "gasolina",
        categoria: "Hatch",
        lugares: 5,
        autonomia: 550,
        diaria: 119,
        imagem: "img/classic-mini.svg",
        descricao: "Hatch 1.0 econômico, ideal para quem quer o menor valor de diária."
    },
    {
        id: 6,
        nome: "Classic Sedan",
        tipo: "gasolina",
        categoria: "Sedan",
        lugares: 5,
        autonomia: 650,
        diaria: 169,
        imagem: "img/classic-sedan.svg",
        descricao: "Sedan 1.6 equilibrado, com bom espaço interno e ótimo consumo."
    },
    {
        id: 7,
        nome: "Classic SUV",
        tipo: "gasolina",
        categoria: "SUV",
        lugares: 5,
        autonomia: 700,
        diaria: 229,
        imagem: "img/classic-suv.svg",
        descricao: "SUV 2.0 para estrada e terreno irregular, com muita autonomia."
    },
    {
        id: 8,
        nome: "Classic Picape",
        tipo: "gasolina",
        categoria: "Picape",
        lugares: 5,
        autonomia: 750,
        diaria: 279,
        imagem: "img/classic-picape.svg",
        descricao: "Picape 2.0 com caçamba grande, feita para carga e longas distâncias."
    }
];

const adicionais = {
    seguro: { nome: "Seguro total", valor: 25 },
    cadeirinha: { nome: "Cadeirinha infantil", valor: 10 },
    gps: { nome: "Navegador GPS", valor: 8 },
    motorista: { nome: "Motorista adicional", valor: 20 }
};

const custoPorKm = {
    eletrico: 0.14,
    gasolina: 0.52
};

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function nomeDoTipo(tipo) {
    if (tipo === "eletrico") {
        return "Elétrico";
    }
    return "Gasolina";
}

function preencherVeiculos(campo) {
    for (const veiculo of frota) {
        const opcao = document.createElement("option");
        opcao.value = veiculo.id;
        opcao.textContent = veiculo.nome + " (" + nomeDoTipo(veiculo.tipo) + "), " + formatarMoeda(veiculo.diaria) + " por dia";
        campo.appendChild(opcao);
    }
}
