import { useState, memo, useEffect, useMemo, useRef } from 'react';

import { useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from 'react-redux';

import PropTypes from 'prop-types';
import CommentsList from '../../components/comments-list';

import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import commentsActions from '../../store-redux/comments/actions';

import CommentFormWarning from '../../components/comment-form-warning';
import CommentForm from '../../components/comment-form';
import Spinner from '../../components/spinner';
import CommentsTitle from '../../components/comments-title';
import CommentsLayout from '../../components/comments-layout';
import SubCommentLayout from '../../components/sub-comment-layout';

import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function Comments({ articleId }) {
  const dispatch = useDispatchRedux();
  const defaultSelect = useSelector((state) => ({
    isAuth: state.session.exists,
    currentUsername: state.session.user.profile?.name,
  }));
  const select = useSelectorRedux((state) => ({
    comments: state.comments.list,
    waiting: state.comments.waiting,
  }));
  const [comments, setComments] = useState(select.comments);
  const [formPosition, setFormPosition] = useState(false);
  const formRef = useRef(null);
  const {t, lang} = useTranslate();

  const callbacks = {
    onCommentFormSubmit: (text) => {
      dispatch(commentsActions.addNew(text, articleId, formPosition));
      setFormPosition(false);
    },
    onCancelForm: () => {
      setFormPosition(false);
    },
  };

  const options = {
    warningUrl: '/login',
    maxCommentLevel: 25,
    commentOffsetPer: 30,
    scrollToSubComm: false, // true для проскролла к комменту или предупреждению
    getMaxOffset() {
      return this.maxCommentLevel * this.commentOffsetPer;
    },
  };

  const renders = {
    formWarning: (
      <CommentFormWarning
        linkText={t('comments.warningLink')}
        otherText={t('comments.warningOther')}
        loginUrl={options.warningUrl}
      />
    ),
    formWarningAdvanced: (level) => (
      <SubCommentLayout
        ref={formRef}
        scrollTo={options.scrollToSubComm}
        offsetX={Math.min(level * options.commentOffsetPer, options.getMaxOffset())}
      >
        <CommentFormWarning
          loginUrl={options.warningUrl}
          variant="advanced"
          onClickCancel={callbacks.onCancelForm}
          linkText={t('comments.warningLink')}
          otherText={t('comments.warningOther')}
          cancelText={t('comments.warningCancel')}
        />
      </SubCommentLayout>
    ),
    commentFormFooter: (
      <CommentForm
        onSubmit={callbacks.onCommentFormSubmit}
        title={t('comments.newCommentTitle')}
        submitText={t('comments.formSend')}
        cancelText={t('comments.formCancel')}
      />
    ),
    commentFormComment: (level) =>  (
      <SubCommentLayout
        ref={formRef}
        scrollTo={options.scrollToSubComm}
        offsetX={Math.min(level * options.commentOffsetPer, options.getMaxOffset())}
      >
        <CommentForm
          onSubmit={callbacks.onCommentFormSubmit}
          title={t('comments.newAnswerTitle')}
          variant="advanced"
          onClickCancel={callbacks.onCancelForm}
          submitText={t('comments.formSend')}
          cancelText={t('comments.formCancel')}
        />
      </SubCommentLayout>
    ),
  };

  const formattedVals = {
    comments: useMemo(() => treeToList(listToTree(comments), (comment, level) => {
      switch (comment.type) {
        case 'component':
          return {
            _id: Date.now(),
            type: 'component',
            component: defaultSelect.isAuth ?
              renders.commentFormComment(level - 1) :
              renders.formWarningAdvanced(level - 1),
            level: level - 1,
          };
        default:
          return {
            _id: comment._id,
            author: comment.author,
            text: comment.text,
            dateCreate: comment.dateCreate,
            level: level - 1,
          };
      }
    }).slice(1), [formPosition, comments, defaultSelect.isAuth]),
  };

  useEffect(() => {
    const controller = new AbortController();

    dispatch(commentsActions.load(articleId, false, controller.signal));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!formPosition) {
      setComments(select.comments);
      return;
    }

    const allComments = [...select.comments];
    allComments.push({
      type: 'component',
      parent: { _id: formPosition }
    });
    setComments(allComments);
  }, [formPosition, select.comments]);

  return (
    <Spinner disable={true} active={select.waiting}>
      <CommentsLayout
        title={(
          <CommentsTitle count={select.comments.length}>
            {t('comments.title')}
          </CommentsTitle>
        )}>

        <CommentsList
          formPosition={formPosition}
          setFormPosition={setFormPosition}
          comments={formattedVals.comments}
          onCommentFormSubmit={callbacks.onCommentFormSubmit}
          isFormDisplayed={defaultSelect.isAuth}
          warningCmp={renders.formWarning}
          commentFormFooter={renders.commentFormFooter}
          currentUsername={defaultSelect.currentUsername}
          maxCommentLevel={options.maxCommentLevel}
          commentOffsetPer={options.commentOffsetPer}
          activeLang={lang}
          t={t}
        />
      </CommentsLayout>
    </Spinner>
  );
}

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(Comments);