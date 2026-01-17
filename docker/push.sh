#!/bin/bash

# Docker Hub 推送脚本
# 用法: ./docker/push.sh <dockerhub-username>

set -e

if [ -z "$1" ]; then
    echo "错误: 请提供 Docker Hub 用户名"
    echo "用法: ./docker/push.sh <dockerhub-username>"
    exit 1
fi

USERNAME=$1
IMAGE_NAME="chitchatter"
FULL_IMAGE="${USERNAME}/${IMAGE_NAME}"

echo "=========================================="
echo "  Chitchatter Docker 镜像推送脚本"
echo "=========================================="
echo ""

# 检查是否已登录 Docker Hub
echo "检查 Docker Hub 登录状态..."
if ! docker info | grep -q "Username"; then
    echo "未登录 Docker Hub，请先执行: docker login"
    exit 1
fi

# 获取 Git commit hash 和版本
VERSION=$(node -p "require('./package.json').version")
COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
BUILD_TAG="${FULL_IMAGE}:${VERSION}"
LATEST_TAG="${FULL_IMAGE}:latest"
COMMIT_TAG="${FULL_IMAGE}:${COMMIT_HASH}"

echo "镜像信息:"
echo "  名称: ${FULL_IMAGE}"
echo "  版本: ${VERSION}"
echo "  Commit: ${COMMIT_HASH}"
echo ""

# 构建镜像
echo "=========================================="
echo "  步骤 1: 构建镜像"
echo "=========================================="
docker build -t ${IMAGE_NAME} .
echo ""

# 打标签
echo "=========================================="
echo "  步骤 2: 打标签"
echo "=========================================="
docker tag ${IMAGE_NAME} ${BUILD_TAG}
docker tag ${IMAGE_NAME} ${LATEST_TAG}
docker tag ${IMAGE_NAME} ${COMMIT_TAG}
echo "  ✓ ${BUILD_TAG}"
echo "  ✓ ${LATEST_TAG}"
echo "  ✓ ${COMMIT_TAG}"
echo ""

# 推送镜像
echo "=========================================="
echo "  步骤 3: 推送镜像"
echo "=========================================="
echo "推送版本标签: ${BUILD_TAG}"
docker push ${BUILD_TAG}

echo "推送 latest 标签: ${LATEST_TAG}"
docker push ${LATEST_TAG}

echo "推送 commit 标签: ${COMMIT_TAG}"
docker push ${COMMIT_TAG}
echo ""

# 完成提示
echo "=========================================="
echo "  推送完成！"
echo "=========================================="
echo ""
echo "拉取命令:"
echo "  docker pull ${FULL_IMAGE}"
echo ""
echo "运行命令:"
echo "  docker run -d --name chitchatter -p 3000:80 ${FULL_IMAGE}"
echo ""
echo "使用 docker-compose:"
cat <<EOF
version: '3.8'
services:
  chitchatter:
    image: ${FULL_IMAGE}
    container_name: chitchatter
    restart: unless-stopped
    ports:
      - "3000:80"
EOF
