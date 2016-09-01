'use strict';

(function () {

    function createRipple(rect) {

        var ripple = document.createElement('span');

        ripple.classList.add('ripple');
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';

        return ripple;
    }

    function positionateRipple(ripple, top, left) {

        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        ripple.classList.add('show');
    }

    var getHalf = function getHalf(n) {
        return n / 2;
    };

    function btnsRipple(e) {

        if (!e.target.classList.contains('c-btn')) return false;

        var btn = e.target,
            rect = btn.getBoundingClientRect();

        var ripple = btn.querySelector('.ripple');

        if (!ripple) {

            ripple = createRipple(rect);
            btn.appendChild(ripple);
        }

        ripple.classList.remove('show');

        var left = e.pageX - rect.left - getHalf(ripple.offsetWidth) - document.body.scrollLeft,
            top = e.pageY - rect.top - getHalf(ripple.offsetHeight) - document.body.scrollTop;

        positionateRipple(ripple, top, left);

        return false;
    }

    document.addEventListener('click', btnsRipple, false);
})();