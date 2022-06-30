<template>
  <div>
    <div class="u-quill-body">
      <div id="qq">
        <h1>网页截图</h1>
        <ol>
          <li><code>html2canvas.js</code> 网页转换为图片</li>
          <li><code>jspdf.js</code> 图片转换为pdf文件</li>
        </ol>
        <hr />
        <img src="https://imgs.aixifan.com/jy9Gvt7hIk-iYn2Qf-iyUvai-zMf2ya-qeeeea.jpg" @click="imageView" />
        <hr />
        <p @click="$util.toast('123')">点击测试↓</p>
      </div>
    </div>
    <div class="u-btn__group u-mb u-ml">
      <a class="u-btn" @click="appendCanvas()">生成截图</a>
      <a class="u-btn" @click="downloadPDF()">下载PDF</a>
    </div>
  </div>
</template>

<script>
import shaonq from 'shaonq'
export default {
  setup() {
    return {
      // 截取el内部内容
      captureCanvas({ el, success }) {
        const dom = shaonq.dom
        const { loadJs } = shaonq
        ;(async function () {
          if (typeof html2canvas === 'undefined') {
            console.time('html2canvas v1.0.0-rc.7')
            await loadJs('https://unpkg.com/html2canvas@1.0.0-rc.7/dist/html2canvas.min.js')
            console.timeEnd('html2canvas v1.0.0-rc.7')
          }
          const p = dom.position(el)
          // @bug offset
          window.scrollTo(p.pageXOffset, p.top)
          const canva = document.createElement('canvas')
          const dpi = window.devicePixelRatio || 1
          const w = p.width * dpi
          const h = p.height * dpi
          const scale = 2
          canva.width = w * scale
          canva.height = h * scale
          canva.style.width = w + 'px'
          canva.style.height = h + 'px'
          const ctx = canva.getContext('2d')
          ctx.scale(scale, scale)
          window.html2canvas(el, { canvas: canva, background: '#FFFFFF', scrollY: 0, scrollX: 0, width: w, height: h, useCORS: true }).then(success)
        })()
      },
      // 生成pdf
      createPDF({ canvas, pdfName }) {
        const { loadJs } = shaonq
        ;(async function () {
          console.time('create pdf')
          if (typeof jsPDF === 'undefined') {
            console.time('jspdf v1.3.1')
            await loadJs('https://unpkg.com/jspdf@1.3.1/dist/jspdf.min.js')
            console.timeEnd('jspdf v1.3.1')
          }
          // px 转 9pt
          const a4pt = { width: 594.3, height: 840.51 }
          const allHeight = canvas.height * (a4pt.width / canvas.width)
          const pdfWidth = a4pt.width
          const pdfheight = a4pt.height
          const base64 = canvas.toDataURL('image/jpeg', 0.83)
          const pageCount = Math.ceil(allHeight / pdfheight)
          let pdf = new window.jsPDF('', 'pt', 'a4')
          for (let page = 1; page <= pageCount; page++) {
            const top = -(page - 1) * pdfheight
            // 最后一页如果小于5px，则跳过打印
            if (pdfheight - (page * pdfheight - allHeight) < 5) {
              return
            }
            pdf.addImage(base64, 'JPEG', 0, top, pdfWidth, allHeight)
            if (page !== pageCount) {
              pdf.addPage()
            }
          }
          // @todo debug
          // let a = document.createElement('a');
          // a.href = base64;
          // a.download = pdfName + ".jpg";
          // a.click();
          // 导出pdf文件命名
          pdf.save(pdfName + '.pdf')
          pdf = canvas = null
          console.timeEnd('create pdf')
        })()
      },
      // 查看截图
      appendCanvas() {
        const dom = shaonq.dom
        const el = dom.el('#qq')
        const p = dom.position(el)
        this.captureCanvas({
          el,
          success: (canvas) => {
            const src = canvas.toDataURL('image/jpeg', 0.83)
            const img = new Image()
            img.src = src
            img.onload = () => dom.append(img, dom.el('#qq'))
            dom.on(img, 'click', this.imageView)
          },
        })
      },
      // 下载内容
      downloadPDF() {
        const dom = shaonq.dom
        const el = dom.el('#qq')
        this.captureCanvas({
          el,
          success: (canvas) => {
            this.createPDF({ canvas, pdfName: shaonq.date.today() })
          },
        })
      },
      // 点击图片放大
      imageView(e) {
        shaonq.showImageView(e.target)
      },
    }
  },
}
</script>

<style></style>
