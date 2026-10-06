const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetDir = path.join(__dirname, 'src', 'app', '(marketing)');

walkDir(targetDir, (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Fix Accordion wrapping container
    content = content.replace(/<Accordion className="w-full">/g, '<Accordion type="single" collapsible className="w-full space-y-3">');

    // Fix AccordionItem
    content = content.replace(/<AccordionItem key=\{i\} value=\{`item-\$\{i\}`\}>/g, '<AccordionItem key={i} value={`item-${i}`} className="bg-background border border-border/50 rounded-lg px-5 data-[state=open]:border-primary/40 data-[state=open]:shadow-sm transition-all shadow-sm">');
    
    // Fix AccordionTrigger
    content = content.replace(/<AccordionTrigger className="text-left font-semibold text-lg">\{faq\.q\}<\/AccordionTrigger>/g, '<AccordionTrigger className="text-left font-semibold text-[15px] hover:no-underline py-4">{faq.q}</AccordionTrigger>');
    
    // Fix AccordionContent
    content = content.replace(/<AccordionContent className="text-muted-foreground leading-relaxed text-base">/g, '<AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated FAQ in:', filePath);
    }
  }
});
