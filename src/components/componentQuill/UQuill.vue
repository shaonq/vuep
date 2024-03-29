<template>
  <div class="u-quill">
    <div v-show="!readonly" ref="toolbarEl" class="u-quill-toolbar">
      <template v-if="!readonly">
        <button class="ql-bold" title="粗体(Ctrl+B)" type="button">&#xe6d9;</button>
        <button class="ql-italic" title="斜体 (Ctrl+I)" type="button">&#xe6f8;</button>
        <i></i>
        <button class="ql-header" value="1" title="一级标题" type="button">&#xe68d;</button>
        <button class="ql-blockquote" title="引用块" type="button">&#xe649;</button>
        <button class="ql-list" value="bullet" title="无序列表" type="button">&#xe71b;</button>
        <button class="ql-list" value="ordered" title="有序列表" type="button">&#xe71a;</button>
        <button class="ql-divider" title="分割线" type="button">&#xe6e5;</button>
        <i v-if="isHandlers"></i>
        <button v-if="handlers.link" class="ql-link" title="链接" type="button">&#xe701;</button>
        <button v-if="handlers.image" class="ql-image" title="图片" type="button">&#xe6f5;</button>
        <button v-if="handlers.video" class="ql-video" title="视频" type="button">&#xe78e;</button>
        <i></i>
        <button class="ql-clear" title="清除格式" type="button">&#xe700;</button>
      </template>
    </div>
    <div ref="editorEl" class="u-quill-body u-scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// api: https://www.kancloud.cn/liuwave/quill/1409369
// bold 粗体
// italic 斜体
// italic 斜体
// underline 下划线
// header 标题  1 2
// size 大小 small | selected | large | huge
// list 排列方式 | ordered 有序排列 bullet 无序排列
// align 对齐方式 |  justify center  right
// code-block 代码块
// blockquote 应用块
// link 链接
// image 图片
// video 视频rr
// 插入图片  quill.insertEmbed(10, 'image', 'https://quilljs.com/images/cloud.png');
// 插入视频  quill.insertEmbed(10, 'video1', 'https://quilljs.com/images/cloud.png');
// var q = new Quill(document.createElement('div'));q.setContents(Delta),q.root.innerHTML
import Quill from './main.js'
export default {
  props: ['readonly', 'html', 'type', 'handlers'],
  computed: {
    isHandlers() {
      return !!Object.keys(this.handlers).length
    },
  },
  watch: {
    html(html) {
      this.setHtml(html)
    },
  },
  mounted() {
    const { editorEl, toolbarEl } = this.$refs
    const html = this.html || editorEl.innerText
    const quill = (this.quill = new Quill(editorEl, {
      modules: {
        toolbar: {
          container: toolbarEl,
          handlers: {
            clear: (btnValue) => {
              const range = quill.getSelection()
              quill.removeFormat(range.index, range.length)
            },
            divider: (btnValue) => {
              quill.insertEmbed(quill.getSelection().index, 'figure', '<hr>')
              quill.setSelection(quill.getSelection(true).index + 1)
            },
            // video: (btnValue) => {
            //   let { index } = quill.getSelection();
            //   this.handlers.video((val) =>
            //     quill.insertEmbed(index, "newVideo", val)
            //     quill.setSelection(quill.getSelection(true).index + 1);
            //   );
            // },
            image: (btnValue) => {
              const { index } = quill.getSelection()
              // image
              this.handlers.image((src) => {
                quill.insertEmbed(index, 'figure', `<img src="${src}">`)
                quill.setSelection(quill.getSelection(true).index + 1)
                quill.focus()
              })
            },
            link: (btnValue) => {
              const { index } = quill.getSelection()
              // this.handlers.link(val => quill.insertEmbed(index, "figure", `<a href="${val}" target="_balnk">${val}</a>`))
              this.handlers.link((val) => {
                const range = quill.getSelection(true)
                quill.insertEmbed(range.index, 'newLink', { href: val, innerText: val }, 'api')
                quill.setSelection(range.index + val.length)
              })
            },
          },
        },
      },
      readOnly: this.readonly,
      placeholder: '请输入内容',
    }))
    if (html) {
      this.setHtml(html)
    }
    // Event
    quill.on('text-change', (range) => {
      // let text = quill.getText().replace(/\s/g, "");
      // let html = quill.root.innerHTML;
      if (this.type === 'json') {
        const json = quill.getContents()
        this.$emit('change', JSON.stringify(json), quill)
      } else if (this.type === 'html') {
        this.$emit('change', quill.root.innerHTM, quill)
      } else {
        this.$emit('change', quill.getText(), quill)
      }
      // let outerText = this.type === "html" ? html : text;
      // if (!text) outerText = text;
      // this.$emit("change", outerText, quill);
    })
    quill.on('selection-change', (range, oldRange, source) => {
      // console.log(range, oldRange, source)
      this.$emit('selection', range, quill)
    })
    //Keyboard
    // quill.keyboard.addBinding({ key: 46 }, (range, context) => { console.log(range, context) });
    // debug
    //window.quill = quill;
  },
  methods: {
    setHtml(html) {
      const { type, quill } = this
      if (type === 'html') {
        quill.pasteHTML(html)
      } else if (type === 'json') {
        try {
          if (typeof html !== 'object') {
            html = JSON.parse(html)
          }
          quill.setContents(html)
        } catch (error) {
          quill.setText(html)
        }
      } else {
        quill.setText(html)
      }
    },
  },
}
</script>
