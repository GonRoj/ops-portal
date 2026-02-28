import React, { useState } from "react";

function extractFirstJson(text: string): string | null {
  const start = text.search(/[\{\[]/);
  if (start < 0) return null;

  let inString = false,
    escape = false,
    depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (escape) escape = false;
      else if (ch === "\\") escape = true;
      else if (ch === '"') inString = false;
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }

    if (ch === "{" || ch === "[") depth++;
    if (ch === "}" || ch === "]") depth--;

    if (depth === 0) return text.slice(start, i + 1);
  }
  return null;
}

function looksEscapedJson(s: string) {
  return /\\[rn]/.test(s) || /\\\"/.test(s);
}

function unescapeToJsonText(s: string) {
  const wrapped = '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\\"') + '"';
  return JSON.parse(wrapped);
}

function normalizeOuter(raw?: string) {
  let s = (raw || "").trim().replace(/^\uFEFF/, "");

  const p = s.search(/\bpayload\b/i);
  if (p > 0) s = s.slice(p).trim();

  s = s.replace(/^\s*payload\s*[:=]\s*/i, "payload:");

  if (/^\s*payload"\s*:/.test(s) || /^\s*payload"\s*/.test(s)) s = '"' + s;

  if (/^\s*"payload"\s*:/.test(s) && !/^\s*\{/.test(s)) s = "{" + s + "}";

  if (/^\s*payload:/.test(s)) {
    s = s.replace(/^\s*payload:/, '"payload":');
    if (!/^\s*\{/.test(s)) s = "{" + s + "}";
  }

  const cut = extractFirstJson(s);
  return cut || s;
}

export default function Tojson() {
  const [left, setLeft] = useState<string>("");
  const [right, setRight] = useState<string>("");
  const [copied, setCopied] = useState(false);

  function convert() {
    try {
      let outerText = normalizeOuter(left);

      if (looksEscapedJson(outerText) && outerText.trim().startsWith("{")) {
        outerText = unescapeToJsonText(outerText);
      }

      let outer: any;
      try {
        outer = JSON.parse(outerText);
      } catch (e) {
        if (looksEscapedJson(outerText)) {
          const unesc = unescapeToJsonText(outerText);
          outer = JSON.parse(unesc);
        } else {
          throw e;
        }
      }

      if (outer && typeof outer === "object" && outer.payload != null) {
        let payloadText = outer.payload;

        if (typeof payloadText !== "string") {
          setRight(JSON.stringify(payloadText, null, 2));
          return;
        }

        payloadText = payloadText.trim();

        const cut = extractFirstJson(payloadText);
        if (cut) payloadText = cut;

        if (looksEscapedJson(payloadText)) {
          payloadText = unescapeToJsonText(payloadText);
        }

        const obj = JSON.parse(payloadText);
        setRight(JSON.stringify(obj, null, 2));
        return;
      }

      setRight(JSON.stringify(outer, null, 2));
    } catch (e: any) {
      setRight("❌ Error parsing:\n" + (e?.message || String(e)));
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Payload to JSON</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            className="w-full h-64 p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Output</label>
          <textarea
            value={right}
            readOnly
            className="w-full h-64 p-2 border rounded bg-gray-50 font-mono" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={convert}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Convert
          </button>

          <button
            onClick={() => { setLeft(''); setRight(''); }}
            className="px-4 py-2 bg-gray-200 rounded">
            Clear
          </button>
        </div>

        {(() => {
          const text = (right || "").trim();
          const showCopy = text && !text.startsWith('❌');
          if (!showCopy) return null;
          return (
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(right);
                } catch (err) {
                  const ta = document.createElement('textarea');
                  ta.value = right;
                  document.body.appendChild(ta);
                  ta.select();
                  try { document.execCommand('copy'); } catch {}
                  document.body.removeChild(ta);
                }
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {copied ? 'Copied' : 'Copy'}
            </button>
          );
        })()}
      </div>
    </div>
  );
}



