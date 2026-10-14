"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlossary } from "@/components/ui/glossary";
import { IconBook, IconCross, IconMenu } from "@/components/ui/icons";

const LINKS = [
  { href: "/", label: "Aujourd'hui" },
  { href: "/programme", label: "Programme" },
  { href: "/revision", label: "Révision" },
  { href: "/carnet", label: "Carnet" },
  { href: "/bilan", label: "Bilans" },
];

export function Header() {
  const pathname = usePathname();
  const { open } = useGlossary();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    // Referme le menu mobile à chaque changement de page.
    setMenu(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2">
        Aller au contenu
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Vigie, accueil">
          <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="var(--color-deep)" />
            <path d="M8 11.5L16 24l8-12.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="16" cy="8.5" r="2.2" fill="#7fd1a8" />
          </svg>
          <span className="font-serif text-[1.35rem] font-semibold tracking-tight text-deep">Vigie</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 font-semibold ${isActive(l.href) ? "bg-deep-tint text-deep" : "text-ink-soft hover:text-deep"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" className="btn btn-quiet" onClick={() => open()}>
            <IconBook size={18} />
            <span>Glossaire</span>
          </button>
          <button type="button" className="btn btn-quiet md:hidden" aria-expanded={menu} aria-controls="menu-mobile" onClick={() => setMenu((m) => !m)}>
            {menu ? <IconCross size={20} /> : <IconMenu size={20} />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      {menu && (
        <nav id="menu-mobile" aria-label="Navigation principale" className="border-t border-line bg-surface md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {[...LINKS, { href: "/donnees", label: "Mes données" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 font-semibold ${isActive(l.href) ? "bg-deep-tint text-deep" : "text-ink"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
