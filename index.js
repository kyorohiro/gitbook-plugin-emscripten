module.exports = {
    website: {
      assets: "./book",
      css: [
           "emscripten.css"
      ],
    },
    blocks: {
        emscripten: {
          process: function(block) {
            return
                  '<div class="emscripten_border">'+
                  '  <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>'+
                  '</div>' +
                  '<textarea id="output" rows="8"></textarea>' +
                  '<script async type="text/javascript" src="'+block.kwargs.js+'"></script>' +
                  '';
           }
        }
    }
};
