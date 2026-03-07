import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as authService from '../services/auth';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { user, token } = await authService.login(email, password);
          set({ user, token, loading: false });
          return user;
        } catch (err) {
          set({ loading: false, error: err.message });
          throw err;
        }
      },

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const { user, token } = await authService.register(data);
          set({ user, token, loading: false });
          return user;
        } catch (err) {
          set({ loading: false, error: err.message });
          throw err;
        }
      },

      logout: async () => {
        await authService.logout();
        set({ user: null, token: null, error: null });
      },

      checkAuth: async () => {
        set({ loading: true });
        try {
          const session = await authService.getCurrentUser();
          if (session) {
            set({ user: session.user, token: session.token, loading: false });
          } else {
            set({ user: null, token: null, loading: false });
          }
        } catch {
          set({ user: null, token: null, loading: false });
        }
      },

      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) throw new Error('Not logged in');
        set({ loading: true, error: null });
        try {
          const updated = await authService.updateProfile(user.id, updates);
          set({ user: updated, loading: false });
          return updated;
        } catch (err) {
          set({ loading: false, error: err.message });
          throw err;
        }
      },

      changePassword: async (currentPassword, newPassword) => {
        const { user } = get();
        if (!user) throw new Error('Not logged in');
        set({ loading: true, error: null });
        try {
          await authService.changePassword(user.id, currentPassword, newPassword);
          set({ loading: false });
        } catch (err) {
          set({ loading: false, error: err.message });
          throw err;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'ab-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
