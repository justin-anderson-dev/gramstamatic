import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

// TODO: create photo detail view
export default function Photos({ photos }) {
  return (
    <div className="h-16 border-t border-gray-primary mt-12 px-4 lg:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className="relative group">
              <img src={photo.imageSrc} alt={photo.caption} />
              <div>
                Some other elements go here
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

Photos.propTypes = {
  photos: PropTypes.array
};
