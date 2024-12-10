import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // 指定监听的IP地址
    port: 3333, // 指定服务器端口
    open: true, // 开发服务器启动时，自动在浏览器打开
    strictPort: false, // 若端口已被占用，就尝试下一个可用端口
    https: false, // 不开启 https 服务
    cors: true, // 允许跨域
  },
})
