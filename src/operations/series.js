export default function series(l){
  l = l.map(parseFloat);
  return l.reduce((a, b) => a + b, 0);
}
