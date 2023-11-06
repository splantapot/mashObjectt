function rng(ints) {
  ints *= Math.random()
  return Math.floor(ints)
}

function toRad(deg) {
  return deg*Math.PI/180
}

function toDeg(rad) {
  return Math.round(rad*180/Math.PI)
}