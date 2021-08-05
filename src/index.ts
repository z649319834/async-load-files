declare global {
  interface Window {
    asyncLoadFiles: any
  }
}
export interface FileItem {
  src: string // 加载来源
  tag: string // 标签
  attrs?: object // 标签属性对象
  inject?: string // 插入的位置
  children?: FileItem[] // 在onload后引入子集文件列表对象
  load?: Function // 在onload后的回调函数
}

const TAG_CONFIG: any = {
  script: 'src',
  link: 'href',
  img: 'src',
  iframe: 'src',
}

const asyncLoadFiles = function (fileList: FileItem[] = []) {
  fileList.forEach((item: FileItem) => {
    const { attrs, children, load, inject, src } = item
    let tag = item.tag || 'link'
    let urlAttrs: string = TAG_CONFIG[tag]
    if (!urlAttrs) {
      tag = 'link'
      urlAttrs = TAG_CONFIG[tag]
    }
    const elTag = document.createElement(tag) as HTMLElement | any
    elTag[urlAttrs] = src
    if (attrs) {
      Object.entries(attrs).forEach((arr) => {
        elTag.setAttribute(arr[0], arr[1])
      })
    }
    if (children || load) {
      elTag.onload = (evt: MessageEvent) => {
        if (children) {
          asyncLoadFiles(children)
        }
        if (typeof load === 'function') {
          load(evt)
        }
      }
      elTag.onerror = function (evt: MessageEvent) {
        console.error(`${src}加载失败!`, evt)
      }
    }
    if (inject === 'body') {
      document.body.appendChild(elTag)
    } else {
      document.head.appendChild(elTag)
    }
  })
}

if (window && typeof window === 'object') {
  window.asyncLoadFiles = asyncLoadFiles
}
export default asyncLoadFiles
