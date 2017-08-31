module.exports = {
  website: {
    assets: "./assets",
    css: [
         "emscripten.css"
    ],
  },
  blocks: {
      emscripten: {
        process: function(block) {
          return
          '<div><div class="emscripten_border">'+
          '  <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>'+
          '</div>' +
          '</div>';
         }
      }
  }
};
