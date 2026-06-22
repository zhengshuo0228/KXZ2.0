const fs = require('fs');
const fixFile = (p) => {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/\r\n/g, '\n');
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed:', p);
};
fixFile(process.argv[2]);
fixFile(process.argv[3]);
fixFile(process.argv[4]);
