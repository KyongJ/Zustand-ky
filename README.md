# 手写简易Zustand

本仓库实现了一个简单的Zustand，通过一个小例子，用于学习Zustand的原理。

详细解析：

博客：https://kyongj.github.io/Kyong-Blog/%E5%8A%A8%E5%8A%A8%E8%84%91%E7%AD%8B/%E6%89%8B%E5%86%99%E7%AE%80%E6%98%93Zustand.html

掘金：https://juejin.cn/post/7452520977517101066

### 启动
```
pnpm install

pnpm dev
```
### 项目结构
```
zustand-demo/
├── src/
│   ├── store/
│   │   └── useBearStore.js      # Zustand store
│   ├── views/      
        └── Bears.tsx   
    ├── zustand-ky/      
        └── index.ts        # 负责定义和导出高层次的 API          
        └── vanlilla.ts     # 实现了状态管理的核心逻辑    
│   ├── App.tsx             # 顶层组件
│   ├── App.css             # 样式
│   └── main.tsx            # 入口文件
├── public/
│   └── index.html
└── package.json
```