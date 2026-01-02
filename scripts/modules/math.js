function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

function getAngle(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const radians = Math.atan2(dy, dx);
  return radians;
}

function getRandomNumber(min, max = null) {
  if (max === null) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

function round(number, precision=0) {
  return Math.round(number * 10 ** precision) / 10 ** precision;
}

export default {
  getDistance,
  getAngle,
  getRandomNumber,
  round,
};