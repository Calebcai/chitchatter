# Docker 部署指南

## 方式一：本地构建（NAS 上部署）

### 使用 docker-compose（推荐）

```bash
cd /path/to/chitchatter
docker-compose up -d
```

### 使用 docker 命令

```bash
# 构建镜像
docker build -t chitchatter .

# 运行容器
docker run -d --name chitchatter -p 3000:80 --restart unless-stopped chitchatter
```

---

## 方式二：从 Docker Hub 拉取

### 第一步：推送镜像到 Docker Hub

1. **注册 Docker Hub 账号**
   - 访问 https://hub.docker.com 注册账号

2. **登录 Docker Hub**

   ```bash
   docker login
   ```

3. **构建并推送镜像**

   ```bash
   # 给脚本执行权限
   chmod +x docker/push.sh

   # 推送镜像（替换为你的 Docker Hub 用户名）
   ./docker/push.sh <your-dockerhub-username>
   ```

### 第二步：在 NAS 上拉取并运行

```bash
# 拉取镜像
docker pull <your-dockerhub-username>/chitchatter:latest

# 运行容器
docker run -d --name chitchatter -p 3000:80 --restart unless-stopped <your-dockerhub-username>/chitchatter:latest
```

或使用 docker-compose：

```yaml
version: '3.8'
services:
  chitchatter:
    image: <your-dockerhub-username>/chitchatter:latest
    container_name: chitchatter
    restart: unless-stopped
    ports:
      - '3000:80'
```

---

## 配置选项

### 修改端口

修改 `docker-compose.yml` 中的端口映射：

```yaml
ports:
  - '8080:80' # 使用 8080 端口
```

### 使用 Hash Router

如果需要使用 Hash Router（适合某些 NAS 环境）：

```yaml
environment:
  - VITE_ROUTER_TYPE=hash
```

---

## 反向代理配置

### Nginx Proxy Manager

添加 Proxy Host：

- Domain: `chitchatter.yourdomain.com`
- Forward Hostname/IP: `chitchatter` (容器名)
- Forward Port: `80`

### Traefik

添加 labels 到 docker-compose.yml：

```yaml
labels:
  - 'traefik.enable=true'
  - 'traefik.http.routers.chitchatter.rule=Host(`chitchatter.yourdomain.com`)'
  - 'traefik.http.services.chitchatter.loadbalancer.server.port=80'
```

---

## 常用命令

```bash
# 查看日志
docker logs -f chitchatter

# 停止容器
docker stop chitchatter

# 启动容器
docker start chitchatter

# 删除容器
docker rm -f chitchatter

# 删除镜像
docker rmi chitchatter

# 更新镜像
docker-compose pull
docker-compose up -d
```
