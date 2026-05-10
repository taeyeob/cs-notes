import fs from "node:fs";
import path from "node:path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: string;
  content: string;
  html: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs.readdirSync(postsDirectory);
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return {
      data: {},
      content: source,
    };
  }

  const [, rawFrontmatter, content] = match;
  const data: Record<string, string | string[]> = {};
  const lines = rawFrontmatter.split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const keyValue = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);

    if (!keyValue) {
      continue;
    }

    const [, key, rawValue] = keyValue;

    if (rawValue === "") {
      const list: string[] = [];

      while (lines[index + 1]?.trim().startsWith("- ")) {
        index += 1;
        list.push(stripQuotes(lines[index].trim().replace(/^- /, "")));
      }

      data[key] = list;
      continue;
    }

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      data[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((item) => stripQuotes(item.trim()))
        .filter(Boolean);
      continue;
    }

    data[key] = stripQuotes(rawValue);
  }

  return { data, content };
}

function stripQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderInline(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function flushParagraph(parts: string[], output: string[]) {
  if (parts.length === 0) {
    return;
  }

  output.push(`<p>${renderInline(parts.join(" "))}</p>`);
  parts.length = 0;
}

function flushList(parts: string[], output: string[]) {
  if (parts.length === 0) {
    return;
  }

  output.push(`<ul>${parts.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
  parts.length = 0;
}

function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const output: string[] = [];
  const paragraph: string[] = [];
  const list: string[] = [];
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeLines: string[] = [];

  for (const line of lines) {
    const fence = line.match(/^```(\w+)?\s*$/);

    if (fence) {
      if (inCodeBlock) {
        output.push(
          `<pre><code${codeLanguage ? ` class="language-${codeLanguage}"` : ""}>${escapeHtml(
            codeLines.join("\n"),
          )}</code></pre>`,
        );
        inCodeBlock = false;
        codeLanguage = "";
        codeLines = [];
      } else {
        flushParagraph(paragraph, output);
        flushList(list, output);
        inCodeBlock = true;
        codeLanguage = fence[1] ?? "";
      }

      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph(paragraph, output);
      flushList(list, output);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);

    if (heading) {
      flushParagraph(paragraph, output);
      flushList(list, output);
      const level = heading[1].length + 1;
      output.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const listItem = line.match(/^- (.+)$/);

    if (listItem) {
      flushParagraph(paragraph, output);
      list.push(listItem[1]);
      continue;
    }

    const quote = line.match(/^>\s+(.+)$/);

    if (quote) {
      flushParagraph(paragraph, output);
      flushList(list, output);
      output.push(`<blockquote>${renderInline(quote[1])}</blockquote>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph(paragraph, output);
  flushList(list, output);

  return output.join("\n");
}

function getReadingTime(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

export function getAllPosts() {
  return ensurePostsDirectory()
    .filter((fileName) => /\.(md|mdx)$/.test(fileName))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data, content } = parseFrontmatter(source);
      const tags = Array.isArray(data.tags)
        ? data.tags
        : typeof data.tags === "string"
          ? data.tags.split(",").map((tag) => tag.trim())
          : [];

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        summary: String(data.summary ?? ""),
        tags,
        readingTime: getReadingTime(content),
        content,
        html: markdownToHtml(content),
      } satisfies Post;
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllTags() {
  const tagCounts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}
