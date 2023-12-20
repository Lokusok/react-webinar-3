import { useState, memo, useEffect } from 'react';

import { useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from 'react-redux';

import PropTypes from 'prop-types';
import CommentsList from '../../components/comments-list';

import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';

import CommentFormWarning from '../../components/comment-form-warning';
import CommentForm from '../../components/comment-form';
import Spinner from '../../components/spinner';

import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentsTitle from '../../components/comments-title';
import CommentsLayout from '../../components/comments-layout';

function Comments(props) {
  const dispatch = useDispatchRedux();
  const defaultSelect = useSelector((state) => ({
    isAuth: state.session.exists,
    currentUsername: state.session.user.profile?.name,
  }));
  const select = useSelectorRedux((state) => ({
    comments: state.comments.list,
    waiting: state.comments.waiting,
  }));
  const [formPosition, setFormPosition] = useState(false);

  const callbacks = {
    onCommentFormSubmit: (text, commentId) => {
      dispatch(commentsActions.addNew(text, props.articleId, commentId));
    },
  };

  const options = {
    comments: treeToList(listToTree(select.comments), (comment, level) => ({
      _id: comment._id, author: comment.author, text: comment.text, dateCreate: comment.dateCreate, level: level - 1
    })).slice(1),
    warningUrl: '/login',
    maxCommentLevel: 25,
    commentOffsetPer: 30,
  };

  const renders = {
    formWarning: <CommentFormWarning loginUrl={options.warningUrl} />,
    formWarningAdvanced: (callback) => (
      <CommentFormWarning
        loginUrl={options.warningUrl}
        variant="advanced"
        onClickCancel={callback}
      />
    ),
    commentFormFooter: <CommentForm onSubmit={callbacks.onCommentFormSubmit} title="Новый комментарий" />,
    commentFormComment: (onClickCancel, commentId) => (
      <CommentForm
        onSubmit={callbacks.onCommentFormSubmit}
        title="Новый ответ"
        variant="advanced"
        onClickCancel={onClickCancel}
        commentId={commentId}
      />
    ),
  };

  useEffect(() => {
    const controller = new AbortController();

    dispatch(commentsActions.load(props.articleId, false, controller.signal));

    return () => controller.abort();
  }, []);

  return (
    <Spinner disable={true} active={select.waiting}>
      <CommentsLayout
        title={(
          <CommentsTitle count={options.comments.length}>
            {props.t('comments.title')}
          </CommentsTitle>
        )}>

        <CommentsList
          formPosition={formPosition}
          setFormPosition={setFormPosition}
          comments={options.comments}
          onCommentFormSubmit={callbacks.onCommentFormSubmit}
          isFormDisplayed={defaultSelect.isAuth}
          warningCmp={renders.formWarning}
          warningCmpAdvanced={renders.formWarningAdvanced}
          commentFormFooter={renders.commentFormFooter}
          commentFormComment={renders.commentFormComment}
          currentUsername={defaultSelect.currentUsername}
          maxCommentLevel={options.maxCommentLevel}
          commentOffsetPer={options.commentOffsetPer}
        />
      </CommentsLayout>
    </Spinner>
  );
}

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
  t: PropTypes.func,
};

export default memo(Comments);