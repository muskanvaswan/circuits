export default function parallel_current(i, l, r){
  v = i*r;
  var nl = l.map((x) => x * v);
  return v;
}
