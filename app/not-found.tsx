import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-[min(100%,740px)] py-[72px] pb-[88px]">
      <header className="border-b border-border pb-9">
        <p className="mb-3 text-[13px] font-extrabold tracking-[0.08em] text-brand uppercase">
          404
        </p>
        <h1 className="m-0 text-[clamp(40px,6vw,64px)] leading-[1.05] font-extrabold text-ink">
          페이지를 찾을 수 없습니다.
        </h1>
        <p className="mt-[18px] max-w-[680px] text-lg text-muted">
          주소가 바뀌었거나 아직 작성되지 않은 글일 수 있습니다.
        </p>
      </header>
      <section className="pt-11">
        <Link className="text-sm font-bold text-brand" href="/">
          홈으로 돌아가기
        </Link>
      </section>
    </main>
  );
}
