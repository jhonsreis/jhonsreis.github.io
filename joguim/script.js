const jhonatec = document.getElementById('jhonatec');
const main = document.querySelector('main');
const message = document.getElementById('mensagem');
const btnsMusic = document.querySelectorAll('.btn-music');
const spanPontos = document.getElementById('pontos');
const music = document.getElementById('music');
const jumpSound = document.getElementById('jump-sound')
const crashSound = document.getElementById('crash-sound');
const titleGameOver = document.getElementById('game-over');

let monitoreId;
let pontos = 0;
const initialHeight = '200px';
const crouchedHeight = '95px';
let minTime = 30, maxTime = 80, toMove = 25, targetTime = 0, timeCounter = 0;

const objClassesCore = ['floor-object', 'mid-float-object', 'floor-object', 'float-object'];
const objClassesImgSm = ['whatsapp', 'instagram', 'tiktok', 'youtube', 'no-signal'];
const objClassesImgBg = ['cama', 'storm', 'computer'];

const playPause = () => {
  if (message.style.display !== 'none') {
    message.style.display = 'none';
    titleGameOver.style.display = 'none';
    generateObjects();
    monitoreId = setInterval(moveObjects, 50);
  } else {
    message.style.display = 'flex';
    clearInterval(monitoreId);
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

  titleGameOver.style.display = 'block';
  const objs = document.querySelectorAll('.obj');
  for (const obj of objs) {
    main.removeChild(obj);
  }
  pontos = 0;
  playPause();
  loadBestPontos();
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
    targetTime = maxTime;
  } else {
    targetTime = generateRandomNum(maxTime) + minTime * 2;
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
            gameOver();
          }
        }
      } else if (obj.classList.contains('float-object')) {
        if (newPosition >= (window.innerWidth - 170) && newPosition < (window.innerWidth - 20)) {
          if (jhonatec.className !== 'crouch') {
            gameOver();
          }
        }
      } else if (obj.classList.contains('mid-float-object')) {
        if (newPosition >= (window.innerWidth - 100) && newPosition < (window.innerWidth - 20)) {
          if (jhonatec.className !== 'crouch' && marginBottomJhonatec <= 60) {
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
};