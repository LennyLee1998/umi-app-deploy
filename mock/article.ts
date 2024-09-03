import mockjs from 'mockjs';
export default {
  'GET /article/list': (req: any, res: any) => {
    res.json(
      mockjs.mock({
        success: true,
        'data|20': [
          {
            articleId: '@id',
            userId: '@id',
            title: '@ctitle',
            createAt: '@date',
            articleData: {
              showCount: '@integer(100,200)',
              readCount: '@integer(50,100)',
              greatCount: '@integer(60,100)',
              commentCount: '@integer(60,100)',
              favoriteCount: '@integer(20,100)',
            },
            content: '',
            isFavorite: '@boolean',
          },
        ],
        code: 200,
        message: 'article list retrived seccessfully',
      }),
    );
  },
};
