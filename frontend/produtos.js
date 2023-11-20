
const produtosDB = [
    {
        nome : 'Mouse sem fio Razer Basilisk X',
        valor : 'R$349,90',
        desc : 'Razer Basilisk X Hyperspeed – Mouse sem fio para jogos (tecnologia Hyperspeed, sensor óptico 5G avançado e 6 botões configuráveis, interruptores mecânicos do mouse, bateria de longa duração',
        img :'https://m.media-amazon.com/images/I/71tmUKvm1eL._AC_SY450_.jpg'

    },
    {
        nome : 'Headset Gamer Razer Kraken X Lite',
        valor : 'R$199,90',
        desc : 'Conforto Ultraleve e Poderoso E se dissermos que você pode ter uma imersão completa nos jogos sem sentir que está usando um headset? Conheça o Razer Kraken X Lite. Ultraleve com apenas 250g e ultra imersivo com som surround 7.1, sente-se e aproveite por horas e horas–jogar por longos períodos nunca foi tão confortável.',
        img :'https://images.kabum.com.br/produtos/fotos/104667/headset-gamer-razer-kraken-x-lite-p2_headset-gamer-razer-kraken-x-lite-p2_1569864643_g.jpg'

    },
    {
        nome : 'Teclado Razer Ornata V2 - Windows',
        valor : 'R$829,90',
        desc : 'Tecnologia híbrida de membrana mecânica razer para toques sonoros com uma sensação amortecida e macia Seletor digital multifuncional e teclas de mídia para um controle mais conveniente',
        img :'https://m.media-amazon.com/images/I/61TL3sRzrEL._AC_SY450_.jpg'

    },
    {
        nome : 'Mousepad Sphex V2, Razer',
        valor : 'R$65,90',
        desc : 'Formato ultrafino de 0.5mmProjetado para sensores ópticos a laserAcabamento de policarbonato extraduravelTamanho Médio: 355mm x 254mmOtimizado para jogos',
        img :'https://m.media-amazon.com/images/I/61PiAydwk7L._AC_SX679_.jpg'

    }
    ,
    {
        nome : 'Mouse sem fio Razer Basilisk X',
        valor : 'R$349,90',
        desc : 'Razer Basilisk X Hyperspeed – Mouse sem fio para jogos (tecnologia Hyperspeed, sensor óptico 5G avançado e 6 botões configuráveis, interruptores mecânicos do mouse, bateria de longa duração',
        img :'https://m.media-amazon.com/images/I/71tmUKvm1eL._AC_SY450_.jpg'

    },
    {
        nome : 'Headset Gamer Razer Kraken X Lite',
        valor : 'R$199,90',
        desc : 'Conforto Ultraleve e Poderoso E se dissermos que você pode ter uma imersão completa nos jogos sem sentir que está usando um headset? Conheça o Razer Kraken X Lite. Ultraleve com apenas 250g e ultra imersivo com som surround 7.1, sente-se e aproveite por horas e horas–jogar por longos períodos nunca foi tão confortável.',
        img :'https://images.kabum.com.br/produtos/fotos/104667/headset-gamer-razer-kraken-x-lite-p2_headset-gamer-razer-kraken-x-lite-p2_1569864643_g.jpg'

    },
    {
        nome : 'Teclado Razer Ornata V2 - Windows',
        valor : 'R$829,90',
        desc : 'Tecnologia híbrida de membrana mecânica razer para toques sonoros com uma sensação amortecida e macia Seletor digital multifuncional e teclas de mídia para um controle mais conveniente',
        img :'https://m.media-amazon.com/images/I/61TL3sRzrEL._AC_SY450_.jpg'

    },
    {
        nome : 'Mousepad Sphex V2, Razer',
        valor : 'R$65,90',
        desc : 'Formato ultrafino de 0.5mmProjetado para sensores ópticos a laserAcabamento de policarbonato extraduravelTamanho Médio: 355mm x 254mmOtimizado para jogos',
        img :'https://m.media-amazon.com/images/I/61PiAydwk7L._AC_SX679_.jpg'

    }
]

document.addEventListener("DOMContentLoaded", function() {
    const produtosContainer = document.getElementById('prod');

    produtosDB.forEach((elemento) => {
        const divProduto = document.createElement('div');
        divProduto.className = 'produtos';

        const h2Nome = document.createElement('h2');
        h2Nome.className = 'produt';
        h2Nome.textContent = elemento.nome;

        const pValor = document.createElement('p');
        pValor.className = 'valor';
        pValor.textContent = elemento.valor;

        const pDesc = document.createElement('p');
        pDesc.className = 'desc';
        pDesc.textContent = elemento.desc;

        const imgProduto = document.createElement('img');
        imgProduto.className = 'img';
        imgProduto.src = elemento.img;

        const btnComprar = document.createElement('button');
        btnComprar.className = 'botao carrinho';
        btnComprar.textContent = 'Comprar';

        const btnCarrinho = document.createElement('button');
        btnCarrinho.className = 'botao carrinho';
        btnCarrinho.textContent = 'Adicionar o Carrinho';

        divProduto.appendChild(h2Nome);
        divProduto.appendChild(pValor);
        divProduto.appendChild(pDesc);
        divProduto.appendChild(imgProduto);
        divProduto.appendChild(btnComprar);
        divProduto.appendChild(btnCarrinho);

        produtosContainer.appendChild(divProduto);
    });
});