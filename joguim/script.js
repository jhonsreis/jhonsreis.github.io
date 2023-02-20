const jhonatec = document.getElementById('jhonatec');
const main = document.querySelector('main');
const message = document.getElementById('mensagem');
const btnsMusic = document.querySelectorAll('.btn-music');
const spanPontos = document.getElementById('pontos');
const music = document.getElementById('music');
const jumpSound = document.getElementById('jump-sound')
const crashSound = document.getElementById('crash-sound');
const panelGameOver = document.getElementById('game-over');

let monitoreId, aceleraId;
let pontos = 0;
const initialHeight = '200px';
const crouchedHeight = '95px';
let minTime = 30, maxTime = 80, toMove = 20, targetTime = 80, timeCounter = 0;
let classGameOver = '';


const objClassesCore = ['floor-object', 'mid-float-object', 'floor-object', 'float-object'];
const objClassesImgSm = ['whatsapp', 'instagram', 'tiktok', 'youtube', 'no-signal'];
const objClassesImgBg = ['cama', 'storm', 'computer'];

const playPause = () => {
  if (message.style.display !== 'none' || panelGameOver.style.display !== 'none') {
    message.style.display = 'none';
    panelGameOver.style.display = 'none';
    // if (document.querySelectorAll('.obj').length === 0)
    //   generateObjects();
    monitoreId = setInterval(moveObjects, 60);
    aceleraId = setInterval(acelera, 8000);
  } else {
    message.style.display = 'flex';
    clearInterval(monitoreId);
    clearInterval(aceleraId);
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
  clearInterval(monitoreId);
  clearInterval(aceleraId);
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
  if(classGameOver.includes('whatsapp')){
    mensagemPersonalizada = 'Mensagens da cremosinha foram difíceis de ignorar!';
    classFinal = 'whatsapp';
  } else if(classGameOver.includes('instagram')){
    mensagemPersonalizada = 'Só meme top kkkkk!';
    classFinal = 'instagram';
  }else if(classGameOver.includes('tiktok')){
    mensagemPersonalizada = 'Gravou dancinha demais por hoje!';
    classFinal = 'tiktok';
  }else if(classGameOver.includes('youtube')){
    mensagemPersonalizada = 'Que vídeo foda que o canal lançou!';
    classFinal = 'youtube';
  }else if(classGameOver.includes('no-signal')){
    mensagemPersonalizada = 'Sem rede na cidade!';
    classFinal = 'no-signal';
  }else if(classGameOver.includes('computer')){
    mensagemPersonalizada = 'Pouca memória RAM para muita aba!';
    classFinal = 'computer';
  }else if(classGameOver.includes('cama')){
    mensagemPersonalizada = 'Era pra ser só uma sonequinha...';
    classFinal = 'cama';
  }else if(classGameOver.includes('storm')){
    mensagemPersonalizada = 'OLHA O RAIOOOOO!!!';
    classFinal = 'storm';
  }

  document.getElementById('game-over-obj').classList.add(classFinal);
  document.getElementById('game-over-msg').innerHTML = mensagemPersonalizada;
  document.getElementById('game-over-points').innerHTML = `Você conseguiu ${newPontos} pontos!`;
  panelGameOver.style.display = 'flex';


  const objs = document.querySelectorAll('.obj');
  for (const obj of objs) {
    main.removeChild(obj);
  }
  pontos = 0;

  loadBestPontos();

  minTime = 30;
  maxTime = 80;
  toMove = 20;
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
  console.log(maxTime, minTime, toMove);
  if (maxTime > 20) {
    maxTime -= 2;
    toMove += 1;
  }
};


window.onload = () => {
  document.addEventListener('keydown', moveJhonatec);
  document.addEventListener('keyup', releaseCrouchKey);
  jhonatec.addEventListener('animationend', restoreJhonatec);
  for (const btn of btnsMusic) {
    btn.addEventListener('click', playMusic);
  }
  loadBestPontos();
  // createObjects();
  minTime = 30;
  maxTime = 80;
  toMove = 20;
};