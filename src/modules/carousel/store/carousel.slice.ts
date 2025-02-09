import { Book } from '@modules/books/books.slice';
import { StateCreator } from 'zustand';

export type CarouselBooksType = Book[] | null;

export interface CarouselSlice {
  carouselBooks: CarouselBooksType;
  setCarouselBooks: (carouselBooks: CarouselBooksType) => void;
  clearCarouselSlice: () => void;
}

const initialState = {
  carouselBooks: null,
};

export const createCarouselSlice: StateCreator<CarouselSlice> = (set, get) => ({
  ...initialState,
  setCarouselBooks: (carouselBooks: CarouselBooksType) => {
    set({ carouselBooks });
  },
  clearCarouselSlice: () => {
    set({ ...initialState });
  },
});
