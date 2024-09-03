import { request } from 'umi';

export const postLogin = (userInfo: any) => {
  return request('/login', {
    method: 'POST',
    data: userInfo,
  });
};

export const roleAddApi = (role: any) => {
  return request('/add-role', {
    method: 'POST',
    data: { role },
  });
};

export const getAllRolesApi = () => {
  return request('/get-all-roles', {
    method: 'get',
  });
};

export const newAccountApi = (accountInfo) => {
  return request('/create-user', {
    method: 'POST',
    data: accountInfo,
  });
};
