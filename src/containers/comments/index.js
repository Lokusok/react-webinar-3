import { useState } from 'react';

import PropTypes from 'prop-types';
import CommentsList from '../../components/comments-list';
import { useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from 'react-redux';

import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';

import useInit from '../../hooks/use-init';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentFormWarning from '../../components/comment-form-warning';

function Comments(props) {
  const dispatch = useDispatchRedux();
  const isAuth = useSelector((state) => state.session.exists);
  const select = useSelectorRedux((state) => ({
    comments: state.comments.list,
    waiting: state.comments.waiting,
  }));
  const [formPosition, setFormPosition] = useState(false);

  console.log('Comments List:', select.comments);

  const helpers = {
    manuallyUpdate: (articleId) => {
      dispatch(commentsActions.load(articleId));
    },
  };

  const callbacks = {
    onCommentFormSubmit: (text, commentId) => {
      dispatch(commentsActions.addNew(text, props.articleId, commentId));
      // helpers.manuallyUpdate(props.articleId);
    },
  };

  const options = {
    comments: treeToList(listToTree(select.comments), (comment, level) => ({
      _id: comment._id, author: comment.author, text: comment.text, dateCreate: comment.dateCreate, level: level - 1
    })).slice(1),
    warningUrl: '/login2',
  };

  const renders = {
    formWarning: <CommentFormWarning loginUrl={options.warningUrl} />,
    formWarningAdvanced: (callback) => (
      <CommentFormWarning
        loginUrl={options.warningUrl}
        variant='advanced'
        onClickCancel={callback}
      />
    )
  };

  useInit(() => {
    helpers.manuallyUpdate(props.articleId);
  }, []);

  console.log('Comments:', options.comments)

  return (
    <CommentsList
      formPosition={formPosition}
      setFormPosition={setFormPosition}
      comments={options.comments}
      onCommentFormSubmit={callbacks.onCommentFormSubmit}
      isFormDisplayed={isAuth}
      warningCmp={renders.formWarning}
      warningCmpAdvanced={renders.formWarningAdvanced}
    />
  );
}

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default Comments;