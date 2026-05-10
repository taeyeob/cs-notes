import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
};

type TagsPageProps = {
  searchParams: Promise<{
    tag?: string;
  }>;
};

export default async function TagsPage({ searchParams }: TagsPageProps) {
  const { tag } = await searchParams;
  const posts = getAllPosts();
  const tags = getAllTags();
  const filteredPosts = tag ? posts.filter((post) => post.tags.includes(tag)) : [];

  return (
    <main className="mx-auto w-[min(100%,740px)] py-[72px] pb-[88px]">
      <header className="border-b border-border pb-9">
        <p className="mb-3 text-[13px] font-extrabold tracking-[0.08em] text-brand uppercase">
          Topics
        </p>
        <h1 className="m-0 text-[clamp(40px,6vw,64px)] leading-[1.05] font-extrabold text-ink">
          Tags
        </h1>
        <p className="mt-[18px] max-w-[680px] text-lg text-muted">
          관심 주제별로 공부 기록을 다시 찾아보기 위한 태그입니다.
        </p>
      </header>

      <section className="pt-11">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
          {tags.map((item) => (
            <Link
              className="flex min-h-[52px] items-center justify-between rounded-lg border border-border bg-paper px-[14px] py-3 font-bold"
              href={`/tags?tag=${encodeURIComponent(item.name)}`}
              key={item.name}
            >
              <span>#{item.name}</span>
              <span className="text-[13px] text-muted">{item.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-11">
        <div className="mb-3 flex items-end justify-between gap-4">
          <h2 className="m-0 text-lg font-extrabold">
            {tag ? `#${tag}` : "태그를 선택해 주세요"}
          </h2>
        </div>

        {tag ? (
          filteredPosts.length > 0 ? (
            <div className="grid">
              {filteredPosts.map((post) => (
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
                </article>
              ))}
            </div>
          ) : (
            <div className="py-1 text-muted">아직 이 태그의 글이 없습니다.</div>
          )
        ) : (
          <div className="py-1 text-muted">
            위의 태그 중 하나를 선택하면 관련 글이 표시됩니다.
          </div>
        )}
      </section>
    </main>
  );
}
