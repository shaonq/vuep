<template>
  <div>
    <div class="u-quill-body">
      <h1>在线阅读pdf</h1>
      <div class="u-flex">
        <div class="u-flex__item"><input v-model="value" class="u-input" placeholder="请输入一个在线地址" /></div>
        <div><button class="u-btn u-ml" @click="loadDemo()">在线查看</button></div>
      </div>
      <div style="min-height: 600px">
        <div v-if="loading === true" class="u-skeleton is-loading">
          <p v-for="i in 10" :key="i" class="u-skeleton__item"></p>
        </div>
        <!-- pdf view -->
        <div v-show="loading === false" id="view" class="pdfViewer"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import shaonq from 'shaonq'
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('https://shaonq.github.io/md/file/如何快速实现网页预览PDF文件.pdf')
    const loading = ref(undefined)
    async function loadPdfPath(el, path) {
      if (!window.pdfjsLib) {
        console.time('pdfjs v2.5.207')
        await shaonq.loadJs('https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.js')
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.js'
        console.timeEnd('pdfjs v2.5.207')
      }
      return new Promise(function (resolve, reject) {
        window.pdfjsLib
          .getDocument(path)
          .promise.then((pdf) => {
            const curr = 1,
              numPages = pdf.numPages
            const loadPdfPage = (pageNumber) => {
              return pdf.getPage(pageNumber).then(function (pdfPage) {
                // Display page on the existing canvas with 100% scale.
                const viewport = pdfPage.getViewport({ scale: 2 })
                let canvas = document.createElement('canvas')
                canvas.width = viewport.width || 794
                canvas.height = viewport.height || 1123
                canvas.style.width = '100%'
                canvas.style.display = 'block'
                canvas.style.borderRadius = '4px'
                const ctx = canvas.getContext('2d')
                const renderTask = pdfPage.render({ canvasContext: ctx, viewport: viewport })
                let div = document.createElement('div')
                div.className = 'pdfSection'
                div.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.16)'
                div.style.margin = '12px'
                div.style.borderRadius = '4px'
                div.appendChild(canvas)
                el.appendChild(div)
                div = canvas = null
                return renderTask.promise
              })
            }
            const init = (curr) => {
              loadPdfPage(curr).then(() => {
                curr++
                if (numPages >= curr) {
                  init(curr)
                }
              })
            }
            init(curr)
            resolve(numPages)
          })
          .catch(reject)
      })
    }
    async function loadDemo() {
      loading.value = true
      try {
        const el = document.getElementById('view')
        const page = await loadPdfPath(el, value.value)
        shaonq.showNearby({ content: `加载了一个 ${page} 页的pdf文件`, offset: ['100px', 'auto'] })
        loading.value = false
      } catch (error) {
        console.log(error)
      }
    }

    // onMounted(async () => { await loadDemo()    })
    return {
      value,
      loading,
      loadDemo,
    }
  },
})
</script>

<style lang="scss">
.pdfViewer {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #f5f5f5;
  border: 1px solid #d8d8d8;
  overflow: auto;
}
</style>
