# Sử dụng Node.js phiên bản phù hợp
FROM node:16-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package.json package-lock.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng 3000 để truy cập server
EXPOSE 3000

# Khởi chạy server
CMD ["npm", "start"]
