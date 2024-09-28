const express = require('express');
const path = require('path');
const fs = require('fs');
const markdownIt = require('markdown-it');
const md = new markdownIt();

const app = express();
const port = 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (images, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the main page
app.get('/', (req, res) => {
    // Read and convert Markdown file to HTML
    const markdownFile = fs.readFileSync(path.join(__dirname, 'content/content.md'), 'utf-8');
    const markdownContent = md.render(markdownFile);

    // Get image filenames from the images folder
    const imagesDir = path.join(__dirname, 'public/images');
    const images = fs.readdirSync(imagesDir).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

    // Render the HTML page using the EJS template
    res.render('index', { markdownContent, images });
});

// Start the server
app.listen(port, () => {
    console.log(`TheCatNews is running on http://localhost:${port}`);
});
