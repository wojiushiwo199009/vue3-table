import type { DirectiveBinding } from 'vue'
interface ElType extends HTMLElement {
  parentNode: any
}
let bindObj: DirectiveBinding | any = null
let tipDom: HTMLElement | any = null
let timer: ReturnType<typeof setTimeout> | null = null
let isInTip = false
function inDom(event: any) {
  const contDom = event.target
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (!tipDom && contDom.scrollWidth > contDom.offsetWidth) {
    tipDom = document.createElement('span')
    document.body.appendChild(tipDom)
    tipDom.innerHTML = `
      ${contDom.innerText}
      <div></div>
    `
    tipDom.setAttribute(
      'style',
      `position: fixed;
      border-radius: 2px;
      padding: 10px;
      font-size: 12px;
      line-height: 14px;
      word-wrap: break-word;
      background: #303133;
      color: #FFF;
      z-index:3000;
      max-width:500px;`
    )
    /**
     * 指示三角
     */
    const indicateDom = tipDom.getElementsByTagName('div')[0]
    indicateDom.setAttribute(
      'style',
      `position: absolute;
      width: 10px;
      height: 10px;
      top:${tipDom.offsetHeight - 5}px;
      left:${tipDom.offsetWidth / 2 - 5}px;
      z-index:3000;
      background: #303133;
      transform:rotate(45deg);
      -ms-transform:rotate(45deg);
      -moz-transform:rotate(45deg);
      -webkit-transform:rotate(45deg);
      -o-transform:rotate(45deg);
      `
    )
    // 挂载dom 相关位置信息
    const contSize = contDom.getBoundingClientRect()
    /**
     * 提示框左偏移量
     */
    let tipLeftOffset =
      contSize.left + contDom.offsetWidth / 2 - tipDom.offsetWidth / 2
    if (tipLeftOffset <= 0) {
      // 靠左
      tipLeftOffset = 10
      indicateDom.style.left = `${
        contSize.left + contDom.offsetWidth / 2 - 15
      }px`
    } else if (tipDom.offsetWidth + contSize.left >= window.innerWidth) {
      // 靠右
      tipLeftOffset = window.innerWidth - tipDom.offsetWidth - 10
      indicateDom.style.left = `${
        contSize.left - tipLeftOffset + contDom.offsetWidth / 2 - 5
      }px`
    }
    tipDom.style.left = `${tipLeftOffset}px`
    /**
     * 提示框上偏移量
     */
    let tipTopOffset = contSize.top - (tipDom.offsetHeight + 10)
    if (contSize.top <= tipDom.offsetHeight - 5) {
      // 靠上
      tipTopOffset = contSize.top + contDom.offsetHeight + 10
      indicateDom.style.top = `-5px`
    }
    tipDom.style.top = `${tipTopOffset}px`
  }
}
function outDom() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (tipDom && document.body.contains(tipDom)) {
    // 如果鼠标没有进入提示框，则移除提示框
    if (!isInTip) {
      document.body.removeChild(tipDom)
      tipDom = null
    }
  }
  if (tipDom && document.body.contains(tipDom)) {
    // 默认不可以复制
    if (bindObj.value && bindObj.value !== undefined) {
      tipDom.addEventListener('mouseenter', inTip)
      if (!timer) {
        timer = setTimeout(() => {
          if (!isInTip) {
            if (tipDom && document.body.contains(tipDom)) {
              document.body.removeChild(tipDom)
              tipDom = null
            }
          } else {
            tipDom.removeEventListener('mouseenter', inTip)
          }
          timer = null
        }, 200)
      }
    } else {
      document.body.removeChild(tipDom)
      tipDom = null
    }
  }
}
function inTip() {
  isInTip = true
  // 添加移出监听
  tipDom.addEventListener('mouseleave', outTip)
}
function outTip() {
  tipDom.removeEventListener('mouseleave', outTip)
  document.body.removeChild(tipDom)
  tipDom = null
  isInTip = false
}
// 自定义指令
const hideDirective = {
  mounted(el: ElType | any, binding: DirectiveBinding) {
    bindObj = binding
    el.style = `
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      `
    el.addEventListener('mouseenter', inDom)
    el.addEventListener('mouseleave', outDom)
  },
  beforeUnmount(el: ElType) {
    outDom()
  }
}

export default hideDirective
