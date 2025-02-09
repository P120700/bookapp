import { StateCreator } from 'zustand';

export type Book = {
  id: number;
  name: string;
  author: string;
  summary: string;
  genre: string;
  cover_url: string;
  views: string;
  likes: string;
  quotes: string;
};

export type TopBannerSlide = { id: number; book_id: number; cover: string };

export interface BooksSlice {
  books: Book[];
  setBooks: (books: Book[]) => void;
  topBannerSlides: TopBannerSlide[];
  setTopBannerSlides: (topBannerSlides: TopBannerSlide[]) => void;
  youWillLikeSection: Book[];
  setYouWillLikeSection: (books: Book[]) => void;
  updateJsonDataFirebaseConfig: ({
    books,
    topBannerSlides,
    youWillLikeSection,
  }: {
    books: Book[];
    topBannerSlides: TopBannerSlide[];
    youWillLikeSection: Book[];
  }) => void;
  clearBooksSlice: () => void;
}

const initialState = {
  books: [],
  topBannerSlides: [],
  youWillLikeSection: [],
};

export const createBooksSlice: StateCreator<BooksSlice> = (set, get) => ({
  ...initialState,
  setBooks: (books: Book[]) => {
    set({ books });
  },
  setTopBannerSlides: (topBannerSlides: TopBannerSlide[]) => {
    set({ topBannerSlides });
  },
  setYouWillLikeSection: (youWillLikeSection: Book[]) => {
    set({ youWillLikeSection });
  },
  updateJsonDataFirebaseConfig: ({
    books,
    topBannerSlides,
    youWillLikeSection,
  }) => {
    set({ books, topBannerSlides, youWillLikeSection });
  },
  clearBooksSlice: () => {
    set({ ...initialState });
  },
});
