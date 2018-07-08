// https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
const getPropSafely = (p, o) => p.reduce((xs, x) => {
  if (xs && xs[x]) {
    return xs[x]
  }

  return null
}, o)

const makeSafeErrorObject = message => ({
  isError: true,
  message,
})

module.exports = {
  getPropSafely,
  makeSafeErrorObject,
}
