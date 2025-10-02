'use client';

import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '@/lib/store';

/**
 * Toast Notification Provider
 * Wraps the app with react-hot-toast Toaster
 */
export default function ToastProvider() {
  const theme = useThemeStore((state) => state.theme);
  
  // Determine actual theme (handle 'system' preference)
  const resolvedTheme = theme === 'system'
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: resolvedTheme === 'dark' ? '#1f2937' : '#ffffff',
          color: resolvedTheme === 'dark' ? '#f9fafb' : '#111827',
          border: `1px solid ${resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'}`,
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
          duration: 5000,
        },
        loading: {
          iconTheme: {
            primary: '#3b82f6',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}
