const jhonatec = document.getElementById('jhonatec');

const moveJhonatec = (event) => {
  // console.log(event.keyCode);
  if (jhonatec.className === '') {
    switch (event.keyCode) {
      case 38:
      case 87:
      case 32:
        jhonatec.className = 'jump';
        break;
      case 40:
        jhonatec.className = 'down';
        break;
    }
  }
};

const restoreJhonatec = (event) => {
  // if (!isDown)
    jhonatec.className = '';
}

const keyUpToDown = (event) => {
  if(event.keyCode === 40){
    jhonatec.className = '';
  }
};

window.onload = () => {
  document.addEventListener('keydown', moveJhonatec);
  document.addEventListener('keyup', keyUpToDown);
  jhonatec.addEventListener('animationend', restoreJhonatec);
};