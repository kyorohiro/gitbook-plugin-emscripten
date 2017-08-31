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
          return "<div>xx "+block.body.trim()+"</div>";
         }
      }
  }
};
