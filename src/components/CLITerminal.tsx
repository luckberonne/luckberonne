import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { translations } from '../translations';
import { getProjects } from '../data/projects';
import {
  CLI_COMMANDS,
  DISPLAY,
  EMAIL,
  GITHUB_URL,
  KNOWN_COMMANDS,
  LINKEDIN_URL,
  NUMERIC_SHORTCUTS,
  PROMPT,
  canonicalize,
  completeCommand,
  coursesLines,
  educationLines,
  experienceLines,
  loadCliHistory,
  normalizeInput,
  projectLines,
  resolveProject,
  saveCliHistory,
  skillsLines,
  suggestCommand,
  type CliLang,
  type CliLine,
} from '../lib/cli';

/** Renders "**bold**" segments as <strong>; everything else as plain text. */
function renderRich(text: string) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

type Translation = (typeof translations)['en'];

interface CLITerminalProps {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  lang: CliLang;
  setLang: (lang: CliLang) => void;
  setIsDark: (value: boolean) => void;
  t: Translation;
}

const bannerLines = (t: Translation, lang: CliLang): CliLine[] => {
  const d = DISPLAY[lang];
  const quick = Object.entries(NUMERIC_SHORTCUTS)
    .map(([n, cmd]) => `${n} **${d[cmd]}**`)
    .join(' · ');
  return [
    { type: 'title', text: `Lucas Ariel Beronne — ${t.cli.title}` },
    { type: 'meta', text: t.cli.welcome },
    { type: 'meta', text: quick },
  ];
};

const helpLines = (t: Translation, lang: CliLang): CliLine[] => {
  const d = DISPLAY[lang];
  return [
    { type: 'title', text: t.cli.allCommands },
    ...CLI_COMMANDS.map((cmd) => ({
      type: 'menu' as const,
      text: `**${d[cmd].padEnd(12)}** ${t.cli[cmd]}`,
    })),
    { type: 'menu', text: `**${'open <n>'.padEnd(12)}** ${t.cli.openCmd}` },
    { type: 'menu', text: `**${'demo <n>'.padEnd(12)}** ${t.cli.demoCmd}` },
    { type: 'menu', text: `**${'repo <n>'.padEnd(12)}** ${t.cli.repoCmd}` },
  ];
};

export function CLITerminal({
  open,
  onClose,
  isDark,
  lang,
  setLang,
  setIsDark,
  t,
}: CLITerminalProps) {
  // Seeded once at mount with the banner — closing/reopening the terminal keeps
  // whatever ran during the session; only the "clear"/"limpiar" command wipes it.
  const [lines, setLines] = useState<CliLine[]>(() => bannerLines(t, lang));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(loadCliHistory);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  // Lock background scroll while the terminal is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const projects = getProjects(t);

  const push = (...next: CliLine[]) => setLines((prev) => [...prev, ...next]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    push({ type: 'cmd', text: `${PROMPT} ${trimmed}` });
    setHistory((prev) => {
      const next = [trimmed, ...prev].slice(0, 40);
      saveCliHistory(next);
      return next;
    });
    setHistoryIndex(null);

    // Resolve the first word alone first (covers every single-token command and
    // "open/demo/repo <n>"); only fall back to the whole phrase for things like
    // "sobre mi" that are typed as two words in Spanish.
    const parts = trimmed.split(/\s+/);
    const head = parts[0].toLowerCase();
    const rest = parts.slice(1).join(' ');
    const headCmd = NUMERIC_SHORTCUTS[head] ?? canonicalize(head);
    const cmd = KNOWN_COMMANDS.has(headCmd) ? headCmd : canonicalize(trimmed);

    switch (cmd) {
      case 'help':
        push(...helpLines(t, lang));
        return;
      case 'about':
        push({ type: 'out', text: t.aboutText });
        return;
      case 'exp':
        push(...experienceLines(t));
        return;
      case 'proj':
        push(...projectLines(t, projects));
        return;
      case 'open':
      case 'demo':
      case 'repo': {
        if (!rest) {
          push({ type: 'err', text: t.cli.projUsage.replace('{cmd}', cmd) });
          return;
        }
        const project = resolveProject(rest, projects);
        if (!project) {
          push(
            { type: 'err', text: `${t.cli.unknownProject}: ${rest}` },
            { type: 'meta', text: t.cli.runProjFirst },
          );
          return;
        }
        const url = cmd === 'demo' ? project.demoUrl : cmd === 'repo' ? project.githubUrl : project.demoUrl || project.githubUrl;
        if (!url) {
          push({ type: 'err', text: `${project.title} ${t.cli.noLinkSuffix}` });
          return;
        }
        window.open(url, '_blank', 'noopener,noreferrer');
        push(
          { type: 'ok', text: `${t.cli.opening} ${project.title}…` },
          { type: 'meta', text: url, href: url },
        );
        return;
      }
      case 'skills':
        push(...skillsLines(t));
        return;
      case 'courses':
        push(...coursesLines(t));
        return;
      case 'edu':
        push(...educationLines(t));
        return;
      case 'cv':
        window.open(t.linkCV, '_blank', 'noopener,noreferrer');
        push(
          { type: 'ok', text: `${t.cli.opening} CV…` },
          { type: 'meta', text: t.linkCV, href: t.linkCV },
        );
        return;
      case 'gh':
        window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
        push(
          { type: 'ok', text: `${t.cli.opening} GitHub…` },
          { type: 'meta', text: GITHUB_URL, href: GITHUB_URL },
        );
        return;
      case 'li':
        window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer');
        push(
          { type: 'ok', text: `${t.cli.opening} LinkedIn…` },
          { type: 'meta', text: LINKEDIN_URL, href: LINKEDIN_URL },
        );
        return;
      case 'contact':
        navigator.clipboard
          .writeText(EMAIL)
          .then(() =>
            push(
              { type: 'ok', text: t.cli.copied },
              { type: 'meta', text: EMAIL, href: `mailto:${EMAIL}` },
            ),
          )
          .catch(() =>
            push(
              { type: 'err', text: t.cli.copyFailed },
              { type: 'meta', text: EMAIL, href: `mailto:${EMAIL}` },
            ),
          );
        return;
      case 'lang': {
        const next = lang === 'en' ? 'es' : 'en';
        setLang(next);
        push({ type: 'ok', text: `${DISPLAY[lang].lang} → ${next}` });
        return;
      }
      case 'theme':
        setIsDark(!isDark);
        push({ type: 'ok', text: `${DISPLAY[lang].theme} → ${isDark ? 'light' : 'dark'}` });
        return;
      case 'clear':
        setLines(bannerLines(t, lang));
        return;
      case 'exit':
        onClose();
        return;
      default: {
        const guess = suggestCommand(normalizeInput(head), lang);
        push({ type: 'err', text: `${t.cli.unknown}: ${trimmed}` });
        if (guess) push({ type: 'meta', text: `${t.cli.didYouMean} "${guess}"?` });
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIndex === null ? 0 : Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const next = historyIndex - 1;
      setHistoryIndex(next < 0 ? null : next);
      setInput(next < 0 ? '' : history[next]);
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!input.trim()) {
        setInput(DISPLAY[lang].about);
        return;
      }
      const { matches, completed } = completeCommand(input, lang);
      if (matches.length === 1) {
        setInput(completed);
      } else if (matches.length > 1) {
        setInput(completed);
        push({ type: 'meta', text: matches.join('  ') });
      }
    }
  };

  const lineClass: Record<CliLine['type'], string> = {
    title: isDark ? 'text-primary-300 font-semibold' : 'text-primary-700 font-semibold',
    out: isDark ? 'text-neutral-300' : 'text-neutral-700',
    meta: isDark ? 'text-neutral-500' : 'text-neutral-500',
    ok: isDark ? 'text-primary-300' : 'text-primary-600',
    err: 'text-red-400',
    menu: isDark ? 'text-neutral-400' : 'text-neutral-600',
    cmd: isDark ? 'text-neutral-300' : 'text-neutral-700',
  };
  const promptClass = isDark ? 'text-primary-300' : 'text-primary-700';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-neutral-950/70 modal-backdrop" onClick={onClose} />
      <div
        onClick={() => inputRef.current?.focus()}
        className={`relative w-full max-w-2xl h-[85vh] sm:h-[70vh] max-h-[560px] flex flex-col rounded-2xl shadow-xl font-mono text-xs sm:text-sm ${
          isDark
            ? 'bg-neutral-950 border border-white/10'
            : 'bg-surface-light border border-neutral-200'
        }`}
      >
        <div
          className={`flex items-center justify-between px-3 sm:px-4 py-2 rounded-t-2xl border-b ${
            isDark ? 'border-white/10 text-neutral-400' : 'border-neutral-200 text-neutral-500'
          }`}
        >
          <span className="truncate">{PROMPT}</span>
          <button
            onClick={onClose}
            aria-label="close"
            className={`shrink-0 p-2 -mr-2 ${isDark ? 'hover:text-neutral-200' : 'hover:text-neutral-700'}`}
          >
            <X size={16} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-4 py-3 space-y-1">
          {lines.map((line, i) => (
            <div key={i} className={`${lineClass[line.type]} break-words`}>
              {line.type === 'cmd' ? (
                <>
                  <span className={promptClass}>{PROMPT}</span> {line.text.slice(PROMPT.length + 1)}
                </>
              ) : line.href ? (
                <a
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted hover:opacity-80"
                >
                  {renderRich(line.text)}
                </a>
              ) : (
                renderRich(line.text)
              )}
            </div>
          ))}

          <div className="flex items-center gap-2">
            <span className={`shrink-0 truncate max-w-[40%] ${promptClass}`}>{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck={false}
              placeholder={`${DISPLAY[lang].about} (Tab)`}
              className={`flex-1 min-w-0 bg-transparent outline-none placeholder:text-neutral-500/60 ${
                isDark ? 'text-neutral-100' : 'text-neutral-900'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
