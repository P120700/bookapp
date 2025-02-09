import { REMOTE_CONFIG } from '@src/services/constants';
import { firebaseRemoteConfig } from '@src/services/firebase';
import { useStore } from '@store';
import { useEffect } from 'react';

export const useFirebaseConfigBackground = () => {
  const updateJsonDataFirebaseConfig = useStore(
    (store) => store.updateJsonDataFirebaseConfig
  );
  const setCarouselBooks = useStore((store) => store.setCarouselBooks);

  const getAndStoreJsonDataFirebase = () => {
    const {
      books,
      top_banner_slides: topBannerSlides,
      you_will_like_section: youWillLikeSectionRaw,
    } = JSON.parse(
      firebaseRemoteConfig.getValue(REMOTE_CONFIG.JSON_DATA).asString()
    );
    const youWillLikeSection = youWillLikeSectionRaw.map((id) =>
      books.find((book) => book.id === id)
    );
    updateJsonDataFirebaseConfig({
      books,
      topBannerSlides,
      youWillLikeSection,
    });
  };

  const getAndStoreDetailsCarouselFirebase = () => {
    const { books } = JSON.parse(
      firebaseRemoteConfig.getValue(REMOTE_CONFIG.DETAILS_CAROUSEL).asString()
    );

    setCarouselBooks(books);
  };

  useEffect(() => {
    getAndStoreJsonDataFirebase();
    getAndStoreDetailsCarouselFirebase();
  }, []);
};
