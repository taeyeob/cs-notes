import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-[min(100%,740px)] py-[72px] pb-[88px]">
      <header className="border-b border-border pb-9">
        <p className="mb-3 text-[13px] font-extrabold tracking-[0.08em] text-brand uppercase">
          Archive
        </p>
        <h1 className="m-0 text-[clamp(40px,6vw,64px)] leading-[1.05] font-extrabold text-ink">
          Posts
        </h1>
        <p className="mt-[18px] max-w-[680px] text-lg text-muted">
          공부한 내용, 구현 과정, 다시 설명할 수 있어야 하는 개념을 모아둡니다.
        </p>
      </header>

      <section className="pt-11">
        <div className="grid">
          {posts.map((post) => (
            <article
              className="grid gap-2 border-b border-border py-6 first:border-t"
              key={post.slug}
            >
              <time className="text-[13px] font-bold text-muted" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <h3 className="m-0 text-[23px] leading-tight font-extrabold">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="m-0 max-w-[720px] text-muted">{post.summary}</p>
              <div className="mt-0.5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    className="inline-flex min-h-[30px] items-center rounded-full border border-border bg-paper px-3 py-[7px] text-[13px] leading-none font-bold text-muted hover:border-indigo-200 hover:text-brand"
                    href={`/tags?tag=${encodeURIComponent(tag)}`}
                    key={tag}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
