/*
WHY ARE YOU HERE? THERE'S NOTHING TO SEE HERE, CALM DOWN...
(
  (
    x
  )=(
    (
      (
        -(
          b
        )
      )+-(
        sqrt(
          (
            (
              b
            )^(
              2
            )
          )-(
            (
              (
                4
              )*(
                a
              )
            )*(
              c
            )
          )
        )
      )
    )/(
      (
        2
      )*(
        a
      )
    )
  )
)
*/
let inited = false;
const t = x => Math.floor((x % 1e3) / 1e2);
const f = x => x < 10 ? '0'.concat(x.toString()) : x.toString();
const e = c => c <= 0 ? '00 days 00 hours 00 minutes 00 seconds' : `${f(Math.floor(c / 864e5))} days ${f(Math.floor((c % 864e5) / 36e5))} hours ${f(Math.floor((c % 36e5) / 6e4))} minutes ${f(Math.floor((c % 6e4) / 1e3))}.${t(c)} seconds`;
document.addEventListener('DOMContentLoaded', () => {
  if (!inited) {
    setInterval(() => {
      var nw = new Date().getTime();
      document.getElementById('agkek').innerHTML = e(nw - 1510646603813);
      document.getElementById('ftkek').innerHTML = e(1542182603813 - nw);
      document.getElementById('nwkek').innerHTML = `(${Math.floor(nw / 1e3)})`;
    }, 99);
    inited = true;
  }
});
