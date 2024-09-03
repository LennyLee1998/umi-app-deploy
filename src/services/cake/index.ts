import { request } from 'umi';

export const addCateApi = (cakeObj: object) => {
  console.log('aaa', cakeObj);
  return request('/classes/category', {
    method: 'POST',
    data: cakeObj,
  });
};

export const getAllCategoriesApi = () => {
  return request("/get-all-categories")
}