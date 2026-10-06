const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src', 'app'), (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Scale down text sizes further
    content = content.replace(/text-5xl\s+md:text-6xl/g, 'text-4xl md:text-5xl');
    content = content.replace(/text-4xl\s+md:text-5xl/g, 'text-3xl md:text-4xl');
    content = content.replace(/text-3xl\s+md:text-4xl/g, 'text-2xl md:text-3xl');
    content = content.replace(/text-2xl\s+md:text-4xl/g, 'text-xl md:text-2xl');
    content = content.replace(/text-2xl\s+md:text-3xl/g, 'text-xl md:text-2xl');
    
    content = content.replace(/text-4xl\s+font-heading/g, 'text-3xl font-heading');
    content = content.replace(/text-3xl\s+font-heading/g, 'text-2xl font-heading');
    content = content.replace(/text-2xl\s+font-heading/g, 'text-xl font-heading');

    // Scale down vertical padding to reduce massive white spaces on 100% zoom
    content = content.replace(/py-32/g, 'py-20');
    content = content.replace(/py-24/g, 'py-16');
    content = content.replace(/py-20/g, 'py-12');

    // Make some hero text narrower so it doesn't span across the whole screen if it's too big
    content = content.replace(/max-w-4xl\s+mx-auto/g, 'max-w-3xl mx-auto');
    content = content.replace(/max-w-3xl\s+mx-auto/g, 'max-w-2xl mx-auto');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Scaled down:', filePath);
    }
  }
});
