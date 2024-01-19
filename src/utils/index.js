export const setRem = function (n) {
    const e = n.document,
        t = e.documentElement,
        i = 375,
        d = i / 50,
        o = 'orientationchange' in n ? 'orientationchange' : 'resize',
        a = function () {
            let n = t.clientWidth || 320
            n > 375 && (n = 375), (t.style.fontSize = n / d + 'px')
        }
    e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener('DOMContentLoaded', a, !1))
    a()
}