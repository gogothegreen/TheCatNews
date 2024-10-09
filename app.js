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

// Function to get the newest image from the 'public/images' folder
function getNewestImage() {
    const imageDir = path.join(__dirname, 'public/images');
    const files = fs.readdirSync(imageDir)
                    .map(file => ({
                        name: file,
                        time: fs.statSync(path.join(imageDir, file)).mtime.getTime()
                    }))
                    .sort((a, b) => b.time - a.time);
    
    return files.length > 0 ? `/images/${files[0].name}` : null;
}

app.get('/', (req, res) => {
    const imageUrl = getNewestImage();  // Get the newest image
    const markdownContent = fs.readFileSync('content/article.md', 'utf-8');
    const htmlContent = md.render(markdownContent);

    // Render index.ejs and pass imageUrl and content
    res.render('index', { content: htmlContent, imageUrl: imageUrl });
});

// Start the server
app.listen(port, () => {
    console.log(`TheCatNews is running on http://localhost:${port}`);
});
