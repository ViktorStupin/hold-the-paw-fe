import { type RefObject, useEffect, useRef } from 'react';

// Закриває меню/оверлей: якщо клік був не всередині ref-елемента — викликає handler.
/**
 * Викликає handler по mousedown поза елементом `ref`. Активний лише коли `enabled === true`.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled: boolean
) {
  const savedHandler = useRef(handler);
  savedHandler.current = handler;

  useEffect(() => {
    if (!enabled) return;

    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        savedHandler.current();
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [enabled, ref]);
}
