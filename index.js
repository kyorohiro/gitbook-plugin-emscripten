module.exports = {
  website: {
    assets: "./assets",
    js: ["emscripten.js"],
    css: ["emscripten.css"],
  },
  blocks: {
      emscripten: {
        process: function(block) {
          var ret = '<div class="spinner" id="spinner"></div>\r\n'
          +'<div class="emscripten" id="status">Downloading...</div>\r\n'
          +'<div class="emscripten">\r\n'
          +'  <progress value="0" max="100" id="progress" hidden=1></progress>\r\n'
          +'</div>\r\n'
          +'<div class="emscripten_border">\r\n'
          +'<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>\r\n'
          +block.kwargs.js+'</div>\r\n'
          +'<textarea id="output" rows="8"></textarea>\r\n'

          +'<script type="text/javascript">\r\n'
          +'      var statusElement = document.getElementById("status");\r\n'
          +'      var progressElement = document.getElementById("progress");\r\n'
          +'      var spinnerElement = document.getElementById("spinner");\r\n'
          +'      var Module = {\r\n'
          +'        preRun: [],\r\n'
          +'        postRun: [],\r\n'
          +'        print: (function() {\r\n'
          +'          var element = document.getElementById("output");\r\n'
          +'          if (element) element.value = ""; \r\n'
          +'          return function(text) {\r\n'
          +'            if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(" ");\r\n'
          +'            console.log(text);\r\n'
          +'            if (element) {\r\n'
          +'              element.value += text + "\\n";\r\n'
          +'              element.scrollTop = element.scrollHeight;\r\n'
          +'            }\r\n'
          +'          };\r\n'
          +'        })(),\r\n'
          +'        printErr: function(text) {\r\n'
          +'          if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(" ");\r\n'
          +'          if (0) { // XXX disabled for safety typeof dump == "function") {\r\n'
          +'            dump(text + "\\n"); \r\n'
          +'          } else {\r\n'
          +'            console.error(text);\r\n'
          +'          }\r\n'
          +'        },\r\n'
          +'        canvas: (function() {\r\n'
          +'          var canvas = document.getElementById("canvas");\r\n'
          +'          canvas.addEventListener("webglcontextlost", function(e) { alert("WebGL context lost. You will need to reload the page."); e.preventDefault(); }, false);\r\n'
          +'          return canvas;\r\n'
          +'        })(),\r\n'
          +'        setStatus: function(text) {\r\n'
          +'          if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: "" };\r\n'
          +'          if (text === Module.setStatus.text) return;\r\n'
          +'          var m = text.match(/([^(]+)\\((\\d+(\\.\\d+)?)\\/(\\d+)\\)/);\r\n'
          +'          var now = Date.now();\r\n'
          +'          if (m && now - Date.now() < 30) return; \r\n'
          +'          if (m) {\r\n'
          +'            text = m[1];\r\n'
          +'            progressElement.value = parseInt(m[2])*100;\r\n'
          +'            progressElement.max = parseInt(m[4])*100;\r\n'
          +'            progressElement.hidden = false;\r\n'
          +'            spinnerElement.hidden = false;\r\n'
          +'          } else {\r\n'
          +'            progressElement.value = null;\r\n'
          +'            progressElement.max = null;\r\n'
          +'            progressElement.hidden = true;\r\n'
          +'            if (!text) spinnerElement.style.display = "none";\r\n'
          +'          }\r\n'
          +'          statusElement.innerHTML = text;\r\n'
          +'        },\r\n'
          +'        totalDependencies: 0,\r\n'
          +'        monitorRunDependencies: function(left) {\r\n'
          +'          this.totalDependencies = Math.max(this.totalDependencies, left);\r\n'
          +'          Module.setStatus(left ? "Preparing... (" + (this.totalDependencies-left) + "/" + this.totalDependencies + ")" : "All downloads complete.");\r\n'
          +'        }\r\n'
          +'      };\r\n'
          +'      Module.setStatus("Downloading...");\r\n'
          +'      window.onerror = function(event) {\r\n'
          +'        Module.setStatus("Exception thrown, see JavaScript console");\r\n'
          +'        spinnerElement.style.display = "none";\r\n'
          +'        Module.setStatus = function(text) {\r\n'
          +'          if (text) Module.printErr("[post-exception status] " + text);\r\n'
          +'        };\r\n'
          +'      };\r\n'
          +'  </script>\r\n';
          if(block.kwargs.mem.toString().contains(".mem")) {
          ret += '<script>\r\n'
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
        } else {
          ret += '<script async type="text/javascript" src="' + block.kwargs.js+'"></script>';
        }

          return ret;
         }
      }
  }
};
