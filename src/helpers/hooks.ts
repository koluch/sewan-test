import { nanoid } from "nanoid";
import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { isEqual } from "./lang";

export function usePrevious<T>(value: T): T | null {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current || null;
}

export function useId(
  prefix = "",
  defaultId: string | undefined | null = null
): string {
  const [id] = useState(`${prefix}_${nanoid()}`);
  if (defaultId != null) {
    return defaultId;
  }
  return id;
}

// https://usehooks.com/useDebounce/
export function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDeepCompareValue<T>(value: T): T {
  const ref = useRef<T>(value);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

export function useDeepCompareEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareValue(deps));
}
