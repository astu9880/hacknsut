// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {

bpmdict = { 'YMCA': '120bpm', 'Where are you now': '230bpm', 'Chandelier': '100bpm', 'We will rock you': '160bpm' };

console.log('here');

$('#analyse').click(function () {
    // restart animation
    $('#beats').show();
    console.log($('#sel1').val());
    $('#text').html('Loading...');
    var s1 = document.getElementById('s1');
    var s2 = document.getElementById('s2');
    var beats = document.getElementById('beats');

    s1.style.webkitAnimation = 'none';
    s2.style.webkitAnimation = 'none';
    beats.style.webkitAnimation = 'none';

    setTimeout(function () {
        s1.style.webkitAnimation = '';
        s2.style.webkitAnimation = '';
        beats.style.webkitAnimation = '';
    }, 10);

    setTimeout(function () {
        $('#text').html(bpmdict[$('#sel1').val()]);
        bpm = bpmdict[$('#sel1').val()];
        bpm = bpm.substring(0, bpm.length - 3);
        bpm = Number(bpm);
        bpm = 60000 / bpm;
        bpm = Math.round(bpm);
        console.log(bpm);
        document.getElementById("beats").style.animationDuration = bpm.toString() + "ms";
    }, 3500);
});

// Credit: https://css-tricks.com/jquery-magicline-navigation
},{}]},{},[4])
//# sourceMappingURL=/dist/8016aafa83086c9861887d92ff9cddbf.map