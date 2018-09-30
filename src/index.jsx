import React from 'react';
import ReactDOM from 'react-dom';
//import TriangularMenu from './components/TriangleMenu/Triangular_menu.jsx';
import App from './components/App.jsx';
import './style.scss';

ReactDOM.render(<App />, document.getElementById('root'));

//ACTIVAR ESTE SCRIPT CUANDO SE VAYA A COMPILAR
// (() => {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js');
//   }
// })();

/* if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('Serviceworker registrado con éxito', registration.scope);
      })
      .catch(err => console.log('registro de service worker fallido', err));
  });
} else console.log('sw no soprtado');
*/
