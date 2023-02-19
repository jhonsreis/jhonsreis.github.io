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

const playPause = () => {
  if (message.style.display !== 'none') {
    message.style.display = 'none';
    titleGameOver.style.display = 'none';
    monitoreId = setInterval(monitore, 50);
    for (const child of main.children) {
      child.style.animationPlayState = 'running';
    }
  } else {
    message.style.display = 'flex';
    clearInterval(monitoreId);
    for (const child of main.children) {
      child.style.animationPlayState = 'paused';
    }
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
  console.log(event.keyCode);
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
  if (localStorage.getItem('bestJumpJhonatec') !== null) {
    const bestPontosLS = JSON.parse(localStorage.getItem('bestJumpJhonatec'));
    if (pontos > bestPontosLS) {
      localStorage.setItem('bestJumpJhonatec', JSON.stringify(pontos));
    }
  } else {
    localStorage.setItem('bestJumpJhonatec', JSON.stringify(pontos));
  }

  titleGameOver.style.display = 'block';
  const objs = document.querySelectorAll('.obj');
  for (const obj of objs) {
    main.removeChild(obj);
  }
  pontos = 0;
  playPause();
  createObjects();
  loadBestPontos();

}

const monitore = () => {
  pontos += 1;
  spanPontos.innerHTML = pontos;

  const marginBottomJhonatec = parseInt(window.getComputedStyle(jhonatec).marginBottom);

  const floorObject = document.querySelector('.floor-object');
  const leftFloorObject = parseInt(window.getComputedStyle(floorObject).left);

  const floatObject = document.querySelector('.float-object');
  const leftFloatObject = parseInt(window.getComputedStyle(floatObject).left);

  const floatObjectSM = document.querySelector('.float-object-sm');
  const leftFloatObjectSM = parseInt(window.getComputedStyle(floatObjectSM).left);

  if (leftFloorObject > 70 && leftFloorObject < 200) {
    if (marginBottomJhonatec <= 80) {
      gameOver();
    }
  }
  if (leftFloatObject > 0 && leftFloatObject < 200) {
    if (jhonatec.className !== 'crouch') {
      gameOver();
    }
  }
  if (leftFloatObjectSM > 70 && leftFloatObjectSM < 200) {
    if (jhonatec.className !== 'crouch' && marginBottomJhonatec <= 150) {
      gameOver();
    }
  }

}

const createObjects = () => {
  const object = document.createElement('div');
  object.className = 'floor-object obj';
  main.appendChild(object);
  object.classList.add('move-object');

  const object2 = document.createElement('div');
  object2.className = 'float-object obj';
  main.appendChild(object2);
  object2.classList.add('move-object');
  object2.style.animationDelay = '2.4s';

  const object3 = document.createElement('div');
  object3.className = 'float-object-sm obj';
  main.appendChild(object3);
  object3.classList.add('move-object');
  object3.style.animationDelay = '1s';

  for (const child of main.children) {
    child.style.animationPlayState = 'paused';
  }



}

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
  createObjects();
};