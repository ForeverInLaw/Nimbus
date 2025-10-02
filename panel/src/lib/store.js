import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Theme Store - Manages dark/light mode
 */
export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'system', // 'light' | 'dark' | 'system'
      
      setTheme: (theme) => set({ theme }),
      
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),
    }),
    {
      name: 'nimbus-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Sidebar Store - Manages sidebar state
 */
export const useSidebarStore = create(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      
      toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      
      setCollapsed: (isCollapsed) => set({ isCollapsed }),
      
      toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
      
      setMobileOpen: (isMobileOpen) => set({ isMobileOpen }),
      
      closeMobile: () => set({ isMobileOpen: false }),
    }),
    {
      name: 'nimbus-sidebar',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * User Preferences Store
 */
export const usePreferencesStore = create(
  persist(
    (set) => ({
      itemsPerPage: 10,
      defaultView: 'table', // 'table' | 'grid' | 'cards'
      showNotifications: true,
      autoRefresh: true,
      refreshInterval: 30000, // 30 seconds
      
      setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),
      
      setDefaultView: (defaultView) => set({ defaultView }),
      
      setShowNotifications: (showNotifications) => set({ showNotifications }),
      
      setAutoRefresh: (autoRefresh) => set({ autoRefresh }),
      
      setRefreshInterval: (refreshInterval) => set({ refreshInterval }),
      
      resetPreferences: () => set({
        itemsPerPage: 10,
        defaultView: 'table',
        showNotifications: true,
        autoRefresh: true,
        refreshInterval: 30000,
      }),
    }),
    {
      name: 'nimbus-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Command Palette Store
 */
export const useCommandPaletteStore = create((set) => ({
  isOpen: false,
  
  open: () => set({ isOpen: true }),
  
  close: () => set({ isOpen: false }),
  
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

/**
 * Notification Store - For managing in-app notifications
 */
export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        id: Date.now().toString(),
        read: false,
        timestamp: new Date(),
        ...notification,
      },
      ...state.notifications,
    ].slice(0, 50), // Keep only last 50 notifications
    unreadCount: state.unreadCount + 1,
  })),
  
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
    unreadCount: 0,
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
    unreadCount: state.notifications.find((n) => n.id === id && !n.read)
      ? state.unreadCount - 1
      : state.unreadCount,
  })),
  
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
