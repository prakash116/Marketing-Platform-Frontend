"use client";

import { ArrowLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, VisuallyHidden } from "radix-ui";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchResultsMock, type SearchGroup, type SearchResult } from "@/mocks/app-header";
import { route } from "./app-routes";

const groupOrder: SearchGroup[] = ["Campaigns", "Chats", "Creators", "Pages"];

// TODO: replace with a debounced search query against the API.
function searchMock(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  const matches = q
    ? searchResultsMock.filter((result) => result.label.toLowerCase().includes(q))
    : searchResultsMock;
  // Keep the flat list in display (group) order so arrow keys follow what is on screen.
  return groupOrder.flatMap((group) => matches.filter((result) => result.group === group));
}

/**
 * ≥1024: a field-like button that opens a command palette (also ⌘K / Ctrl K).
 * <1024: a search icon. Below 768 the dialog takes over the header row:
 * [← back] [full-width input], with grouped results underneath.
 */
export function GlobalSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const returnFocusTo = useRef<HTMLElement | null>(null);
  const listboxId = useId();

  const results = useMemo(() => searchMock(query), [query]);
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const changeOpen = (next: boolean) => {
    if (next) returnFocusTo.current = document.activeElement as HTMLElement | null;
    else {
      setQuery("");
      setActiveIndex(0);
    }
    setOpen(next);
  };

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!open) returnFocusTo.current = document.activeElement as HTMLElement | null;
        setOpen((current) => !current);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: "nearest" });
    // optionId is derived from the stable listboxId.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeIndex]);

  const select = (result: SearchResult) => {
    changeOpen(false);
    router.push(route(result.href));
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + step + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const result = results[activeIndex];
      if (result) select(result);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <div className={cn("flex min-w-0 flex-1 items-center", className)}>
        <button
          type="button"
          onClick={() => changeOpen(true)}
          aria-keyshortcuts="Meta+K Control+K"
          className={cn(
            "hidden h-10 w-[320px] cursor-pointer items-center gap-2.5 rounded-md border border-border bg-muted px-3 text-left outline-none lg:flex xl:w-full xl:max-w-[440px]",
            "transition-colors duration-150 hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="flex-1 truncate text-[14px] text-muted-foreground">
            Search campaigns, chats, creators…
          </span>
          <kbd className="rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-[11px] leading-4 text-muted-foreground">
            ⌘K
          </kbd>
        </button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Search"
          onClick={() => changeOpen(true)}
          className="ml-auto lg:hidden [&_svg]:size-5"
        >
          <Search aria-hidden="true" />
        </Button>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgb(var(--shadow-color)/0.5)] max-md:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            // There is no single Radix Trigger (two buttons + ⌘K), so restore focus manually.
            event.preventDefault();
            returnFocusTo.current?.focus();
          }}
          className={cn(
            "fixed z-50 flex flex-col bg-card text-foreground outline-none",
            "max-md:inset-0",
            "md:inset-x-0 md:top-[12vh] md:mx-auto md:max-h-[70vh] md:w-[calc(100%-48px)] md:max-w-xl md:rounded-xl md:border md:border-border md:shadow-xl md:data-[state=open]:animate-modal-in",
          )}
        >
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Search</Dialog.Title>
          </VisuallyHidden.Root>

          <div className="flex h-14 shrink-0 items-center gap-2 px-3 md:h-auto md:border-b md:border-border md:px-0">
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close search"
                className="md:hidden [&_svg]:size-5"
              >
                <ArrowLeft aria-hidden="true" />
              </Button>
            </Dialog.Close>
            <div className="flex h-10 flex-1 items-center gap-2 rounded-md border-2 border-primary px-3 md:h-14 md:rounded-none md:border-0 md:px-4">
              <Search
                className="size-4 shrink-0 text-muted-foreground md:size-5"
                aria-hidden="true"
              />
              <input
                type="text"
                role="combobox"
                aria-label="Search campaigns, chats, creators and pages"
                aria-expanded={results.length > 0}
                aria-controls={listboxId}
                aria-activedescendant={results.length ? optionId(activeIndex) : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder="Search campaigns, chats, creators…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery("");
                    setActiveIndex(0);
                  }}
                  className="-mr-1 flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : (
                <kbd className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] leading-4 text-muted-foreground max-md:hidden">
                  Esc
                </kbd>
              )}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-3 md:pt-2">
            <ul id={listboxId} role="listbox" aria-label="Results">
              {groupOrder.map((group) => {
                const items = results
                  .map((result, index) => ({ result, index }))
                  .filter(({ result }) => result.group === group);
                if (!items.length) return null;
                return (
                  <li key={group} role="presentation">
                    <p
                      aria-hidden="true"
                      className="px-3 pt-3 pb-1.5 text-[11px] leading-4 font-bold tracking-[0.08em] text-muted-foreground uppercase"
                    >
                      {group}
                    </p>
                    <ul role="group" aria-label={group}>
                      {items.map(({ result, index }) => (
                        <li
                          key={result.id}
                          id={optionId(index)}
                          role="option"
                          aria-selected={index === activeIndex}
                          onPointerMove={() => setActiveIndex(index)}
                          onClick={() => select(result)}
                          className="flex min-h-10 cursor-pointer items-center rounded-md px-3 py-2 text-[14px] leading-5 text-text-secondary aria-selected:bg-muted aria-selected:text-foreground"
                        >
                          {result.label}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            {results.length === 0 ? (
              <p className="px-3 py-10 text-center text-[14px] text-muted-foreground">
                No results for “{query}”
              </p>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
