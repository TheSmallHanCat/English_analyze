/**
 * 单词分析提示模板 - HTML输出格式
 */
function wordPrompt(word, scene = null, tone = null) {
  const sceneContext = scene ? `\n\n特别要求：请重点关注该单词在${scene}领域中的专业用法、常见搭配和表达方式。` : '';
  const toneContext = tone ? `\n\n回答风格：请采用${tone}的风格进行解释，让内容更加生动有趣。` : '';

  return `请以HTML格式提供英语单词"${word}"的详细分析，使用以下精确的HTML模板结构：${sceneContext}${toneContext}

<div class="word-card">
  <div class="card-header">
    ${word}
  </div>
  <div class="phonetics">
    <span><strong>英式发音:</strong> [英式音标]</span>
    <span><strong>美式发音:</strong> [美式音标]</span>
  </div>
  <div class="card-body">
    <h5 class="card-title">
      <i class="bi bi-book"></i> 词义
    </h5>
    <ul class="definition-list">
      <li class="definition-item">
        <span class="part-of-speech">[词性1]</span>
        <div class="meaning">[中文释义1]</div>
        <div class="meaning">[中文释义2]</div>
      </li>
      <li class="definition-item">
        <span class="part-of-speech">[词性2]</span>
        <div class="meaning">[中文释义1]</div>
      </li>
    </ul>

    <h5 class="card-title">
      <i class="bi bi-link-45deg"></i> 常见用法
    </h5>
    <div class="usages">
      <ul>
        <li>[常见搭配1]</li>
        <li>[常见搭配2]</li>
        <li>[常见搭配3]</li>
      </ul>
    </div>

    <h5 class="card-title">
      <i class="bi bi-chat-quote"></i> 例句
    </h5>
    <div class="example">
      <div class="english">1. [英文例句1]</div>
      <div class="translation">[中文翻译1]</div>
    </div>
    <div class="example">
      <div class="english">2. [英文例句2]</div>
      <div class="translation">[中文翻译2]</div>
    </div>
    <div class="example">
      <div class="english">3. [英文例句3]</div>
      <div class="translation">[中文翻译3]</div>
    </div>

    <div class="etymology">
      <h5 class="card-title mb-3">
        <i class="bi bi-tree"></i> 词源
      </h5>
      <p>[词源简介，使用中文]</p>
    </div>

    <div class="tips">
      <h5 class="card-title mb-3">
        <i class="bi bi-lightbulb"></i> 记忆技巧
      </h5>
      <p>[记忆方法，使用中文]</p>
    </div>
  </div>
</div>

要求：
1. 严格按照上述HTML模板结构输出
2. 替换所有方括号内的占位符为实际内容
3. 保持HTML标签和类名完全一致
4. 所有解释使用中文
5. 不要添加任何额外的HTML标签或修改结构

⚠️ 重要：请智能判断输入内容的有效性。如果输入的内容不是有效的英语单词或者短语，请直接返回：[INVALID_INPUT]

无效输入包括但不限于：
- 空白内容或纯空格
- 纯符号（如：???, !!!, @@@）
- 纯数字（如：123, 456）
- 无意义的字符组合（如：asdfgh, qwerty）
- 中文或其他非英语内容

请根据您的语言知识智能判断，对于边缘情况请倾向于尝试分析而不是拒绝。`;
}

/**
 * 句子分析提示模板 - HTML输出格式
 */
function sentencePrompt(sentence, scene = null, tone = null) {
  const sceneContext = scene ? `\n\n特别要求：请重点关注该句子在${scene}领域中的专业表达方式、术语使用和语言特点。` : '';
  const toneContext = tone ? `\n\n回答风格：请采用${tone}的风格进行解释，让内容更加生动有趣。` : '';

  return `请以HTML格式提供英语句子"${sentence}"的详细解析，使用以下精确的HTML模板结构：${sceneContext}${toneContext}

<div class="sentence-analysis">
  <div class="original-sentence">
    ${sentence}
  </div>
  <div class="translation">
    [整体中文翻译]
  </div>
  <div class="structure">
    <h5 class="section-title">句子结构</h5>
    <div class="structure-type"><strong>类型：</strong> [句子类型，如：简单句/复合句/复杂句]</div>
    <div class="structure-explanation">[详细的结构解释]</div>
  </div>

  <div class="components">
    <h5 class="section-title">句子成分</h5>
    <div class="component">
      <div class="role">主语</div>
      <div class="text"><strong>[主语部分]</strong></div>
      <div class="explanation">[主语说明]</div>
    </div>
    <div class="component">
      <div class="role">谓语</div>
      <div class="text"><strong>[谓语部分]</strong></div>
      <div class="explanation">[谓语说明]</div>
    </div>
    <div class="component">
      <div class="role">宾语</div>
      <div class="text"><strong>[宾语部分]</strong></div>
      <div class="explanation">[宾语说明]</div>
    </div>
    <div class="component">
      <div class="role">状语</div>
      <div class="text"><strong>[状语部分]</strong></div>
      <div class="explanation">[状语说明]</div>
    </div>
  </div>

  <div class="key-phrases">
    <h5 class="section-title">关键词汇与短语</h5>
    <div class="key-phrase">
      <div class="phrase">[重点短语1]</div>
      <div class="meaning"><strong>含义：</strong> [中文含义]</div>
      <div class="usage"><strong>用法：</strong> [用法说明]</div>
    </div>
    <div class="key-phrase">
      <div class="phrase">[重点短语2]</div>
      <div class="meaning"><strong>含义：</strong> [中文含义]</div>
      <div class="usage"><strong>用法：</strong> [用法说明]</div>
    </div>
    <div class="key-phrase">
      <div class="phrase">[重点短语3]</div>
      <div class="meaning"><strong>含义：</strong> [中文含义]</div>
      <div class="usage"><strong>用法：</strong> [用法说明]</div>
    </div>
  </div>

  <div class="grammar-points">
    <h5 class="section-title">语法分析</h5>
    <div class="grammar-point">
      <div class="aspect">[语法点1名称]</div>
      <div class="explanation">[详细解释]</div>
    </div>
    <div class="grammar-point">
      <div class="aspect">[语法点2名称]</div>
      <div class="explanation">[详细解释]</div>
    </div>
  </div>
</div>

要求：
1. 严格按照上述HTML模板结构输出
2. 替换所有方括号内的占位符为实际内容
3. 保持HTML标签和类名完全一致
4. 所有解释使用中文
5. 根据句子实际情况，如果某些成分不存在可以省略对应的component div
6. 提供至少3个关键短语分析
7. 提供至少2个语法要点分析
8. 不要添加任何额外的HTML标签或修改结构

⚠️ 重要：请智能判断输入内容的有效性。如果输入的内容不是有效的英语句子，请直接返回：[INVALID_INPUT]

无效输入包括但不限于：
- 空白内容或纯空格
- 纯符号（如：???, !!!, @@@）
- 纯数字（如：123456）
- 无意义的字符组合（如：asdfgh qwerty）
- 中文或其他非英语内容
- 过短的无意义内容（如：a, aa, 111）

请根据您的语言知识智能判断，对于边缘情况（如不完整的句子、口语化表达、网络用语等）请倾向于尝试分析而不是拒绝。`;
}

module.exports = {
  wordPrompt,
  sentencePrompt
};
