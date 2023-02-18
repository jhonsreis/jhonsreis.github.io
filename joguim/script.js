const jhonatec = document.getElementById('jhonatec');
const main = document.querySelector('main');
const message = document.getElementById('message');


const playPause = () => {

  if(message.style.display !== 'none'){
    message.style.display = 'none';
    for (const child of main.children) {
      child.style.animationPlayState = 'running';
    }
  } else{
    message.style.display = 'flex';
    for (const child of main.children) {
      child.style.animationPlayState = 'paused';
    }
  }
};

const moveJhonatec = (event) => {
  console.log(event.keyCode);
  switch (event.keyCode) {
    case 32:
      playPause();
      break;
    case 38:
    case 87:
      jhonatec.className = 'jump';
      break;
    case 40:
    case 83:
      jhonatec.className = 'down';
      break;
  }

};

const restoreJhonatec = (event) => {
  jhonatec.className = '';
}

const keyUpToDown = (event) => {
  if (event.keyCode === 40) {
    jhonatec.className = '';
  }
};
const monitore = () => {
  console.log('teste...', Date.now());
}

const createObjects = () => {
  const object = document.createElement('div');
  object.className = 'floor-object';
  main.appendChild(object);
  object.classList.add('move-object');

  const object2 = document.createElement('div');
  object2.className = 'float-object';
  main.appendChild(object2);
  object2.classList.add('move-object');
  object2.style.animationDelay = '1.4s';

  const object3 = document.createElement('div');
  object3.className = 'float-object-sm';
  main.appendChild(object3);
  object3.classList.add('move-object');
  object3.style.animationDelay = '.6s';

  setInterval(monitore, 500)
}

window.onload = () => {
  document.addEventListener('keydown', moveJhonatec);
  document.addEventListener('keyup', keyUpToDown);
  jhonatec.addEventListener('animationend', restoreJhonatec);
  createObjects();
};