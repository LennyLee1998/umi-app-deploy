import { request } from 'umi';

export const getArticlesApi = () => {
  return request('/get-articles');
};

export const deleteArticleApi = (articleId: string) => {
  return request(`/delete-article/${articleId}`, {
    method: 'DELETE',
  });
};
