import { BooksSlice } from '@modules/books/books.slice';
import { CarouselSlice } from '@modules/carousel/store/carousel.slice';

export type StoreTypes = BooksSlice & CarouselSlice;
