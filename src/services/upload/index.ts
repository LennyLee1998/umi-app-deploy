import { request } from 'umi';

export const postFileUploadApi = (formData: any) => {
  return request('/file-upload', {
    method: 'POST',
    data: { formData },
  });
};
