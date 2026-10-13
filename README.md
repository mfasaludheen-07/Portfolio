# Personal Portfolio Website

A responsive, polished personal portfolio website crafted with pure **HTML5**, **CSS3**, and **Vanilla JavaScript (ES Modules)**.

Built around a modern visual system featuring an almost-black background, restrained purple and lavender ambient lighting, fluid typography, an interactive horizontal project showcase, a career & learning timeline, an abstract orbital hero visual, and a soft purple cursor glow.

---

## 📁 Project Directory Structure

```text
my portfolio/
├── index.html              # Main HTML markup, semantic landmarks & SEO
├── css/
│   └── styles.css          # Design system, CSS variables, layouts & responsive queries
├── js/
│   ├── config.js           # ⚙️ CENTRAL CONFIGURATION: Edit all your personal details here!
│   └── main.js             # Core logic: pinned scroll, modal dialog, cursor follower, canvas
├── assets/
│   ├── icons/              # Local SVG icons (GitHub, LinkedIn, HTML, CSS, JS, etc.)
│   └── projects/           # High-resolution landscape SVG project previews
└── README.md               # Beginner-friendly setup & customization guide
```

---

## 🚀 How to Start the Website Locally

This site requires **zero compilation, zero npm build steps, and zero databases**.

Because the scripts use native JavaScript modules (`import` / `export`), modern web browsers require files to be served via HTTP rather than opened as a direct `file:///` path.

Choose any of the simple options below:

### Option A: Using Node.js (Already available on most systems)

Run this command inside this project folder:

```bash
npx serve .
```

Then open the URL printed in the terminal (usually `http://localhost:3000`).

Alternatively, using Node's built-in static server (Node 18+):
```bash
node -e "const http=require('http'),fs=require('fs'),path=require('path');const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf'};http.createServer((req,res)=>{let f=path.join('.',req.url==='/'?'index.html':req.url.split('?')[0]);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('Not found');}else{res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'text/plain'});res.end(d);}});}).listen(8080,()=>console.log('Serving on http://localhost:8080'));"
```

### Option B: Using Python

If you have Python installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your web browser.

### Option C: Using VS Code "Live Server"

1. Open this folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **"Open with Live Server"**.

---

## ✏️ Where to Change Personal Details

All personal content is stored in **`js/config.js`**. You do **not** need to touch HTML or CSS to change your info.

Open `js/config.js` in any code or text editor:

```javascript
export const portfolioConfig = {
  personal: {
    name: "Alex Vance",               // Replace [YOUR_NAME] with your full name
    initials: "AV",                   // Replace [YOUR_INITIALS]
    role: "Cybersecurity Enthusiast & Web Developer",
    location: "San Francisco, CA",    // Or leave as "[YOUR_LOCATION]" to hide
    email: "alex@example.com",        // Replace [YOUR_EMAIL] with your real email
    intro: "I explore cybersecurity and build useful web experiences...",
    aboutHeading: "Building with curiosity, engineering with security in mind",
    aboutBio: "Your personalized summary..."
  },
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    instagram: "",                    // Optional: leave empty to hide
    resume: "assets/resume.pdf"       // Path to your local resume PDF or web link
  },
  // ...
};
```

> **Automatic Graceful Hiding**:
> If a field is left empty (`""`) or retains a bracketed placeholder like `"[YOUR_EMAIL]"`, `"[YOUR_GITHUB_URL]"`, or `"[LOCAL_RESUME_PDF_PATH]"`, the website automatically hides the corresponding button or icon. There are no broken links.

---

## 🖼️ How to Add Project Images & Links

In `js/config.js`, scroll to the `projects` array:

1. **Add or change thumbnail images**:
   - Place your screenshot or graphic into the `assets/projects/` directory (e.g. `assets/projects/my-app.png` or `.svg`).
   - Update the `image` property:
     ```javascript
     image: "assets/projects/my-app.png",
     imageAlt: "My application preview screenshot",
     ```
2. **Add Live Demo or Source Code buttons**:
   - Set the `liveUrl` and `sourceUrl` properties to your live deployment or GitHub repository:
     ```javascript
     liveUrl: "https://my-demo-site.com",
     sourceUrl: "https://github.com/yourname/project-repo",
     ```
   - When set, the card and detail dialog will automatically show the buttons. If left empty `""`, they remain hidden.

---

## 📄 How to Add a Resume PDF

1. Place your resume PDF in the `assets/` folder, for example as `assets/resume.pdf`.
2. In `js/config.js`, update the `social.resume` property:
   ```javascript
   resume: "assets/resume.pdf"
   ```
3. The floating desktop **"RESUME ↗"** link at the bottom-right and the mobile navigation link will automatically appear and link directly to your PDF file.

---

## 🎨 How to Change Colors & Design Tokens

All colors and styling tokens are defined at the top of **`css/styles.css`** using CSS custom properties:

```css
:root {
  --bg: #08070B;               /* Deep almost-black background */
  --surface: #100D15;          /* Card & container surface */
  --surface-card: #15121C;     /* Elevated component surface */
  --text-primary: #F3EFF8;     /* Clean off-white primary text */
  --text-secondary: #AAA3B5;   /* Subdued secondary text */
  --purple: #A46BEE;           /* Brand purple accent */
  --purple-hover: #9355E6;     /* Button hover state */
  --lavender: #C594F5;         /* Soft lavender accent & badges */
  --divider: rgba(255, 255, 255, 0.09); /* Thin separator lines */
}
```

Adjust any hex values here to change the palette site-wide.

---

## 🌐 How to Publish Static Files When Ready

Since this project consists of standard static files (`index.html`, `css/`, `js/`, `assets/`), you can host it for free on any modern static hosting service:

### GitHub Pages
1. Push this folder to a GitHub repository.
2. In your GitHub repository, go to **Settings** &rarr; **Pages**.
3. Under **Branch**, select `main` (root) and click **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Cloudflare Pages or Vercel / Netlify
1. Log into [Cloudflare Pages](https://pages.cloudflare.com/), [Vercel](https://vercel.com/), or [Netlify](https://netlify.com/).
2. Select **"Deploy static site"** or link your repository.
3. Leave build command empty and set publish directory to `./`.
4. Click **Deploy**.
