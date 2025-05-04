export const endPoints = {
  user: {
    getUserProfile: '/user/profile',
    updateUserProfile: '/user/profile',
    getUserSettings: '/user/settings',
    updateUserSettings: '/user/settings',
  },
  entries: {
    getAll: '/entries',
    create: '/entries',
    getById: (id: string) => `/entries/${id}`,
    update: (id: string) => `/entries/${id}`,
    delete: (id: string) => `/entries/${id}`,
  },
  userProgress: {
    getAll: '/user/progress',
    getById: (id: string) => `/user/progress/${id}`,
    update: (id: string) => `/user/progress/${id}`,
  },
  gallery: {
    getAll: '/gallery',
    getById: (id: string) => `/gallery/${id}`,
    delete: (id: string) => `/gallery/${id}`,
  },
};
