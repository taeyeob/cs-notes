import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
};

const backendStack = ["Python", "Django", "DRF", "Kotlin", "Java"];
const infraStack = ["AWS", "GCP", "PostgreSQL", "Redis"];
const interests = [
  "Database design",
  "Query optimization",
  "Backend architecture",
  "Practical systems",
];
const principles = [
  "Prefer simplicity over complexity",
  "Avoid overengineering",
  "Build systems that are easy to understand and maintain",
  "Ship first, refine later",
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-[min(100%,740px)] py-[72px] pb-[88px]">
      <header className="border-b border-border pb-7">
        <p className="mb-3 text-[13px] font-extrabold tracking-[0.08em] text-brand uppercase">
          About
        </p>
        <h1 className="m-0 text-[clamp(40px,6vw,64px)] leading-[1.05] font-extrabold text-ink">
          <span className="text-line">Simple and reliable</span>
          <span className="text-line">backends.</span>
        </h1>
        <p className="mt-[18px] max-w-[680px] text-lg text-muted">
          <span className="text-line">
            간단하고 신뢰할 수 있는 시스템을 만드는 데 관심이 있습니다.
          </span>
          <span className="text-line">
            데이터 모델을 깔끔하게 설계하고, 쿼리를 개선하고, 실제 서비스의 문제를 불필요한
            복잡도 없이 해결하는 과정을 좋아합니다.
          </span>
        </p>
      </header>

      <section className="mt-7 grid grid-cols-2 gap-5 max-[720px]:grid-cols-1">
        <div className="min-w-0 rounded-lg border border-border bg-paper p-[22px]">
          <h2 className="mb-3 text-lg font-extrabold">What I Do</h2>
          <p className="m-0 text-muted">
            <span className="text-line">
              MAKESTAR에서 백엔드 서비스와 API를 만들고, 실용적인 데이터베이스 스키마와
              데이터 접근 패턴을 고민합니다.
            </span>
            <span className="text-line">
              운영 중인 시스템의 안정성과 이해 가능성을 높이는 일에 집중합니다.
            </span>
          </p>
        </div>
        <div className="min-w-0 p-[22px]">
          <h2 className="mb-3 text-lg font-extrabold">Contact</h2>
          <div className="flex gap-2.5">
            <a
              className="grid size-10 place-items-center rounded-lg border border-border bg-paper hover:border-indigo-200 hover:bg-brand-soft"
              href="https://github.com/taeyeob"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <Image src="/icons/github.svg" alt="" width={21} height={21} />
            </a>
            <a
              className="grid size-10 place-items-center rounded-lg border border-border bg-paper hover:border-indigo-200 hover:bg-brand-soft"
              href="https://www.linkedin.com/in/taeyeob-kim-684274112"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Image src="/icons/linkedin.svg" alt="" width={21} height={21} />
            </a>
            <a
              className="grid size-10 place-items-center rounded-lg border border-border bg-paper hover:border-indigo-200 hover:bg-brand-soft"
              href="mailto:hwj20215@gmail.com"
              aria-label="Gmail"
              title="Gmail"
            >
              <Image src="/icons/gmail.svg" alt="" width={21} height={21} />
            </a>
          </div>
        </div>
        <div className="min-w-0 rounded-lg border border-border bg-paper p-[22px]">
          <h2 className="mb-3 text-lg font-extrabold">Interests</h2>
          <ul className="m-0 grid list-none gap-2 p-0 text-muted">
            {interests.map((item) => (
              <li
                className="relative pl-4 before:absolute before:left-0 before:font-extrabold before:text-brand before:content-['/']"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 rounded-lg border border-border bg-paper p-[22px]">
          <h2 className="mb-3 text-lg font-extrabold">Engineering Philosophy</h2>
          <ul className="m-0 grid list-none gap-2 p-0 text-muted">
            {principles.map((item) => (
              <li
                className="relative pl-4 before:absolute before:left-0 before:font-extrabold before:text-brand before:content-['/']"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-5 max-[720px]:grid-cols-1">
        <div className="min-w-0 rounded-lg border border-border bg-paper p-[22px]">
          <h2 className="mb-3 text-lg font-extrabold">Backend</h2>
          <div className="flex flex-wrap gap-2.5">
            {backendStack.map((item) => (
              <span
                className="inline-flex min-h-[30px] items-center rounded-full border border-border bg-paper px-3 py-[7px] text-[13px] leading-none font-bold text-muted"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-lg border border-border bg-paper p-[22px]">
          <h2 className="mb-3 text-lg font-extrabold">Infra & Database</h2>
          <div className="flex flex-wrap gap-2.5">
            {infraStack.map((item) => (
              <span
                className="inline-flex min-h-[30px] items-center rounded-full border border-border bg-paper px-3 py-[7px] text-[13px] leading-none font-bold text-muted"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 min-w-0 rounded-lg border border-border bg-paper p-[22px]">
        <h2 className="mb-3 text-lg font-extrabold">Writing Principle</h2>
        <p className="m-0 text-muted">
          하나의 글에는 하나의 주제만 담고, 문제 상황과 해결 과정을 분리해서 기록합니다.
          짧더라도 다시 읽었을 때 맥락이 살아있는 글을 목표로 합니다.
        </p>
      </section>
    </main>
  );
}
