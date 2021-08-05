# async-load-files

`async-load-files`是一个文件异步加载的工具函数，默认使用`link`标签加载，所有在使用的过程中，最好自行配置需要加载文件的标签以及其他配置项

## Install

```
npm install async-load-files

// or

yarn add async-load-files

```

## asyncLoadFiles(fileList[])

- fileList:`FileItem[]` 需要加载的文件列表
  - src: string 加载来源
  - tag: string 标签 link|script|img
  - attrs?: object 标签属性对象
  - inject?: string 插入的位置
  - children?: FileItem[] 在 onload 后引入子集文件列表对象
  - load?: Function 在 onload 后的回调函数

```
import asyncPreloadFiles from 'async-preload-files'

asyncLoadFiles([
  {
    src: 'https://static.npmjs.com/commons.93e8b254e6eadc8d7563.js',
    tag: 'script',
    inject: 'body',
    children: [
      {
        src: 'https://www.cnblogs.com/css/blog-common.min.css?v=Debhfu23wPtk_JbtBvuMXXMX7rLEfqOrKEs61xuUUDo',
        tag: 'link',
        attrs: {
          rel: 'stylesheet',
        },
      },
      {
        src: 'https://www.google-analytics.com/analytics.js',
        tag: 'script',
        load: function (evt) {
          console.log('analytics', evt)
        },
      },
    ],
    load: function (evt) {
      console.log('commons', this, evt)
      alert('commons已加载')
    },
  },
  {
    src: 'https://www.cnblogs.com/skins/SimpleMemory/bundle-SimpleMemory-mobile.min.css',
    tag: 'link',
    attrs: {
      rel: 'stylesheet',
    },
  },
  {
    src: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=493147230,3096476255&fm=195&app=88&f=JPEG?w=200&h=200',
    tag: 'img',
    inject: 'body',
  },
  {
    src: 'https://juejin.cn/?utm_source=gold_browser_extension',
    tag: 'iframe',
    inject: 'body',
  },
])

```
