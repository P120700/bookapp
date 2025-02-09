import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStorage } from './storage';
import { StoreTypes } from './types';
import { createBooksSlice } from '@modules/books/books.slice';
import { createCarouselSlice } from '@modules/carousel/store/carousel.slice';

const persistConfig = {
  name: 'ctrl-mobileapp-storage',
  storage: createJSONStorage(() => mmkvStorage),
  partialize: (state: StoreTypes) => ({
    books: state.books,
    carouselBooks: state.carouselBooks,
    youWillLikeSection: state.youWillLikeSection,
    topBannerSlides: state.topBannerSlides,
  }),
};

export const useStore = create<StoreTypes>()(
  persist(
    (...a) => ({
      ...createBooksSlice(...a),
      ...createCarouselSlice(...a),
    }),
    persistConfig
  )
);
