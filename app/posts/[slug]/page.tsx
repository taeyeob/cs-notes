import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-[min(100%,740px)] py-[72px] pb-[88px]">
      <article>
        <header className="border-b border-border pb-9">
          <p className="mb-3 text-[13px] font-extrabold tracking-[0.08em] text-brand uppercase">
            Note
          </p>
          <h1 className="m-0 max-w-[760px] text-[clamp(34px,5vw,54px)] leading-[1.1] font-extrabold text-ink">
            {post.title}
          </h1>
          <div className="mt-[18px] flex flex-wrap gap-2.5 text-sm font-bold text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime}</span>
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  );
}
