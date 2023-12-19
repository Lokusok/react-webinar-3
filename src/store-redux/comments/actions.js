import listToTree from "../../utils/list-to-tree";

export default {
  /**
   * Загрузка списка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        // const comments = listToTree(res.data.result.items);
        const comments = res.data.result.items;
        console.log('Получил комментарии с сервера: ', comments);
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
        console.log(`Пришёл id: `, commentId);
        const body = {
          text,
          parent: { _id: commentId ?? articleId, _type: commentId ? 'comment' : 'article' }
        };
        const jsonStr = JSON.stringify(body);

        console.log(body);

        await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`,
          method: 'POST',
          body: jsonStr,
        });

        // Обновление по добавлению коммента
        dispatch(this.load(articleId));

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },
}
