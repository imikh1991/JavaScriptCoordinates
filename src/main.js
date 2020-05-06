'use strict';

(function main() {
  const canvasElement = document.getElementById('canvas');
  const context = canvasElement.getContext('2d');
  const mouseClickLog = [];

  const bcs2ucs = (mouseX, mouseY) => {
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight / 2;
    return window.mapCoordinates(mouseX, mouseY, originX, originY);


  }
  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const mouseCoordinatesElement = document
      .getElementById('mouseCoordinates');

      const [x, y] = bcs2ucs(mouseX, mouseY);
    mouseCoordinatesElement.innerText = `(${mouseX}, ${mouseY} ) => (${x}, ${y})`;
    
  });

  const drawAxis = () => {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    context.beginPath();
    context.strokeStyle = 'blue';
    context.lineWidth = 0.6;
    context.moveTo(window.innerWidth / 2, 0);
    context.lineTo(window.innerWidth / 2, window.innerHeight);
    context.moveTo(0, window.innerHeight / 2);
    context.lineTo(window.innerWidth, window.innerHeight/ 2);
    context.stroke();
    context.closePath();
    };

  const renderClickLog = () => {
    let result = '';
    for (let i = 0; i < mouseClickLog.length; i++) {
      const click = mouseClickLog[i];
      //console.log(click.y);
      result += `<li> x = ${click.x}, y = ${click.y}, q = ${click.q}</li>`;
    }
    return result;
   };

    document.addEventListener('click', (event) => {
      const [x, y] = bcs2ucs(event.clientX, event.clientY);
      const q = window.quadrants(x,y);
      mouseClickLog.push({ x, y, q});
      document.getElementById('mouseClickLog').innerHTML = renderClickLog();


    });
    document.addEventListener('DOMContentLoaded', drawAxis);
    window.addEventListener('resize', drawAxis);

}());
