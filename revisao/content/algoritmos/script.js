const case1 = [2, 5, 10, 1, 9, 3, 4, 7, 6, 8];
const case2 = [4, 5, 10, 1, 9, 2, 3, 7, 6, 8];
const case3 = [4, 5, 10, 1, 8, 2, 3, 7, 6, 9];

function renderizar() {
  const resposta = [];

  for (let i = 1; i <= 10; i += 1) {
    let step = '';
    for (let j = 1; j <= 10; j += 1) {
      const passoAnalisado = document.querySelector(`#passo-${j}`);
      if (Number(passoAnalisado.value) === i) {
        step += ` ${passoAnalisado.nextElementSibling.innerHTML} `;
      }
    }
    document.querySelector(`#sp-passo-${i}`).innerHTML = step;
    resposta.push(Number(document.querySelector(`#passo-${i}`).value));
  }

  document.getElementById('h4-resultado').style.display = 'block';
  const respString = resposta.toString();
  if (respString === case1.toString()
    || respString === case2.toString()
    || respString === case3.toString()) {
    document.getElementById('img-resultado').src = 'naruto-comendo.gif';
    document.querySelector('#mensagem-resultado').innerHTML = 'Pronto o miojim! Ficou feliz o Narutim! 🥰';
    document.querySelector('#sound-game-over').pause();
    document.querySelector('#sound-game-over').currentTime = 0;
    document.querySelector('#sound-winner').play();

  } else {
    document.getElementById('img-resultado').src = 'erro.gif';
    document.querySelector('#mensagem-resultado').innerHTML = 'Melhor tentar de novo! 😅';
    document.querySelector('#sound-winner').pause();
    document.querySelector('#sound-winner').currentTime = 0;
    document.querySelector('#sound-game-over').play();
  }

}

window.onload = () => {
  document.getElementById('btn-renderizar')
    .addEventListener('click', renderizar);
};