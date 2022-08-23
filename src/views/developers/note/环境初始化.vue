<template>
  <div class="u-quill-body">
    <h1>工具版本</h1>
    <ul>
      <li class="u-color-light">node v14.16.0[截至 2023-04]</li>
      <li>node v16.13.0[推荐]</li>
      <li>yarn v1.22.x</li>
    </ul>
    <blockquote>历史版本v10.16.0， v12.22.4 参考<a href="https://github.com/nodejs/Release/#end-of-life-releases" target="_blank"> end-of-life-releases</a></blockquote>
    <h1>工具安装</h1>
    <div>
      <ul>
        <li>
          <code>VS Code</code>
          <a href="https://pc.qq.com/detail/16/detail_22856.html">下载地址</a>，部分插件如下：
          <ol>
            <li><code>Chinese (Simplified) Language Pack for Visual Studio Code</code> 一 中文语言包</li>
            <li><code>Vetur</code> 一 <code>Vue</code> 语法工具</li>
            <li><code>Auto Close Tag</code> 一 自动添加结束标签</li>
            <li><code>IntelliJ IDEA Keybindings</code> 一 <code>IntelliJ</code>风格快捷键</li>
          </ol>
          <blockquote>推荐登录账号同步，建议不要修改开发软件默认安装路径</blockquote>
        </li>
        <li>
          <a href="https://pc.qq.com/detail/13/detail_22693.html"><code>Git</code>下载地址</a>
        </li>
        <li>
          <a href="https://nodejs.org/en/blog/release/v16.13.0/"><code>Node</code>下载地址</a>
        </li>
      </ul>
      <h1>多Node管理工具 nvm</h1>
      <blockquote>推荐使用新版本Node开发,维护老项目需要切换低版本</blockquote>
      <ul>
        <li><a href="https://github.com/coreybutler/nvm-windows/releases">Github Download</a></li>
        <li>
          <p>国内镜像</p>
          <pre>
nvm node_mirror: http://npm.taobao.org/mirrors/node/
nvm npm_mirror: https://npm.taobao.org/mirrors/npm/ </pre
          >
        </li>
        <li>
          <p>常用命令</p>
          <pre>
nvm list              // 查看已安装的版本 * 为当期使用版本
nvm install 16.13.0   // 安装Node对应版本
nvm use 16.13.0       // 切换版本（需要管理员权限）</pre
          >
        </li>
      </ul>
      <h1>项目依赖包( yarn )</h1>
      <pre class="line-numbers"><code class="language-javascript">
 # npm config set registry https://registry.npm.taobao.org 
 npm install -g yarn --registry https://registry.npm.taobao.org
 yarn config set registry https://registry.npm.taobao.org -g
 yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
 # yarn global add @vue/cli
 # yarn config set electron_mirror https://cdn.npm.taobao.org/dist/electron/
</code> </pre>
      <h1 style="color: #ff4e20">﹡ 由于2021年 taobao npm 不稳定,以下备选</h1>
      <blockquote>
        <p>[非必须]去除node-sass 使用dart-sass ,(dart-sass2.0语法差异，这里使用固定版本)</p>
        <p>
          "sass": "~1.32.6", "sass-loader": "~10.2.0"
          <del>,"node-sass": "^4.12.0"</del>
        </p>
      </blockquote>
      <pre>
 # npm default registry	
 npm config set registry http://registry.npmjs.org

 # tencent npm registry  
 yarn config set registry  http://mirrors.cloud.tencent.com/npm/ 

 # huawei npm registry  
 yarn config set registry https://repo.huaweicloud.com/repository/npm/
 yarn config set sass_binary_site https://repo.huaweicloud.com/node-sass

 yarn cache clean -f
 </pre
      >
    </div>
    <h1>不兼容IE</h1>
    <h1 style="color: #ff4e20">﹡ 2022年6月15日起IE11将不再被支持</h1>
    <div></div>
    <h1>项目结构</h1>
    <pre class="line-numbers"><code class="language-javascript">
# public/
# mock/
# -------- index.html
# src/  # @
# -------- assets/ # 静态资源
# -------- components/ # 组件
# -------- utils/ # 工具
# -------- views/ # 程序页面
# -------- App.vue # 入口模板
# -------- main.ts # 主程序入口
# -------- router/ # 路由
# -------- store/ 
# vite.config.js 
</code></pre>

    <h1>项目启动</h1>
    <pre class="line-numbers"><code class="language-javascript">
yarn   # 安装依赖包
yarn dev   # 启动测试环境
yarn build   # 编译项目 
</code> </pre>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
