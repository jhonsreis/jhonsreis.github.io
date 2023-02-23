function renderizar(){
  const iframe = document.getElementById('iframe-resultado');
  const textarea = document.getElementById('textarea');
  try{
    iframe.srcdoc = textarea.value;
  } catch (error){
    console.log(error.message);
  }
}

window.onload = () => {
  document.getElementById('btn-renderizar')
    .addEventListener('click', renderizar);
};