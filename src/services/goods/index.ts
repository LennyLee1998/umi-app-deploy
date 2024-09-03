import { request } from 'umi';
export const uploadGoodsImgApi = (base64Data: string) => {
  return request('/upload-goods-img', {
    method: 'POST',
    data: { base64Data },
  });
};

export const uploadManyGoodsApi = (goodsData: any) => {
  return request('/goods/many-trans', {
    data: { goodsData },
    method: 'POST',
  });
};
