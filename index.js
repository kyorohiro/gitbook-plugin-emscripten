module.exports = {
  website: {
    assets: "./assets",
    js: ["emscripten.js"],
    css: ["emscripten.css"],
  },
  blocks: {
      emscripten: {
        process: function(block) {
          return '<div class="spinner" id="spinner"></div>'
          +'<div class="emscripten" id="status">Downloading...</div>'
          +'<div class="emscripten">'
          +'  <progress value="0" max="100" id="progress" hidden=1></progress>'
          +'</div>'
          +'<div class="emscripten_border">'
          +'<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>'
          +block.kwargs.js+'</div>'
          +'<textarea id="output" rows="8"></textarea>'
          +'<script async type="text/javascript" src="' + block.kwargs.js+'"></script>';
         }
      }
  }
};
