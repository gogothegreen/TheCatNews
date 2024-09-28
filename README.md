# 🐱 **TheCatNews**

**TheCatNews** is a project that turns markdown into a stylish cat-themed webpage with sections and an image gallery. 🎨 It's built with Node.js, Express, and EJS, with a sprinkle of Markdown-it to handle markdown magic. For all your cat news and updates 🐾

## 🚀 **Features**
- Transforms markdown content into HTML ✨
- Cat image gallery! 🖼️
- Responsive design with Bootstrap 5 📱
- Markdown content is rendered via EJS templates
- Preview your work with Live Server in VS Code

## 🛠 **Tech Stack**
- **Node.js** - for the backend magic 🧙‍♂️
- **Express** - serving up cat-related content quickly 🚀
- **EJS** - templates that make the page dynamic 🎭
- **Markdown-it** - markdown parser that spits out HTML ⚙️
- **Bootstrap 5** - for that sleek, modern look 💅
- **Live Server** - live reloading for development 🔄

## 🗂 **Folder Structure**

```bash
TheCatNews/
│
├── content/               # where your markdown lives 📝
│   └── article.md         # main markdown file
│
├── public/                # static assets (css, images, etc.)
│   ├── images/            # your cat pics go here 🐈
│   └── output.html        # auto-generated html file
│
├── views/                 # ejs templates
│   └── index.ejs          # main template
│
├── app.js                 # main server file 🖥️
├── package.json           # dependencies and scripts
└── README.md              # you're here!
```

## 📦 **Setup Instructions**

### Prerequisites:
- **Node.js** installed on your machine 🖥️
- **VS Code** with **Live Server** installed 💻

### **How to Install & Run**:

1. **Clone this repo**:
   ```bash
   git clone https://github.com/your-username/TheCatNews.git
   ```
2. **Go to the project directory**:
   ```bash
   cd TheCatNews
   ```
3. **Install all dependencies**:
   ```bash
   npm install
   ```
4. **Add your markdown content** in `content/article.md` 📝
5. **Add images** to `public/images/` 🐱

6. **Run the project**:
   ```bash
   node app.js
   ```
   Navigate to `http://localhost:3000` to view your cat news site in all its glory! 🎉

7. **Want to preview in VS Code?**
   - Right-click on `public/output.html` in VS Code, and hit **"Open with Live Server"**. BOOM 💥 instant preview in your browser.

## 🛠 **Project Details**
- **Markdown File**: Write your markdown in `content/article.md`.
- **Images Folder**: Drop all your images in `public/images/` for them to show up in the gallery.
- **Styling**: Bootstrap 5 is already set up. Customize your styles in `public/css/` if you feel adventurous.

## 🌟 **Future Features**
- Add videos of your cats playing with yarn 🎥
- Flashy CSS animations to make the content pop ✨
- A backend to manage all your cat news dynamically.

## 📄 **License**
MIT License – feel free to steal, I mean fork!