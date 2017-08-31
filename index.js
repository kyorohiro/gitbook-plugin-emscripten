module.exports = {
    blocks: {
        emscripten: {
          process: function(block) {
            return "<div>xx "+block.body.trim()+"</div>";
           }
        }
    }
};
