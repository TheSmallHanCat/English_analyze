# 基于AI大模型的英语分析程序

一个基于AI的英语学习助手，支持单词和句子的智能分析，帮助你学习简单的英语单词、短语以及复杂句子

## ✨ 特性

- 🔍 **智能分析**: 支持英语单词和句子的深度分析
- 📝 **HTML输出**: 美观的HTML格式结果，支持丰富的排版
- 📱 **响应式**: 完美适配桌面和移动设备
- ⚡ **高性能**: 使用pnpm包管理器，快速安装和启动
- 🔒 **安全**: 内置XSS防护，安全的HTML渲染

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 使用pnpm安装依赖
pnpm install
```

### 配置API

1. 复制环境变量文件：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，配置你的AI API信息：
```env
AI_API_ENDPOINT=https://api.openai.com/v1
AI_API_KEY=your-openai-api-key-here
AI_MODEL=gpt-4-turbo-preview
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=2000
PORT=3000
```

### 启动服务

```bash
# 开发模式
pnpm run dev
```

访问 `http://localhost:3000` 开始使用！

## 📖 使用说明

### 单词分析模式

1. 选择"单词模式"
2. 输入英语单词
3. 点击"分析"按钮
4. 查看包含音标、释义、例句、词源等信息的详细分析

### 句子解析模式

1. 选择"句子解析模式"
2. 输入英语句子
3. 点击"分析"按钮
4. 查看包含翻译、语法结构、重点短语等信息的详细解析

### 设置

1. 支持选择预设领域、自定义领域
2. 支持选择预设口吻、自定义口吻

## 📁 项目结构

```
ai-english-analyzer/
├── .env.example            # 环境变量模板
├── public/                 # 静态资源
│   ├── css/
│   │   └── style.css       # 主样式文件
│   ├── js/
│   │   └── main.js         # 主JavaScript文件
│   └── index.html          # 主页面
├── server/                  # 后端代码
│   ├── ai-service.js       # AI服务
│   ├── prompt-templates.js # 提示模板
│   └── routes.js           # 路由
├── app.js                  # 应用入口
├── package.json            # 项目配置
└── README.md              # 项目说明
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和PR

---

*🌟 如果这个项目对你有帮助，请给个Star支持一下！*
