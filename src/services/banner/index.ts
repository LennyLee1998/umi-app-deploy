import { request } from 'umi';

export const postUploadBannerApi = (formData: any) => {
  return request('/upload-banner', {
    data: formData,
    method: 'POST',
  });
};

export const getAllBannerApi = () => {
  return request('/get-all-banners');
};

export const editBannerApi = (bannerInfo: any) => {
  return request(`/edit-banner/${bannerInfo._id}`, {
    method: 'PUT',
    data: bannerInfo,
  });
};

export const deleteBannerApi = (id: string) => {
  return request(`/delete-banner/${id}`, {
    method: 'DELETE',
  });
};
