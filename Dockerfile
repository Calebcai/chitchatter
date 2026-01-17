# 多阶段构建 - 构建阶段
FROM node:20.19.5-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装构建依赖（Python、make、g++ 用于编译 native 模块，git 用于 react-git-info）
RUN apk add --no-cache python3 make g++ gcc libc-dev git

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖（使用 install 代替 ci 以处理平台特定依赖）
RUN npm config set fetch-timeout 300000 && \
    npm config set fetch-retries 3 && \
    npm install && \
    # 手动安装 ARM64 musl 的 rollup native 模块
    npm install @rollup/rollup-linux-arm64-musl --save-optional

# 复制项目文件
COPY . .

# 初始化 git（PWA 插件需要）
RUN git init && git add -A && git config user.email "build@docker" && git config user.name "Docker Build" && git commit -m "build"

# 构建应用
RUN npm run build:app

# 生产阶段 - 使用 nginx
FROM nginx:alpine

# 复制自定义 nginx 配置
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
