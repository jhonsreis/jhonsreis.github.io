const jhonatec = document.getElementById('jhonatec');

const moveJhonatec = (event) => {
  console.log(event.keyCode);
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
};

const restoreJhonatec = (event) => {
  jhonatec.className = '';
}

window.onload = () => {
  document.addEventListener('keydown', moveJhonatec);
  jhonatec.addEventListener('animationend', restoreJhonatec);
};