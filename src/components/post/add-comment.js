import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { uid }
  } = useContext(UserContext);
  const { user } = useUser(uid);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([...comments, { displayName: user.username, comment }]);
    setComment('');

    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName: user.username, comment })
      });
  };

  return  (
    <div>
      <form
        data-testid={`add-comment-submit-${docId}`}
        className="flex justify-between pl-0 pr-5"
        method="POST"  
      >
        <input>

        </input>
        <button>

        </button>
      </form>
    </div>
  )
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object
};
