export default function series_voltage(v, l, r){
  var i;
  i = v/r;
  var nl = l.map((x) =>  i* x);
  return nl;
}
