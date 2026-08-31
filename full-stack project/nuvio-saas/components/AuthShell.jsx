"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="auth-shell__scene-fallback" />,
});

export default function AuthShell({
  brandLine,
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <section className="auth-shell">
      <div className="auth-shell__visual" aria-hidden="true">
        <div className="auth-shell__scene">
          <Suspense fallback={<div className="auth-shell__scene-fallback" />}>
            <HeroScene variant="auth" />
          </Suspense>
        </div>
        <div className="auth-shell__visual-copy">
          <Link href="/" className="auth-shell__brand">
            Nuvio
          </Link>
          <p className="auth-shell__brand-line">{brandLine}</p>
        </div>
      </div>

      <div className="auth-shell__panel">
        <div className="auth-shell__form-wrap">
          <Link href="/" className="auth-shell__brand auth-shell__brand--mobile">
            Nuvio
          </Link>
          <h1 className="auth-shell__title">{title}</h1>
          <p className="auth-shell__subtitle">{subtitle}</p>
          {children}
          {footer ? <div className="auth-shell__footer">{footer}</div> : null}
        </div>
      </div>
    </section>
  );
}
