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

const objClasses = ['floor-object', 'mid-float-object', 'floor-object', 'float-object']

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
  jhonatec.style.backgroundImage = 'url(\'images/down.gif\')';
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

}

// const monitore = () => {
//   pontos += 1;
//   spanPontos.innerHTML = pontos;

//   const marginBottomJhonatec = parseInt(window.getComputedStyle(jhonatec).marginBottom);

//   const floorObject = document.querySelector('.floor-object');
//   const leftFloorObject = parseInt(window.getComputedStyle(floorObject).left);

//   const floatObject = document.querySelector('.float-object');
//   const leftFloatObject = parseInt(window.getComputedStyle(floatObject).left);

//   const floatObjectSM = document.querySelector('.float-object-sm');
//   const leftFloatObjectSM = parseInt(window.getComputedStyle(floatObjectSM).left);

//   if (leftFloorObject > 70 && leftFloorObject < 200) {
//     if (marginBottomJhonatec <= 80) {
//       gameOver();
//     }
//   }
//   if (leftFloatObject > 0 && leftFloatObject < 200) {
//     if (jhonatec.className !== 'crouch') {
//       gameOver();
//     }
//   }
//   if (leftFloatObjectSM > 70 && leftFloatObjectSM < 200) {
//     if (jhonatec.className !== 'crouch' && marginBottomJhonatec <= 150) {
//       gameOver();
//     }
//   }

// }

// const createObjects = () => {
//   const object = document.createElement('div');
//   object.className = 'floor-object obj';
//   main.appendChild(object);
//   object.classList.add('move-object');

//   const object2 = document.createElement('div');
//   object2.className = 'float-object obj';
//   main.appendChild(object2);
//   object2.classList.add('move-object');
//   object2.style.animationDelay = '2.4s';

//   const object3 = document.createElement('div');
//   object3.className = 'float-object-sm obj';
//   main.appendChild(object3);
//   object3.classList.add('move-object');
//   object3.style.animationDelay = '1s';

//   for (const child of main.children) {
//     child.style.animationPlayState = 'paused';
//   }

// }
// ################################################################################
// ################################################################################
// ################################################################################
const generateRandomNum = (maxValue) => Math.floor(Math.random() * maxValue);

const generateObjects = () => {
  const object = document.createElement('div');
  object.classList.add('obj');
  const classToObj = objClasses[generateRandomNum(objClasses.length)];
  object.classList.add(classToObj);
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
};