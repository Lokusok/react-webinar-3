export default {
  /**
   * Загрузка списка комментариев
   * @param id
   * @return {Function}
   */
  load: (id, update = false, signal) => {
    return async (dispatch, getState, services) => {
      if (!update) {
        dispatch({type: 'comments/load-start'});
      } else {
        dispatch({type: 'comments/load-update-start'})
      }

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
          signal
        });

        const comments = res.data.result.items;
        dispatch({type: 'comments/load-success', payload: {list: comments}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  addNew(text, articleId, commentId) {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/add-new-start'});

      try {
        const body = {
          text,
          parent: { _id: commentId ?? articleId, _type: commentId ? 'comment' : 'article' }
        };
        const jsonStr = JSON.stringify(body);

        const res = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted&search[parent]=${articleId}`,
          method: 'POST',
          body: jsonStr,
        });

        // Обновление по добавлению коммента
        // dispatch(this.load(articleId, true));
        dispatch({type: 'comments/add-new', payload: { item: res.data.result }})
        dispatch({type: 'comments/add-new-end'});
      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },
}
