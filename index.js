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

          return '<div class="emscripten_border">'+block.kwargs.js+'</div>';
         }
      }
  }
};
