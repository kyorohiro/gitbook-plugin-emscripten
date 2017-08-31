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
                  '<div> test'+
                  '</div>';
           }
        }
    }
};
