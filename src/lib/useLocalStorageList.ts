"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, { raw: string | null; parsed: string[] }>();

function emit(key: string) {
  listeners.get(key)?.forEach((callback) => callback());
}

function subscribe(key: string) {
  return (callback: () => void) => {
    if (!listeners.has(key)) listeners.set(key, new Set());
    const set = listeners.get(key)!;
    set.add(callback);
    return () => set.delete(callback);
  };
}

// Returns a stable array reference when the underlying raw string hasn't
// changed — required by useSyncExternalStore, which re-renders whenever
// getSnapshot returns a new reference.
function getSnapshot(key: string): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    raw = null;
  }
  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.parsed;
  let parsed: string[] = [];
  try {
    parsed = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    parsed = [];
  }
  cache.set(key, { raw, parsed });
  return parsed;
}

const EMPTY: string[] = [];

function getServerSnapshot(): string[] {
  return EMPTY;
}

/** A localStorage-backed string array, shared across every component reading the same key. */
export function useLocalStorageList(key: string): [string[], (next: string[]) => void] {
  const subscribeToKey = useMemo(() => subscribe(key), [key]);
  const getSnapshotForKey = useCallback(() => getSnapshot(key), [key]);
  const value = useSyncExternalStore(subscribeToKey, getSnapshotForKey, getServerSnapshot);

  const setValue = useCallback(
    (next: string[]) => {
      window.localStorage.setItem(key, JSON.stringify(next));
      emit(key);
    },
    [key],
  );

  return [value, setValue];
}
