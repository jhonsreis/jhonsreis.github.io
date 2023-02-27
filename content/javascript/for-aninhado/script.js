let editor;

require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: ['for (let i = 0; i < 10; i+= 1) {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'javascript',
    theme: "vs-dark",
    fontSize: "16px",
    
  });
});

function renderizar(){
  const iframe = document.getElementById('iframe-resultado');
  const textarea = document.getElementById('textarea');
  try {
    const textoEditor = editor.getValue();

    let comando = `<div id="debugDiv"></div> `;
    comando += ` <script> `;
    comando += ` \n window.onerror = function (e) {
      console.log('Error: ', e);
    };  \n\n
    if (typeof console != "undefined")
    if (typeof console.log != 'undefined')
    console.olog = console.log;
    else
    console.olog = function () { };
    
    console.log = function (...message) {
      console.olog(message);
      const paragrafo = document.createElement('p');
      paragrafo.innerHTML = message;
      document.getElementById('debugDiv').appendChild(paragrafo);
    };
    console.error = console.debug = console.info = console.log;`
    comando += `\n
    try{ 
      ${textoEditor} \n
   
    }catch(error){
      console.log(error.message);
    }`;
    comando += ` </script>`;
    iframe.srcdoc = comando;
    
  } catch (error) {
    console.log(error.message);
  }
}

window.onload = () => {
  document.getElementById('btn-renderizar')
    .addEventListener('click', renderizar);
};