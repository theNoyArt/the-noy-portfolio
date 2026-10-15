import { useEffect, useRef, useState } from "react";
import { PERSON } from "../content/person";

/**
 * Props for an "email me" link: it opens the visitor's mail app (mailto) and also copies the
 * address, because many browsers have no mail app set up and the click would otherwise do nothing.
 * `copied` is true for a moment after the click, to swap the label for a confirmation.
 */
export function useEmailLink() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  function onClick() {
    navigator.clipboard
      ?.writeText(PERSON.email)
      .then(() => {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 2200);
      })
      .catch(() => {
        /* clipboard blocked: the mail app still opens */
      });
  }

  return { href: `mailto:${PERSON.email}`, title: PERSON.email, onClick, copied };
}
