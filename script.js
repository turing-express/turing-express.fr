(function () {
    var clamp = function(v, min, max) {
        return v < min ? min : v > max ? max : v;
    }
    var w = window.innerWidth;
    var ribbon = document.querySelector('.loco .ribbon');
    var overflowing = function () {
        return ribbon.getBoundingClientRect().right > w;
    };
    let t = 200;
    var make = function () {
        var s = document.createElement('span');
        if (Math.random() > 0.5) {
            s.classList.add('zero');
            s.innerHTML = '0';
        } else {
            s.classList.add('one');
            s.innerHTML = '1';
        }
        return s;
    }
    var place = function(t) {
        setTimeout(function() {
            var el = make();
            ribbon.appendChild(el);
            setTimeout(() => {
                el.classList.add('show');
            }, 0);
            if (overflowing()) {
                ribbon.removeChild(el);
            } else {
                var nt = t;
                place(nt);
            }
        }, t);
    }
    place(t);
})();