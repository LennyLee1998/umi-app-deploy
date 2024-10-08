FROM node:22-alpine as builder

WORKDIR /code

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json package-lock.json /code/
RUN yarn

ADD . /code
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/dist /usr/share/nginx/html