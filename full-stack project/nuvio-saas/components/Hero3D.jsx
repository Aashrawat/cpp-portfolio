"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroGlobeFallback />,
});

function HeroGlobeFallback() {
  const { t } = useI18n();
  return (
    <div className="hero-scene-fallback">
      <p
        style={{
          position: "absolute",
          right: "12%",
          top: "45%",
          color: "rgba(200,220,255,0.55)",
          fontSize: "0.9rem",
          margin: 0,
        }}
      >
        {t("hero.loadingGlobe")}
      </p>
    </div>
  );
}

function TypingWelcome({ firstName }) {
  const { t } = useI18n();
  const fullText = t("hero.welcome", { name: firstName });
  const [shown, setShown] = useState("");

  useEffect(() => {
    let index = 0;
    let pauseUntil = 0;

    const id = setInterval(() => {
      const now = Date.now();
      if (now < pauseUntil) return;

      if (index >= fullText.length) {
        setShown("");
        index = 0;
        pauseUntil = now + 400;
        return;
      }

      index += 1;
      setShown(fullText.slice(0, index));

      if (index >= fullText.length) {
        pauseUntil = now + 20000;
      }
    }, 55);

    return () => clearInterval(id);
  }, [fullText]);

  return (
    <p className="hero-3d__welcome" aria-live="polite">
      <span>{shown}</span>
      <span className="hero-3d__cursor" aria-hidden="true" />
    </p>
  );
}

export default function Hero3D() {
  const { t } = useI18n();
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user || null))
      .finally(() => setAuthReady(true));
  }, []);

  return (
    <section className="hero-3d">
      <div className="hero-3d__scene" aria-hidden="true">
        <Suspense fallback={<div className="hero-scene-fallback" />}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="hero-3d__layout">
        <div className="hero-3d__content">
          <p className="hero-3d__brand">Nuvio</p>
          <h1 className="hero-3d__headline">{t("hero.headline")}</h1>
          <p className="hero-3d__sub">{t("hero.sub")}</p>

          <div className="hero-3d__form">
            {!authReady ? (
              <div className="hero-3d__welcome-placeholder" aria-hidden="true" />
            ) : user ? (
              <TypingWelcome firstName={user.firstName || "there"} />
            ) : (
              <Link href="/login" className="hero-3d__submit">
                {t("hero.login")}
              </Link>
            )}
          </div>

          <div className="hero-3d__cta">
            <Link href="/search" className="btn-ghost-dark">
              {t("hero.browse")}
            </Link>
          </div>
        </div>

        <div className="hero-3d__spacer" aria-hidden="true" />
      </div>
    </section>
  );
}
