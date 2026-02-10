// scripts/build-md.js
import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";
import Shiki from '@shikijs/markdown-it'
import anchor from "markdown-it-anchor";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

md.use(await Shiki({
    themes: {
        light: "one-dark-pro"
    }
}));

md.use(anchor, {
  level: 2,
  slugify: s =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
});

// const highlighter = await createHighlighter({ themes: ["vitesse-dark"], langs: ["python", "bash", "javascript"] });

// md.options.highlight = (code, lang) => {
//   return highlighter.codeToHtml(code, { lang });
// };

const inputDir = "src/content/projects";
const outDir = "public/projects";

fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(inputDir)) {
  if (!file.endsWith(".md")) continue;

  const text = fs.readFileSync(path.join(inputDir, file), "utf-8");
  const html = md.render(text);

  fs.writeFileSync(
    path.join(outDir, file.replace(".md", ".html")),
    html
  );
}
