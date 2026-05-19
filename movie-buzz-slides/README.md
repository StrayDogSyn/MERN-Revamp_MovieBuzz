# Movie Buzz MERN Stack - Slidev Presentation

A professional 16-slide presentation showing the progressive curriculum of the Movie Buzz MERN stack project, styled with Netflix-inspired dark theme and gold accents.

## Features

- 🎬 **16 Slides**: One slide per week showing curriculum progression
- 🎨 **Netflix Theme**: Dark background (#141414) with gold accents (rgb(194, 143, 41))
- 📱 **Responsive**: Works on all screen sizes
- ⚡ **Interactive**: Navigate with keyboard, mouse, or touch
- 📤 **Exportable**: Generate PDF or static HTML
- 🎯 **Progressive Transitions**: Smooth slide animations

## Quick Start

### Development Mode (Live Preview)

```bash
npm run dev
```

This will:

- Start Slidev dev server
- Open browser at `http://localhost:3030`
- Auto-reload on file changes
- Enable presenter mode

### Navigation

**Keyboard Shortcuts:**

- `→` or `Space` - Next slide
- `←` - Previous slide
- `f` - Toggle fullscreen
- `o` - Toggle slide overview
- `d` - Toggle dark mode
- `g` - Go to specific slide

**Presenter Mode:**

- Press `f` to enter fullscreen
- Right-click → "Present" for dual-screen presenter view
- Shows current slide, next slide, and speaker notes

## Build & Export

### Build Static Site

```bash
npm run build
```

Generates static HTML in `dist/` folder for hosting.

### Export to PDF

```bash
npm run export
```

Generates `slides-export.pdf` from your presentation.

**Note:** PDF export requires Playwright. Install if needed:

```bash
npx playwright install chromium
```

## Customization

### Edit Content

Edit `slides.md` to modify:

- Slide content
- Layout (use different Slidev layouts)
- Transitions
- Frontmatter configuration

### Customize Styling

Edit `style.css` to change:

- Colors (update CSS variables)
- Fonts
- Spacing
- Custom animations

**Current Theme Variables:**

```css
--netflix-bg: #141414         /* Dark background */
--netflix-gold: rgb(194, 143, 41)  /* Gold accent */
--netflix-text: #ffffff       /* White text */
--netflix-dark-gray: #1a1a1a  /* Code blocks */
```

## Slide Structure

Slides are separated by `---` in the markdown file:

```markdown
---
layout: default
---

# Slide Title

Content here...

---

# Next Slide

More content...
```

### Available Layouts

- `default` - Standard slide
- `center` - Centered content
- `two-cols` - Two columns
- `cover` - Cover/title slide
- `end` - Ending slide

## Presentation Tips

1. **Start in Presenter Mode**: Press `f` for fullscreen, then right-click for presenter view
2. **Use Overview**: Press `o` to see all slides at once
3. **Jump to Slides**: Press `g` + slide number to jump directly
4. **Share PDF**: Export to PDF for easy sharing with students/colleagues
5. **Host Online**: Build and deploy `dist/` folder to any static host (GitHub Pages, Netlify, Vercel)

## File Structure

```text
movie-buzz-slides/
├── slides.md         # Main presentation content
├── style.css         # Netflix-style custom CSS
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## Week-by-Week Content

1. **Week 1-2**: Foundations (Bash, Git, React setup)
2. **Week 3**: React components
3. **Week 4**: State & advanced features (search/filter/sort)
4. **Week 5**: Events & forms
5. **Week 6**: Component patterns
6. **Week 7**: Advanced hooks & context
7. **Week 8**: Node.js & HTTP
8. **Week 9**: Express & APIs
9. **Week 10**: Tic-Tac-Toe checkpoint
10. **Week 11**: MongoDB intro
11. **Week 12**: Mongoose & READ
12. **Week 13**: CREATE functionality
13. **Week 14**: UPDATE functionality
14. **Week 15**: DELETE functionality
15. **Week 16**: Full-stack integration

## Technologies Used

- **Slidev** - Presentation framework for developers
- **Vue** - Slidev's underlying framework
- **UnoCSS** - Utility-first CSS engine
- **Shiki** - Syntax highlighting

## Deployment Options

### Netlify

```bash
npm run build
# Deploy dist/ folder
```

### GitHub Pages

```bash
npm run build
# Push dist/ to gh-pages branch
```

### Vercel

```bash
npm run build
# Connect repo to Vercel
```

## Resources

- [Slidev Documentation](https://sli.dev)
- [Slidev Themes](https://sli.dev/themes/gallery.html)
- [Markdown Guide](https://sli.dev/guide/syntax.html)

## License

Part of the Movie Buzz MERN Stack Curriculum
