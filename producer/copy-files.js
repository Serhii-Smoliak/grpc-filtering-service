const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src/data/users.json');
const destPath = path.join(__dirname, 'dist/data/users.json');

console.log('Source Path:', srcPath);
console.log('Destination Path:', destPath);

if (!fs.existsSync(srcPath)) {
    console.error('Source file does not exist');
    process.exit(1);
}

const destDir = path.dirname(destPath);
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(srcPath, destPath);
console.log('File copied successfully!');
