module.exports = {
    blocks: {
        emscripten: function(block) {
            return {
               url: block.kwargs.src
           };
        }
    }
};
