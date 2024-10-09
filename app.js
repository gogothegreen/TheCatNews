const express = require('express');
const path = require('path');
const fs = require('fs');
const markdownIt = require('markdown-it');
const md = new markdownIt({
    html: true,  // Allow HTML
    linkify: true // Automatically convert URLs to clickable links
});

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
        .filter(file => ['.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file.name).toLowerCase()))
        .sort((a, b) => b.time - a.time);

    return files.length > 0 ? `/images/${files[0].name}` : null;
}

// Updated function to get an image for a section
function getImageForSection(section) {
    const sectionDirName = section.toLowerCase().replace(/\s+/g, '_'); // e.g., Cats and People -> cats_and_people
    const imageDir = path.join(__dirname, 'public', 'images', sectionDirName); // Ensure it's under public/images
    
    console.log(`Looking for images in folder: ${imageDir}`);

    if (!fs.existsSync(imageDir)) {
        console.log(`Directory does not exist for section: ${section}`);
        return null;
    }

    const files = fs.readdirSync(imageDir)
        .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file));

    console.log(`Files found in folder for section (${section}):`, files);

    if (files.length > 0) {
        // Return a path relative to the 'public' folder, which Express serves statically
        return `/images/${sectionDirName}/${files[0]}`;
    } else {
        console.log(`No images found in section: ${section}`);
        return null;
    }
}

// Process the markdown and associate images with sections
function processMarkdown(markdownContent) {
    const sections = [];
    const lines = markdownContent.split('\n');
    let currentSection = null;

    lines.forEach(line => {
        const headingMatch = line.match(/^#+\s(.+)$/); // Match markdown headings
        if (headingMatch) {
            if (currentSection) {
                sections.push(currentSection);  // Push the previous section before starting a new one
            }
            const heading = headingMatch[1];
            const imagePath = getImageForSection(heading);
            currentSection = {
                heading,
                text: '',
                imagePath
            };
        } else if (currentSection) {
            currentSection.text += line + '\n';  // Add content to the current section
        }
    });

    // Push the last section after processing all lines
    if (currentSection) {
        sections.push(currentSection);
    }

    // Convert the markdown text into HTML using markdown-it for each section
    sections.forEach(section => {
        section.text = md.render(section.text);
    });

    return sections;
}

app.get('/', (req, res) => {
    const imageUrl = getNewestImage();  // Get the newest image
    const markdownContent = fs.readFileSync('content/article.md', 'utf-8');
    const sections = processMarkdown(markdownContent);
    res.render('index', { sections, imageUrl });
});

// Start the server
app.listen(port, () => {
    console.log(`TheCatNews is running on http://localhost:${port}`);
});
