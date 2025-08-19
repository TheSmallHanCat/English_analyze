// AI英语分析程序 - 主要JavaScript文件

class EnglishAnalyzer {
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.initSceneSettings();
  }

  initializeElements() {
    this.textInput = document.getElementById('textInput');
    this.analyzeBtn = document.getElementById('analyzeBtn');
    this.loadingIndicator = document.getElementById('loadingIndicator');
    this.resultContainer = document.getElementById('resultContainer');
  }

  bindEvents() {
    // 分析按钮点击事件
    this.analyzeBtn.addEventListener('click', () => this.analyzeText());

    // 输入框回车事件
    this.textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.analyzeText();
      }
    });
  }

  initSceneSettings() {
    // 场景模式切换事件
    const sceneModeInputs = document.querySelectorAll('input[name="sceneMode"]');
    sceneModeInputs.forEach(input => {
      input.addEventListener('change', () => this.handleSceneModeChange());
    });

    // 口吻模式切换事件
    const toneModeInputs = document.querySelectorAll('input[name="toneMode"]');
    toneModeInputs.forEach(input => {
      input.addEventListener('change', () => this.handleToneModeChange());
    });

    // 初始化当前场景显示
    this.updateCurrentSceneDisplay();
  }

  openSceneModal() {
    const modal = document.getElementById('sceneModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  closeSceneModal() {
    const modal = document.getElementById('sceneModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  confirmSceneSettings() {
    this.updateCurrentSceneDisplay();
    this.closeSceneModal();
  }

  handleSceneModeChange() {
    const selectedMode = document.querySelector('input[name="sceneMode"]:checked').value;
    const customSceneInput = document.getElementById('customSceneInput');

    if (selectedMode === 'custom') {
      customSceneInput.classList.remove('d-none');
    } else {
      customSceneInput.classList.add('d-none');
    }
  }

  handleToneModeChange() {
    const selectedMode = document.querySelector('input[name="toneMode"]:checked').value;
    const customToneInput = document.getElementById('customToneInput');

    if (selectedMode === 'custom') {
      customToneInput.classList.remove('d-none');
    } else {
      customToneInput.classList.add('d-none');
    }
  }

  updateCurrentSceneDisplay() {
    const selectedMode = document.querySelector('input[name="sceneMode"]:checked').value;
    const currentSceneText = document.getElementById('currentSceneText');

    if (selectedMode === 'custom') {
      const customScene = document.getElementById('customScene').value.trim();
      currentSceneText.textContent = customScene || '自定义';
    } else {
      const sceneMap = {
        'general': '通用',
        'business': '商务',
        'academic': '学术',
        'technical': '技术',
        'daily': '日常'
      };
      currentSceneText.textContent = sceneMap[selectedMode] || '通用';
    }
  }

  getSceneContext() {
    const selectedMode = document.querySelector('input[name="sceneMode"]:checked').value;

    if (selectedMode === 'general') {
      return null; // 通用模式不添加场景上下文
    }

    if (selectedMode === 'custom') {
      const customScene = document.getElementById('customScene').value.trim();
      return customScene || null;
    }

    // 预设场景映射
    const sceneMap = {
      'business': '商务英语',
      'academic': '学术英语',
      'technical': '技术文档',
      'daily': '日常对话'
    };

    return sceneMap[selectedMode] || null;
  }

  getToneContext() {
    const selectedMode = document.querySelector('input[name="toneMode"]:checked').value;

    if (selectedMode === 'normal') {
      return null; // 通用口吻不添加特殊要求
    }

    if (selectedMode === 'custom') {
      const customTone = document.getElementById('customTone').value.trim();
      return customTone || null;
    }

    // 预设口吻映射
    const toneMap = {
      'humorous': '幽默风趣',
      'catgirl': '你是一只猫娘，请用可爱的口吻回答'
    };

    return toneMap[selectedMode] || null;
  }

  async analyzeText() {
    const text = this.textInput.value.trim();
    if (!text) {
      this.showError('请输入要分析的文本');
      return;
    }

    const mode = document.querySelector('input[name="analysisMode"]:checked').value;
    const sceneContext = this.getSceneContext();
    const toneContext = this.getToneContext();

    try {
      this.showLoading();

      const response = await axios.post('/api/analyze', {
        text: text,
        mode: mode,
        scene: sceneContext,
        tone: toneContext
      });

      if (response.data.success) {
        this.showResult(response.data.content, mode);
      } else {
        // 处理特定的错误类型
        if (response.data.error === 'INVALID_INPUT') {
          this.showInvalidInputError(mode);
        } else {
          this.showError(response.data.error || '分析失败');
        }
      }
    } catch (error) {
      console.error('分析错误:', error);
      if (error.response?.data?.error) {
        this.showError(error.response.data.error);
      } else {
        this.showError('网络错误，请检查连接');
      }
    } finally {
      this.hideLoading();
    }
  }

  showLoading() {
    this.loadingIndicator.classList.remove('d-none');
    this.resultContainer.classList.add('d-none');
    this.analyzeBtn.disabled = true;
    this.analyzeBtn.innerHTML = '<i class="bi bi-hourglass-split"></i>';
  }

  hideLoading() {
    this.loadingIndicator.classList.add('d-none');
    this.analyzeBtn.disabled = false;
    this.analyzeBtn.innerHTML = '<i class="bi bi-search"></i>';
  }

  showResult(content, mode) {
    // 显示结果头部
    this.resultContainer.innerHTML = `
      <div class="result-header">
        <h3>${mode === 'word' ? '📚 单词分析结果' : '📝 句子解析结果'}</h3>
        <div class="result-actions">
          <div class="action-group">
            <button class="action-btn" onclick="analyzer.copyResult()" title="复制结果">
              <i class="bi bi-clipboard"></i>
            </button>
            <button class="action-btn" onclick="analyzer.clearResult()" title="清除结果">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="analysis-content animate__animated animate__fadeIn" id="exportContent">
        <!-- 结果将在这里渲染 -->
      </div>
    `;

    const analysisContent = this.resultContainer.querySelector('.analysis-content');

    // 单词模式和句子模式都直接渲染HTML
    const cleanHtml = DOMPurify.sanitize(content);
    analysisContent.innerHTML = cleanHtml;

    this.resultContainer.classList.remove('d-none');

    // 滚动到结果区域
    this.resultContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }





  showError(message) {
    this.resultContainer.innerHTML = `
      <div class="error-message">
        <div class="error-icon">⚠️</div>
        <h3>分析失败</h3>
        <p>${message}</p>
        <button class="retry-btn" onclick="analyzer.clearResult()">
          重试
        </button>
      </div>
    `;
    this.resultContainer.classList.remove('d-none');
  }

  showInvalidInputError(mode) {
    const modeText = mode === 'word' ? '单词' : '句子';
    const examples = mode === 'word'
      ? '例如：hello, beautiful, understand'
      : '例如：Hello world, I love English, How are you?';

    this.resultContainer.innerHTML = `
      <div class="error-message invalid-input">
        <div class="error-icon">🤔</div>
        <h3>输入内容有误</h3>
        <p>请检查您输入的内容，确保是有效的英语${modeText}。</p>
        <div class="error-details">
          <h4>有效输入示例：</h4>
          <p class="examples">${examples}</p>
          <h4>请避免：</h4>
          <ul class="avoid-list">
            <li>空白内容或纯符号</li>
            <li>纯数字或无意义字符</li>
            <li>中文内容</li>
            ${mode === 'word' ? '<li>过长的文本（请使用句子模式）</li>' : '<li>过短或过长的内容</li>'}
          </ul>
        </div>
        <button class="retry-btn" onclick="analyzer.clearResult()">
          重新输入
        </button>
      </div>
    `;
    this.resultContainer.classList.remove('d-none');
  }

  copyResult() {
    const analysisContent = this.resultContainer.querySelector('.analysis-content');
    if (analysisContent) {
      const text = analysisContent.innerText;
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('结果已复制到剪贴板');
      }).catch(() => {
        this.showToast('复制失败，请手动选择复制');
      });
    }
  }

  clearResult() {
    this.resultContainer.classList.add('d-none');
    this.textInput.focus();
  }



  showToast(message) {
    // 创建简单的toast提示
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary);
      color: white;
      padding: 0.75rem 1rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow-lg);
      z-index: 1001;
      font-size: 0.875rem;
      font-weight: 500;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }








}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }

  .toast {
    animation: slideIn 0.3s ease;
  }

  @media (max-width: 768px) {
    .result-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .result-actions {
      justify-content: center;
    }
  }
`;
document.head.appendChild(style);

// 检查依赖库加载状态
function checkLibraries() {
  const libraries = {
    'html2canvas': typeof html2canvas !== 'undefined',
    'jsPDF': typeof window.jspdf !== 'undefined',
    'DOMPurify': typeof DOMPurify !== 'undefined',
    'axios': typeof axios !== 'undefined'
  };

  console.log('📚 依赖库加载状态:', libraries);

  const allLoaded = Object.values(libraries).every(loaded => loaded);
  if (!allLoaded) {
    console.warn('⚠️ 部分依赖库未加载，导出功能可能不可用');
  }

  return allLoaded;
}

// 初始化应用
const analyzer = new EnglishAnalyzer();

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 AI英语分析程序已启动');
  console.log('🎨 使用现代青绿色配色方案');
  console.log('📝 支持Markdown格式输出');

  // 检查依赖库
  setTimeout(() => {
    checkLibraries();
  }, 1000);
});
