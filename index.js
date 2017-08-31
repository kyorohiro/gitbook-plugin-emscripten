module.exports = {
  website: {
    assets: "./assets",
    css: ["emscripten.css"]
  },
  blocks: {
      emscripten: {
        process: function(block) {
          var mod = "Module";
          var opt = "";
          if(block.kwargs.mod != undefined || block.kwargs.mod != "" || block.kwargs.mod != null) {
            mod = block.kwargs.mod;
            opt = block.kwargs.mod;
          }
          var ret = '<div class="spinner" id="spinner'+opt+'"></div>\r\n'
          +'<div class="emscripten" id="status'+opt+'">Downloading...</div>\r\n'
          +'<div class="emscripten">\r\n'
          +'  <progress value="0" max="100" id="progress'+opt+'" hidden=1></progress>\r\n'
          +'</div>\r\n'
          +'<div class="emscripten_border">\r\n'
          +'<canvas class="emscripten" id="canvas'+opt+'" oncontextmenu="event.preventDefault()"></canvas>\r\n'
          +block.kwargs.js+'</div>\r\n'
          +'<textarea id="output'+opt+'" rows="8"></textarea>\r\n'

          +'<script type="text/javascript">\r\n'
          +'      var statusElement = document.getElementById("status'+opt+'");\r\n'
          +'      var progressElement = document.getElementById("progress'+opt+'");\r\n'
          +'      var spinnerElement = document.getElementById("spinner'+opt+'");\r\n'
          +'      var '+mod+' = {\r\n'
          +'        preRun: [],\r\n'
          +'        postRun: [],\r\n'
          +'        print: (function() {\r\n'
          +'          var element = document.getElementById("output'+opt+'");\r\n'
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
          +'          var canvas = document.getElementById("canvas'+opt+'");\r\n'
          +'          canvas.addEventListener("webglcontextlost", function(e) { alert("WebGL context lost. You will need to reload the page."); e.preventDefault(); }, false);\r\n'
          +'          return canvas;\r\n'
          +'        })(),\r\n'
          +'        setStatus: function(text) {\r\n'
          +'          if (!'+mod+'.setStatus.last) '+mod+'.setStatus.last = { time: Date.now(), text: "" };\r\n'
          +'          if (text === '+mod+'.setStatus.text) return;\r\n'
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
          +'          '+mod+'.setStatus(left ? "Preparing... (" + (this.totalDependencies-left) + "/" + this.totalDependencies + ")" : "All downloads complete.");\r\n'
          +'        }\r\n'
          +'      };\r\n'
          +'      '+mod+'.setStatus("Downloading...");\r\n'
          +'      window.onerror = function(event) {\r\n'
          +'       '+mod+'.setStatus("Exception thrown, see JavaScript console");\r\n'
          +'        spinnerElement.style.display = "none";\r\n'
          +'        '+mod+'.setStatus = function(text) {\r\n'
          +'          if (text) '+mod+'.printErr("[post-exception status] " + text);\r\n'
          +'        };\r\n'
          +'      };\r\n'
          +'  </script>\r\n';
          if(block.kwargs.mem.includes(".mem")) {
          ret += '<script>\r\n'
          +'      (function() {\r\n'
          +'        var memoryInitializer = "'+block.kwargs.mem+'";\r\n'
          +'        if (typeof '+mod+'["locateFile"] === "function") {\r\n'
          +'          memoryInitializer = '+mod+'["locateFile"](memoryInitializer);\r\n'
          +'        } else if ('+mod+'["memoryInitializerPrefixURL"]) {\r\n'
          +'          memoryInitializer = '+mod+'["memoryInitializerPrefixURL"] + memoryInitializer;\r\n'
          +'        }\r\n'
          +'        var meminitXHR = '+mod+'["memoryInitializerRequest"] = new XMLHttpRequest();\r\n'
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
