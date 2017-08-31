module.exports = {
  website: {
    assets: "./assets",
    js: ["emscripten.js"],
    css: ["emscripten.css"],
  },
  blocks: {
      emscripten: {
        process: function(block) {
          return '<div class="spinner" id="spinner"></div>\r\n'
          +'<div class="emscripten" id="status">Downloading...</div>\r\n'
          +'<div class="emscripten">\r\n'
          +'  <progress value="0" max="100" id="progress" hidden=1></progress>\r\n'
          +'</div>\r\n'
          +'<div class="emscripten_border">\r\n'
          +'<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>\r\n'
          +block.kwargs.js+'</div>\r\n'
          +'<textarea id="output" rows="8"></textarea>\r\n'
          +'<script>\r\n'
          +'      (function() {\r\n'
          +'        var memoryInitializer = "'+block.kwargs.mem+'";\r\n'
          +'        if (typeof Module["locateFile"] === "function") {\r\n'
          +'          memoryInitializer = Module["locateFile"](memoryInitializer);\r\n'
          +'        } else if (Module["memoryInitializerPrefixURL"]) {\r\n'
          +'          memoryInitializer = Module["memoryInitializerPrefixURL"] + memoryInitializer;\r\n'
          +'        }\r\n'
          +'        var meminitXHR = Module["memoryInitializerRequest"] = new XMLHttpRequest();\r\n'
          +'        meminitXHR.open("GET", memoryInitializer, true);\r\n'
          +'        meminitXHR.responseType = "arraybuffer";\r\n'
          +'        meminitXHR.send(null);\r\n'
          +'      })();\r\n'
          +'      var script = document.createElement("script");\r\n'
          +'      script.src = "'+block.kwargs.js+'";\r\n'
          +'      document.body.appendChild(script);\r\n'
          +'\r\n'
          +'</script>\r\n';
          /*
          return '<div class="spinner" id="spinner"></div>'
          +'<div class="emscripten" id="status">Downloading...</div>'
          +'<div class="emscripten">'
          +'  <progress value="0" max="100" id="progress" hidden=1></progress>'
          +'</div>'
          +'<div class="emscripten_border">'
          +'<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>'
          +block.kwargs.js+'</div>'
          +'<textarea id="output" rows="8"></textarea>'
          +'<script async type="text/javascript" src="' + block.kwargs.js+'"></script>';*/
         }
      }
  }
};
