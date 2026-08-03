import { useState } from "react";

function SourceCard({ sources }) {
  if (!sources || sources.length === 0) return null;

  // Deduplicate sources based on filename and page number
  const seen = new Set();
  const uniqueSources = [];

  for (const source of sources) {
    const filePath = source.source || source.metadata?.source || "";
    const fileName = filePath ? filePath.split(/[/\\]/).pop() : "Unknown Document";
    const pageNum = source.page ?? source.metadata?.page ?? "N/A";
    const key = `${fileName}_${pageNum}`;

    if (!seen.has(key)) {
      seen.add(key);
      uniqueSources.push({ source, fileName, pageNum });
    }
  }

  return (
    <div className="mt-4 pt-3 border-t border-slate-800/60">
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-semibold text-indigo-400/80 hover:text-indigo-400 select-none">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v3.75m-9.75-3h3.75m0 0v3.75m0-3.75L12 11.25" />
            </svg>
            Sources ({uniqueSources.length})
          </span>
          <span className="transition-transform duration-200 group-open:rotate-180 text-slate-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </summary>

        <div className="mt-2.5 space-y-2 max-h-[200px] overflow-y-auto pr-1">
          {uniqueSources.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/40 border border-slate-900 text-slate-300"
            >
              <div className="flex items-center gap-2 truncate mr-2">
                <span className="text-red-400/80 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="font-medium truncate text-slate-300">{item.fileName}</span>
              </div>
              <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-400 font-semibold">
                Page {item.pageNum !== "N/A" ? Number(item.pageNum) + 1 : "N/A"}
              </span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

export default SourceCard;
