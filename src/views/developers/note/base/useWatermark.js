function addResizeListener(element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}
function removeResizeListener(element, event, handler) {
  if (element && event) {
    element.removeEventListener(event, handler, false)
  }
}
function isHTMLElement(node) {
  return node instanceof window.HTMLElement || node instanceof HTMLElement
}
let tempOptions = {}
export default function useWatermark(appendEl) {
  if (!appendEl) appendEl = document.body
  if (!isHTMLElement(appendEl)) throw 'watermark-dom not`t HTMLElement'
  const update = function () {
    updateWatermark({ height: appendEl.clientHeight, width: appendEl.clientWidth })
  }
  const id = 'watermark-dom'
  let watermarkEl = document.getElementById(id)
  function clearWatermark() {
    appendEl.removeChild(watermarkEl)
    removeResizeListener(window, 'resize', update)
  }

  function createBase64(str, callback) {
    const can = document.createElement('canvas')
    const width = 320
    const height = 240
    can.width = width
    can.height = height
    const cans = can.getContext('2d')
    if (cans) {
      cans.rotate(-17.2 * (Math.PI / 180))
      cans.font = '17.2px Vedana'
      cans.fillStyle = 'rgba(0, 0, 0, 0.15)'
      cans.textAlign = 'left'
      cans.textBaseline = 'middle'
      cans.fillText(str, width / 20, height)
      callback && callback(cans)
    }
    return can.toDataURL('image/png', 0.88)
  }

  function updateWatermark(options) {
    if (!options) options = { width: 320, height: 240, str: '' }
    tempOptions = options
    const el = watermarkEl
    if (!el) return
    if (options.width) el.style.width = `${options.width}px`
    if (options.height) el.style.height = `${options.height}px`
    if (options.str) el.style.background = `url(${createBase64(options.str, options.callback)}) left top repeat`
  }

  function createWatermark(str) {
    if (watermarkEl) {
      updateWatermark({ str })
      return id
    }
    const div = document.createElement('div')
    watermarkEl = div
    div.id = id
    // div.style.pointerEvents = 'none'
    div.setAttribute('style', 'pointer-events: none !important; display: block !important')
    div.style.position = 'absolute'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.zIndex = '88888'
    updateWatermark({ str, width: appendEl.clientWidth, height: appendEl.clientHeight })
    appendEl.appendChild(div)
    mutationObserverChange()
    return id
  }

  function setWatermark(str) {
    createWatermark(str)
    addResizeListener(window, 'resize', update)
  }

  function mutationObserverChange() {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    if (!MutationObserver) return
    const option = { childList: true, attributes: true, subtree: true }
    const watermarkDom = new MutationObserver(function (records) {
      const record = records[0]
      if (!record) return
      /**
       * appendEl bind removedNodes[el === watermarkEl] *
       * watermarkEl bind attributes *
       */
      if ((record.removedNodes.length === 1 && record.removedNodes[0] === watermarkEl) || (record.target && record.target === watermarkEl)) {
        if (isHTMLElement(watermarkEl)) {
          watermarkDom.disconnect(watermarkEl, option)
          watermarkEl.remove()
        }
        watermarkEl = null
        setWatermark(tempOptions.str)
        watermarkDom.observe(watermarkEl, option)
      }
    })
    watermarkDom.observe(appendEl, option)
    watermarkDom.observe(watermarkEl, option)
  }

  return { setWatermark, clearWatermark }
}
