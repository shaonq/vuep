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

export default function useWatermark(appendEl) {
  if (!appendEl) appendEl = document.body
  const func = function () {
    const el = appendEl
    if (!el) return
    updateWatermark({ height: el.clientHeight, width: el.clientWidth })
  }
  const id = 'watermark-dom'
  let watermarkEl = document.getElementById(id)
  function clearWatermark() {
    const el = appendEl
    if (!el) return
    el.removeChild(watermarkEl)
    removeResizeListener(window, 'resize', func)
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
    return can.toDataURL('image/png')
  }

  function updateWatermark(options) {
    if (!options) options = { width: 320, height: 240, str: '' }
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
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.position = 'absolute'
    div.style.zIndex = '99999'
    const el = appendEl
    if (!el) return id
    updateWatermark({ str, width: el.clientWidth, height: el.clientHeight })
    el.appendChild(div)
    return id
  }

  function setWatermark(str) {
    createWatermark(str)
    addResizeListener(window, 'resize', func)
  }

  return { setWatermark, clearWatermark }
}
