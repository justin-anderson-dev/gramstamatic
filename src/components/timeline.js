import Skeleton from 'react-loading-skeleton';
import usePhotos from '../utils/hooks/use-photos';
import Post from './post';
import { useContext } from 'react';
import LoggedInUserContext from '../context/user';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);

  // get photos from profiles that logged-in user follows
  const { photos } = usePhotos(user);
  
  return (
    <div className="col-span-3 lg:col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => 
            <Skeleton key={index} count={1} width={640} height={500} className="mb-5" />
          )}
        </>
      ) : photos?.length > 0 ? (
    // if photos load, render them in Post components
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow more people to see more photos in your Timeline!</p>
      )}
    </div>
  );
}
