"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useI18n } from "@/context/I18nContext";

export default function Chatbot() {
  const { t, language } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);
  const greetingSeeded = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const greeting = t("chat.greeting");
    if (!greetingSeeded.current) {
      setMessages([{ role: "assistant", content: greeting }]);
      greetingSeeded.current = true;
      return;
    }
    setMessages((current) => {
      if (current.length === 1 && current[0].role === "assistant") {
        return [{ role: "assistant", content: greeting }];
      }
      return current;
    });
  }, [language, t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text) {
    const content = text.trim();
    if (!content || busy) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setBusy(true);
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          messages: nextMessages
            .filter(
              (message) =>
                message.role === "user" || message.role === "assistant"
            )
            .slice(-20)
            .map((message) => ({
              role: message.role,
              content: message.content,
            })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Chat failed");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply,
          products: data.products || [],
        },
      ]);
    } catch (err) {
      setError(err.message || "Could not reach the assistant");
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  if (!mounted) return null;

  const starters = [
    t("chat.starter.buy"),
    t("chat.starter.recommend"),
    t("chat.starter.refund"),
    t("chat.starter.categories"),
  ];

  return createPortal(
    <div className="nuvio-chat">
      {open ? (
        <section className="nuvio-chat__panel" aria-label="Kavya chatbot">
          <header className="nuvio-chat__header">
            <div>
              <p className="nuvio-chat__eyebrow">{t("chat.title")}</p>
              <p className="nuvio-chat__sub">{t("chat.sub")}</p>
            </div>
            <button
              type="button"
              className="nuvio-chat__close"
              onClick={() => setOpen(false)}
              aria-label={t("chat.close")}
            >
              ×
            </button>
          </header>

          <div className="nuvio-chat__messages">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`nuvio-chat__bubble nuvio-chat__bubble--${message.role}`}
              >
                {message.content}
                {message.products?.length ? (
                  <div className="nuvio-chat__products">
                    {message.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="nuvio-chat__product"
                      >
                        <span>{product.name}</span>
                        <strong>${product.price}</strong>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {busy ? (
              <div className="nuvio-chat__bubble nuvio-chat__bubble--assistant">
                {t("chat.thinking")}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          {!busy && messages.length < 3 ? (
            <div className="nuvio-chat__starters">
              {starters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => sendMessage(starter)}
                >
                  {starter}
                </button>
              ))}
            </div>
          ) : null}

          {error ? <p className="nuvio-chat__error">{error}</p> : null}

          <form className="nuvio-chat__form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              aria-label="Chat message"
              disabled={busy}
            />
            <button type="submit" disabled={busy || !input.trim()}>
              {t("chat.send")}
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="nuvio-chat__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? t("chat.close") : t("chat.open")}
      >
        {open ? t("chat.close") : t("chat.open")}
      </button>
    </div>,
    document.body
  );
}
