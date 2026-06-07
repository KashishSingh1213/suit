import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

// We need a temporary placeholder to avoid double-swapping
const tempMap = {
  '#111111': '__TEMP_BLACK__',
  '#FAF9F6': '__TEMP_IVORY__',
  '#1E1E1E': '__TEMP_DARK_GREY__',
  '#E8DDD0': '__TEMP_BEIGE__',
};

const finalMap = {
  '__TEMP_BLACK__': '#FAF9F6', // Old black bg -> New ivory bg
  '__TEMP_IVORY__': '#111111', // Old ivory text/bg -> New black text/bg
  '__TEMP_DARK_GREY__': '#E8DDD0', // Old dark element -> New beige element
  '__TEMP_BEIGE__': '#1E1E1E', // Old beige element -> New dark element
};

function flipTheme(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Step 1: Replace with temps
  for (const [oldColor, tempColor] of Object.entries(tempMap)) {
    const regex = new RegExp(oldColor, 'gi');
    content = content.replace(regex, tempColor);
  }
  
  // Step 2: Replace temps with new colors
  for (const [tempColor, newColor] of Object.entries(finalMap)) {
    const regex = new RegExp(tempColor, 'g');
    content = content.replace(regex, newColor);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Flipped theme in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      flipTheme(fullPath);
    }
  }
}

walkDir(SRC_DIR);
