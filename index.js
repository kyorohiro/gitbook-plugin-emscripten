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
          '<script type="text/javascript">'
          +'    var statusElement = document.getElementById("status");'
          +'    var progressElement = document.getElementById("progress");'
          +'    var spinnerElement = document.getElementById("spinner");'
          +'    var Module = {'
          +'      preRun: [],'
          +'      postRun: [],'
          +'      print: (function() {'
          +'        var element = document.getElementById("output");'
          +'        if (element) element.value = "";'
          +'        return function(text) {'
          +'          if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(" ");'
          +'          console.log(text);'
          +'          if (element) {'
          +'            element.value += text + "\n";'
          +'            element.scrollTop = element.scrollHeight;'
          +'          }'
          +'        };'
          +'      })(),'
          +'      printErr: function(text) {'
          +'        if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(" ");'
          +'        if (0) { // XXX disabled for safety typeof dump == "function") {'
          +'          dump(text + "\n"); '
          +'        } else {'
          +'          console.error(text);'
          +'        }'
          +'      },'
          +'      canvas: (function() {'
          +'        var canvas = document.getElementById("canvas");'
          +'        canvas.addEventListener("webglcontextlost", function(e) { alert('WebGL context lost. You will need to reload the page.'); e.preventDefault(); }, false);'
          +'        return canvas;'
          +'      })(),'
          +'      setStatus: function(text) {'
          +'        if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: "" };'
          +'        if (text === Module.setStatus.text) return;'
          +'        var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);'
          +'        var now = Date.now();'
          +'        if (m && now - Date.now() < 30) return; '
          +'        if (m) {'
          +'          text = m[1];'
          +'          progressElement.value = parseInt(m[2])*100;'
          +'          progressElement.max = parseInt(m[4])*100;'
          +'          progressElement.hidden = false;'
          +'          spinnerElement.hidden = false;'
          +'        } else {'
          +'          progressElement.value = null;'
          +'          progressElement.max = null;'
          +'          progressElement.hidden = true;'
          +'          if (!text) spinnerElement.style.display = 'none';'
          +'        }'
          +'        statusElement.innerHTML = text;'
          +'      },'
          +'      totalDependencies: 0,'
          +'      monitorRunDependencies: function(left) {'
          +'        this.totalDependencies = Math.max(this.totalDependencies, left);'
          +'        Module.setStatus(left ? "Preparing... (" + (this.totalDependencies-left) + "/" + this.totalDependencies + ")" : "All downloads complete.");'
          +'      }'
          +'    };'
          +'    Module.setStatus("Downloading...");'
          +'    window.onerror = function(event) {'
          +'      Module.setStatus("Exception thrown, see JavaScript console");'
          +'      spinnerElement.style.display = "none";'
          +'      Module.setStatus = function(text) {'
          +'        if (text) Module.printErr("[post-exception status] " + text);'
          +'      };'
          +'    };'
          +'</script>'
          +'<div class="emscripten_border">'
          +'<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>'
          +block.kwargs.js+'</div>'
          +'<textarea id="output" rows="8"></textarea>'
          +'<script async type="text/javascript" src="' + block.kwargs.js+'"></script>';
         }
      }
  }
};
