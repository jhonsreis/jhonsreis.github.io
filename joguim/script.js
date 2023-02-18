const jhonatec = document.getElementById('jhonatec');
const main = document.querySelector('main');
const message = document.getElementById('message');
let monitoreId;


const playPause = () => {

  if (message.style.display !== 'none') {
    message.style.display = 'none';
    monitoreId = setInterval(monitore, 100);
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
  const objects = main.children;
  const marginBottomJhonatec = parseInt(window.getComputedStyle(jhonatec).marginBottom);


  const floorObject = document.querySelector('.floor-object');
  const leftFloorObject = parseInt(window.getComputedStyle(floorObject).left);
  console.log('jhonatec', marginBottomJhonatec, 'obj', leftFloorObject);

  if (marginBottomJhonatec <= 80 && (leftFloorObject > 70 && leftFloorObject < 240)) {
    playPause();
  }

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
  object2.style.animationDelay = '2.4s';

  const object3 = document.createElement('div');
  object3.className = 'float-object-sm';
  main.appendChild(object3);
  object3.classList.add('move-object');
  object3.style.animationDelay = '1s';

  for (const child of main.children) {
    child.style.animationPlayState = 'paused';
  }

  
}

window.onload = () => {
  document.addEventListener('keydown', moveJhonatec);
  document.addEventListener('keyup', keyUpToDown);
  jhonatec.addEventListener('animationend', restoreJhonatec);
  createObjects();
};