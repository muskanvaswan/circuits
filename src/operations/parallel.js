export default function parallel(l){
  l = l.map(parseFloat)
  var ans, nl = [], b;
  console.log(l);
  if (l.length == 2){
    ans = (l[0]*l[1])/ (l[0] + l[1]);
    return ans;
  }
  nl = l.slice(1, );
  b = parallel(nl);
  return (l[0]*b/ (l[0] + b));
}
