

function csvToObjs(csvString) {
  const lines = csvString.split(/\r\n|\n/);
  let [headings, ...entries] = lines;
  headings = headings.split(',');
  const objs = [];
  entries.map(entry=>{
      obj = entry.split(',');
      objs.push(Object.fromEntries(headings.map((head, i)=>[head, obj[i]])));
  })
  return objs;
}


module.exports.csvToObjs = csvToObjs;