"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { Button, Container } from "@/components/ui";
import { cn } from "@/lib/utils";

/** Wordmark as type with the small H mark from the app icon. */
export function Wordmark() {
  return (
    <Link href="/" className="inline-flex min-h-[44px] items-center gap-2.5" aria-label={`${BRAND.name} home`}>
      <Image src="/icon-192.png" alt="" width={28} height={28} priority className="rounded-[6px]" />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">{BRAND.name}</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the toggle; link clicks close it too.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-b border-rule bg-ground">
      <Container className="flex min-h-[64px] items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className={cn(
                "link-hover inline-flex min-h-[44px] items-center border-b border-transparent px-3 text-[0.9375rem]",
                isCurrent(l.href) ? "border-ink font-semibold text-ink" : "text-ink-2 hover:text-ink",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Button href="/download" className="ml-3">
            Download
          </Button>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="btn btn-secondary md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="border-t border-rule md:hidden">
          <Container as="nav" aria-label="Main" className="grid py-2">
            {[...NAV_LINKS, { href: "/download", label: "Download" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(l.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-[48px] items-center border-b border-rule text-[1.0625rem] last:border-b-0",
                  isCurrent(l.href) ? "font-semibold text-ink" : "text-ink-2",
                )}
              >
                {l.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
