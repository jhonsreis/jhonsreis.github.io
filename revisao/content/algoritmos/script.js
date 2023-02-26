

function renderizar(){
  const passo1 = document.querySelector('#passo-1').value;
  const passo2 = document.querySelector('#passo-2').value;
  const passo3 = document.querySelector('#passo-3').value;
  const passo4 = document.querySelector('#passo-4').value;
  const passo5 = document.querySelector('#passo-5').value;
  const passo6 = document.querySelector('#passo-6').value;
  const passo7 = document.querySelector('#passo-7').value;
  const passo8 = document.querySelector('#passo-8').value;
  const passo9 = document.querySelector('#passo-9').value;
  const passo10 = document.querySelector('#passo-10').value;


  for(let i = 1; i <= 10; i += 1){
    let step = '';
    for(let j = 1; j <= 10; j += 1){
      const passoAnalisado = document.querySelector(`#passo-${j}`);
      if(Number(passoAnalisado.value) === i){
        step += ` ${passoAnalisado.nextElementSibling.innerHTML} `;
      }
    }
    document.querySelector(`#sp-passo-${i}`).innerHTML = step;
  }

  document.getElementById('h4-resultado').style.display = 'block';
  if(
    Number(passo1) === 2
      && Number(passo2) === 5
      && Number(passo3) === 10 
      && Number(passo4) === 1
      && Number(passo5) === 9
      && Number(passo6) === 3
      && Number(passo7) === 4
      && Number(passo8) === 7
      && Number(passo9) === 6
      && Number(passo10) === 8
  ){
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