const jhonatec = document.getElementById('jhonatec');
const main = document.querySelector('main');
const message = document.getElementById('mensagem');
const btnsMusic = document.querySelectorAll('.btn-music');
const spanPontos = document.getElementById('pontos');
const music = document.getElementById('music');
const jumpSound = document.getElementById('jump-sound')
const crashSound = document.getElementById('crash-sound');
const panelGameOver = document.getElementById('game-over');

let monitoreId, aceleraId, lintID;
let pontos = 0;
const initialHeight = '200px';
const crouchedHeight = '95px';
let minTime = 30, maxTime = 80, toMove = 20, targetTime = 0, timeCounter = 0;
let classGameOver = '';


const objClassesCore = ['floor-object', 'mid-float-object', 'floor-object', 'float-object'];
const objClassesImgSm = ['whatsapp', 'instagram', 'tiktok', 'youtube', 'no-signal'];
const objClassesImgBg = ['cama', 'storm', 'computer'];

const playPause = () => {
  if (panelGameOver.style.display !== 'none') {
    restartFromLint();
    panelGameOver.style.display = 'none';
    monitoreId = setInterval(moveObjects, 60);
    aceleraId = setInterval(acelera, 8000);
  } else if (message.style.display !== 'none') {
    message.style.display = 'none';
    monitoreId = setInterval(moveObjects, 60);
    aceleraId = setInterval(acelera, 8000);
  } else {
    message.style.display = 'flex';
    clearInterval(monitoreId);
    clearInterval(aceleraId);
    clearInterval(lintID);
  }
};

const jump = () => {
  jumpSound.play();
  jhonatec.className = 'jump';
  jhonatec.style.backgroundImage = 'url(\'images/jump.gif\')';
}

const crouch = () => {
  jhonatec.style.backgroundImage = 'url(\'images/crouched.gif\')';
  jhonatec.className = 'crouch';
  jhonatec.style.height = crouchedHeight;
}

const moveJhonatec = (event) => {
  switch (event.keyCode) {
    case 80:
      playPause();
      break;
    case 38:
    case 87:
      jump();
      break;
    case 40:
    case 83:
      crouch();
      break;
  }

};

const restoreJhonatec = (event) => {
  jhonatec.className = '';
  jhonatec.style.height = initialHeight;
  jhonatec.style.backgroundImage = 'url(\'images/caminhando.gif\')';
}

const releaseCrouchKey = (event) => {
  if (event.keyCode === 40 || event.keyCode === 83) {
    restoreJhonatec();
  }
};

const gameOver = () => {
  crashSound.play();
  newPontos = Math.floor(pontos / 4);
  if (localStorage.getItem('bestJumpJhonatec') !== null) {
    const bestPontosLS = JSON.parse(localStorage.getItem('bestJumpJhonatec'));
    if (newPontos > bestPontosLS) {
      localStorage.setItem('bestJumpJhonatec', JSON.stringify(newPontos));
    }
  } else {
    localStorage.setItem('bestJumpJhonatec', JSON.stringify(newPontos));
  }

  // Personalizar mensagem
  let mensagemPersonalizada;
  let classFinal;
  if (classGameOver.includes('whatsapp')) {
    mensagemPersonalizada = 'Mensagens da cremosinha foram difíceis de ignorar!';
    classFinal = 'whatsapp';
  } else if (classGameOver.includes('instagram')) {
    mensagemPersonalizada = 'Só meme top kkkkk!';
    classFinal = 'instagram';
  } else if (classGameOver.includes('tiktok')) {
    mensagemPersonalizada = 'Gravou dancinha demais por hoje!';
    classFinal = 'tiktok';
  } else if (classGameOver.includes('youtube')) {
    mensagemPersonalizada = 'Que vídeo foda que o canal lançou!';
    classFinal = 'youtube';
  } else if (classGameOver.includes('no-signal')) {
    mensagemPersonalizada = 'Sem rede na cidade!';
    classFinal = 'no-signal';
  } else if (classGameOver.includes('computer')) {
    mensagemPersonalizada = 'Pouca memória RAM para muita aba!';
    classFinal = 'computer';
  } else if (classGameOver.includes('cama')) {
    mensagemPersonalizada = 'Era pra ser só uma sonequinha...';
    classFinal = 'cama';
  } else if (classGameOver.includes('storm')) {
    mensagemPersonalizada = 'OLHA O RAIOOOOO!!!';
    classFinal = 'storm';
  }

  console.log(classGameOver);

  if (classGameOver == 'lint-object') {
    mensagemPersonalizada = 'Se está lutando contra o Lint, está pronto para aula!';
    // Disparar animação final
    jhonatec.style.display = 'none';
    const jhonatecFinale = document.createElement('div');
    jhonatecFinale.id = 'jhonatec-finale';
    const computerFinale = document.createElement('div');
    computerFinale.id = 'finale-computer';
    main.appendChild(jhonatecFinale);
    main.appendChild(computerFinale);
    // Personalizar PAnelGameOver
    document.getElementById('game-over-title').innerHTML = 'PARABÉNS!!!';
    document.getElementById('game-over-img').style.display = 'none';
    classFinal = 'nada';
    main.removeChild(document.getElementById('lint-object'));
    panelGameOver.style.height = "400px";
  }
  else {
    document.getElementById('game-over-title').innerHTML = 'GAME OVER!!!';
    document.getElementById('game-over-img').style.display = 'inline';
    panelGameOver.style.height = "700px";
  }

  document.getElementById('game-over-obj').classList.add(classFinal);
  document.getElementById('game-over-msg').innerHTML = mensagemPersonalizada;
  document.getElementById('game-over-points').innerHTML = `Você conseguiu ${newPontos} pontos!`;
  panelGameOver.style.display = 'flex';

  restart();
};

// ################################################################################
// ################################################################################
// ################################################################################
const generateRandomNum = (maxValue) => Math.floor(Math.random() * maxValue);

const generateObjects = () => {
  const object = document.createElement('div');
  object.classList.add('obj');
  const classToObj = objClassesCore[generateRandomNum(objClassesCore.length)];
  object.classList.add(classToObj);

  // Sortear classe personalizada
  let personalizada = '';
  if (classToObj === 'float-object') {
    personalizada = objClassesImgBg[generateRandomNum(objClassesImgBg.length)];
  } else {
    personalizada = objClassesImgSm[generateRandomNum(objClassesImgSm.length)];
  }
  object.classList.add(personalizada);

  main.appendChild(object);



  if (classToObj === 'float-object') {
    targetTime = maxTime + 2;
  } else {
    targetTime = generateRandomNum(maxTime) + generateRandomNum(maxTime - 2);
  }

  if (Math.floor(pontos / 4) > 1000) {
    addLint();
  }
};

// chamar automaticamente a cada x tempo no SetInterval
const moveObjects = () => {
  const allObjects = document.getElementsByClassName('obj');
  for (const obj of allObjects) {
    const position = parseInt(window.getComputedStyle(obj).right);
    if (position > window.innerWidth) {
      main.removeChild(obj);
    } else {
      const newPosition = position + toMove;
      obj.style.right = `${newPosition}px`;

      // Testar batida
      const marginBottomJhonatec = parseInt(window.getComputedStyle(jhonatec).marginBottom);
      if (obj.classList.contains('floor-object')) {
        if (newPosition > (window.innerWidth - 100) && newPosition < (window.innerWidth - 20)) {
          if (marginBottomJhonatec <= 60) {
            classGameOver = obj.className;
            gameOver();
          }
        }
      } else if (obj.classList.contains('float-object')) {
        if (newPosition >= (window.innerWidth - 170) && newPosition < (window.innerWidth - 20)) {
          if (jhonatec.className !== 'crouch') {
            classGameOver = obj.className;
            gameOver();
          }
        }
      } else if (obj.classList.contains('mid-float-object')) {
        if (newPosition >= (window.innerWidth - 100) && newPosition < (window.innerWidth - 20)) {
          if (jhonatec.className !== 'crouch' && marginBottomJhonatec <= 60) {
            classGameOver = obj.className;
            gameOver();
          }
        }
      }
    }
  }

  timeCounter += 1;
  pontos += 1;
  spanPontos.innerHTML = Math.floor(pontos / 4);

  if (timeCounter > targetTime) {
    generateObjects();
    timeCounter = 0;
  }

};

// ################################################################################
// ################################################################################
// ################################################################################
const playMusic = (event) => {

  if (event.target.classList.contains('button-visited')) {
    music.pause();
    for (const btn of btnsMusic) {
      btn.classList.remove('button-visited');
    }
  }
  else {
    music.play();
    for (const btn of btnsMusic) {
      btn.classList.add('button-visited');
    }
  }
};

const loadBestPontos = () => {
  if (localStorage.getItem('bestJumpJhonatec') !== null) {
    const bestPontos = document.getElementById('best');
    bestPontos.innerHTML = localStorage.getItem('bestJumpJhonatec');
  }
};

const acelera = () => {
  if (maxTime > 20) {
    maxTime -= 2;
    toMove += 1;
  }
};

const addLint = () => {
  const linter = document.createElement('div');
  linter.id = 'lint-object';
  linter.classList.add('lint-final');
  const h3 = document.createElement('h3');
  h3.innerHTML = 'PESADELO LINT';
  linter.appendChild(h3);
  main.appendChild(linter);
  // Parar fluxo do jogo
  clearInterval(acelera);
  targetTime = 1000;

  lintID = setInterval(moveLint, 100);
}

const moveLint = () => {
  if (document.querySelectorAll('.obj').length === 0) {
    const linter = document.getElementById('lint-object');
    let newPos = parseInt(window.getComputedStyle(linter).right) + 10;
    linter.style.right = `${newPos}px`;
    // Provocar um gamer over com finale
    if (newPos > window.innerWidth - 400) {
      classGameOver = 'lint-object';
      clearInterval(lintID);
      gameOver();
    }
  }
}

function restart() {
  clearInterval(aceleraId);
  clearInterval(monitoreId);
  clearInterval(lintID);
  loadBestPontos();
  pontos = 0;
  minTime = 30;
  maxTime = 80;
  toMove = 20;
  targetTime = 50;
  
  const objs = document.querySelectorAll('.obj');
  for (const obj of objs) {
    main.removeChild(obj);
  }

  const lintObject = document.getElementById('lint-object');
  if (lintObject !== null)
    main.removeChild(lintObject);

}

function restartFromLint(){
  restart();
  jhonatec.style.display = 'block';
  document.getElementById('game-over-obj').className = '';
    // Remover finales
  const jhonatecFinale = document.getElementById('jhonatec-finale');
  if (jhonatecFinale !== null)
    main.removeChild(jhonatecFinale);

  const computerFinale = document.getElementById('finale-computer');
  if (computerFinale !== null)
    main.removeChild(computerFinale);
}

window.onload = () => {
  document.addEventListener('keydown', moveJhonatec);
  document.addEventListener('keyup', releaseCrouchKey);
  jhonatec.addEventListener('animationend', restoreJhonatec);
  for (const btn of btnsMusic) {
    btn.addEventListener('click', playMusic);
  }
  restart();
  document.getElementById('btn-final').addEventListener('click', addLint);
};