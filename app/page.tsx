import Link from "next/link";
import { formatDate, getAllPosts, getAllTags } from "@/lib/posts";

const focusAreas = ["Backend", "Database", "Django", "Kotlin", "AWS", "PostgreSQL"];

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 5);
  const tags = getAllTags();

  return (
    <main className="mx-auto w-[min(calc(100%_-_32px),960px)] py-[72px] pb-[88px]">
      <section className="grid w-[min(100%,740px)] gap-7 border-b border-border pb-12">
        <div>
          <p className="mb-3 text-[13px] font-extrabold tracking-[0.08em] text-brand uppercase">
            Study Log
          </p>
          <h1 className="m-0 text-[clamp(40px,6vw,64px)] leading-[1.05] font-extrabold text-ink">
            <span className="text-line">간단하고 신뢰할 수 있는</span>
            <span className="text-line">시스템을 공부합니다.</span>
          </h1>
          <p className="mt-[18px] max-w-[680px] text-lg text-muted">
            <span className="text-line">
              백엔드, 데이터 모델링, 쿼리 최적화, 배포와 문제 해결 과정을 짧고 정확하게
              기록합니다.
            </span>
            <span className="text-line">
              완벽한 글보다 다시 읽을 수 있는 기록을 먼저 쌓습니다.
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5" aria-label="Main topics">
          {focusAreas.map((tag) => (
            <span
              className="inline-flex min-h-[30px] items-center rounded-full border border-border bg-paper px-3 py-[7px] text-[13px] leading-none font-bold text-muted"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link className="text-sm font-bold text-brand" href="/about">
          프로필 보기
        </Link>
      </section>

      <section className="w-[min(100%,740px)] pt-11">
        <div className="mb-3 flex items-end justify-between gap-4">
          <h2 className="m-0 text-lg font-extrabold">Recent Posts</h2>
          <Link className="text-sm font-bold text-brand" href="/posts">
            모든 글 보기
          </Link>
        </div>
        <div className="grid">
          {recentPosts.map((post) => (
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

      <section className="w-[min(100%,740px)] pt-11">
        <div className="mb-3 flex items-end justify-between gap-4">
          <h2 className="m-0 text-lg font-extrabold">Topics</h2>
          <Link className="text-sm font-bold text-brand" href="/tags">
            태그 보기
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
          {tags.map((tag) => (
            <Link
              className="flex min-h-[52px] items-center justify-between rounded-lg border border-border bg-paper px-[14px] py-3 font-bold"
              href={`/tags?tag=${encodeURIComponent(tag.name)}`}
              key={tag.name}
            >
              <span>#{tag.name}</span>
              <span className="text-[13px] text-muted">{tag.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
