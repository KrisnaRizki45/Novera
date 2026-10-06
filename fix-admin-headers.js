const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/app/admin');
files.forEach(file => {
  if (file.endsWith('page.tsx')) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('className="flex items-center justify-between"')) {
      content = content.replace(/className="flex items-center justify-between"/g, 'className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"');
      fs.writeFileSync(file, content);
      console.log('Fixed header in:', file);
    }
  }
});
