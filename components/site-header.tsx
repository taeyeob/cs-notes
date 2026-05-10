"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border/90 bg-canvas/90 backdrop-blur-md">
      <nav
        className="mx-auto flex min-h-16 w-[min(calc(100%_-_32px),960px)] items-center justify-between"
        aria-label="Primary navigation"
      >
        <Link className="inline-flex items-center gap-2.5 font-bold" href="/">
          <span className="grid size-7 place-items-center rounded-lg border border-border bg-paper text-[11px] font-extrabold text-brand">
            TY
          </span>
          <span>CS Notes</span>
        </Link>
        <div className="flex items-center gap-[22px] text-sm font-semibold text-muted">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={isActive ? "font-extrabold text-ink" : "hover:text-ink"}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
