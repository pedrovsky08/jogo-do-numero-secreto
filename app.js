// -------------------------- DECLARAÇÃO DE VARIAVEIS ----------------------------------------------
let listaDosNumerosSorteados = [];

let limite = 30;

let tentativas = 1;

let numeroSecreto = geradorNumeroAleatorio(limite);

let numeroVitorias = 0;


// -------------------------------- CRIAÇÃO DE FUNÇÕES -----------------------------------------------
function geradorNumeroAleatorio(limite) {
    let numeroEscolhido = parseInt(Math.random() * limite + 1);
    let quantidadeDeElementosNaLista = listaDosNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == limite){
        listaDosNumerosSorteados = [];
    }

    if (listaDosNumerosSorteados.includes(numeroEscolhido)){
        return geradorNumeroAleatorio(limite);
        //isso chama a função novamente caso o número escolhido ja tenha sido usado.
        //metodo conhecido como recursão
    } else {
        listaDosNumerosSorteados.push(numeroEscolhido);
        //insere o numero escolhido na lista
        console.log(listaDosNumerosSorteados);
        //mostra a lista
        return numeroEscolhido;
        //isso ira retornar apenas o resultado
    }
    //tranforma em numero inteiro, gera numero aleatorio entre 0 e 0,9
    //multiplica pelo número limite + 1 para completar o valor  
    //importante delimitar o return para que a informação seja exibida
    //se deve usar return em operações matematicas mas não em comandos simples  
}

//criar função e referenciar as tags como elementos da formula
function modificadorTexto (tag, texto) {
    let variavel = document.querySelector(tag);
    variavel.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
//chamar a função referenciando primeiro a tag que o texto será aplicado
//e o texto a seguir
modificadorTexto('h1', 'Jogo do número secreto');
modificadorTexto('p', `Escolha um número entre 1 e ${limite}`);
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
    //como vamos mudar apenas o conteudo dentro do input, selecionamos value e transformamos
    //numa string vazia
}

function vitorias(){
    let mensagemVitorias = document.getElementById('paragrafo2');//lembrar de não selecionar coisas sem sentido tipo desabilitar elementos ao copiar codigo
    mensagemNumeroVitorias = numeroVitorias > 1 ? 'vezes' : 'vez';
    mensagemVitorias.innerHTML = (`Você venceu ${numeroVitorias} ${mensagemNumeroVitorias}!`);
}

//função ta sendo chamada no html
function verificarChute() {
    let chute = document.querySelector('input').value; //isso pega o valor do ponto input
    if (chute == numeroSecreto) {
        modificadorTexto('h1', 'Parabens!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        //essa variavel é criada pois estamos colocando as palavras no html
        //e html pode não lidar tão bem com template string
        modificadorTexto('p', mensagemTentativas);   
        //uso da template string na tag <p>
        document.getElementById('reiniciar').removeAttribute('disabled');
        numeroVitorias++;
        vitorias();
    } else {
        if (chute < numeroSecreto) {
            modificadorTexto('h1', 'chute mais alto!');
        } else if (chute > numeroSecreto) {
            modificadorTexto('h1', 'chute mais baixo!');
        } 
        tentativas++; 
        limparCampo();
    }  
}


function novoJogo() {
    tentativas = 1;
    numeroSecreto = geradorNumeroAleatorio(limite);
    console.log(numeroSecreto);
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}

exibirMensagemInicial();







