import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state to localStorage.
 * @param {string} key - localStorage key
 * @param {*} initialValue - Default value
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      // Handle quota exceeded by trimming old entries
      if (err.name === 'QuotaExceededError' && Array.isArray(value)) {
        const trimmed = value.slice(-10);
        localStorage.setItem(key, JSON.stringify(trimmed));
        setValue(trimmed);
      }
    }
  }, [key, value]);

  return [value, setValue];
}
