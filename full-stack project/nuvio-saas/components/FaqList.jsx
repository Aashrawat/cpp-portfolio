"use client";

import { useState } from "react";
import { faqs } from "@/lib/faqs";

export default function FaqList() {
  const [openId, setOpenId] = useState(faqs[0]?.id || null);

  function toggle(id) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="faq-list">
      {faqs.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className={`faq-item${open ? " is-open" : ""}`}>
            <button
              type="button"
              className="faq-item__q"
              aria-expanded={open}
              onClick={() => toggle(item.id)}
            >
              <span>{item.question}</span>
              <span className="faq-item__icon" aria-hidden="true">
                {open ? "−" : "+"}
              </span>
            </button>
            {open ? <p className="faq-item__a">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
