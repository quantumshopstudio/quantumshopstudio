"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/samples", label: "Samples" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "px-3 py-2 rounded-md text-sm transition",
        active ? "bg-white/5 text-white" : "text-slate-200 hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e) {
      if (e.key === "Escape") {
        closeMenu();
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll("a, button");
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  useEffect(() => {
    if (open && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a");
      firstLink?.focus();
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold tracking-wide">
            <span className="text-white">Quantum</span>{" "}
            <span className="text-neonCyan">Shop</span>{" "}
            <span className="text-neonViolet">Studio</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.href} {...l} active={pathname === l.href} />
            ))}
          </nav>

          <button
            ref={toggleRef}
            className="md:hidden inline-flex items-center justify-center rounded-md border border-white/10 px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            Menu
          </button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            ref={menuRef}
            aria-label="Mobile navigation"
            className="md:hidden pb-4"
            role="navigation"
          >
            <div className="grid gap-2 rounded-xl border border-white/10 bg-panel/70 p-3 shadow-glow">
              {links.map((l) => (
                <NavLink
                  key={l.href}
                  {...l}
                  active={pathname === l.href}
                  onClick={() => closeMenu()}
                />
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
