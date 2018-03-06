// Add Econda tracking; Econda library is included in server.js. Same is for initial setup of global emos3 object.

export function track() {
  window.emos3.send({
    content : document.location.href,
    siteid : 'tech-radar'
  });
}


