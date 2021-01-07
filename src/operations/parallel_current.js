export default function parallel_current(i, l, r){
  var v;
  v = i*r;
  var nl = l.map((x) =>  v/ x);
  return nl;
}
