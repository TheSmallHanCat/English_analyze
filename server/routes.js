const express = require('express');
const aiService = require('./ai-service');
const router = express.Router();

// 分析文本接口
router.post('/analyze', async (req, res) => {
  const requestId = Date.now().toString(36);

  try {
    const { text, mode, scene, tone } = req.body;

    // 输入验证
    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        error: '请输入要分析的文本'
      });
    }

    if (!mode || !['word', 'sentence'].includes(mode)) {
      return res.status(400).json({
        success: false,
        error: '请选择正确的分析模式（word 或 sentence）'
      });
    }

    // 简洁日志
    const settings = [];
    if (scene) settings.push(`领域:${scene}`);
    if (tone) settings.push(`口吻:${tone}`);
    const settingsText = settings.length > 0 ? ` (${settings.join(', ')})` : '';
    console.log(`[${requestId}] ${mode}分析: "${text.substring(0, 20)}${text.length > 20 ? '...' : ''}"${settingsText}`);

    // 调用AI服务
    const result = await aiService.analyzeText(text.trim(), mode, scene, tone);

    console.log(`[${requestId}] 分析完成`);
    res.json(result);

  } catch (error) {
    console.error(`[${requestId}] 分析失败:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message || '分析过程中发生错误'
    });
  }
});

// 健康检查接口
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI英语分析服务运行正常',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

module.exports = router;
