/*
 * 同步父窗口和 iframe 的 vue-router 状态
 */

let queue = []
let isIframeReady = false

function iframeReady (callback) {
  if (isIframeReady) {
    callback()
  } else {
    queue.push(callback)
  }
}

if (window.top === window) {
  window.addEventListener('message', event => {
    if (event.data.type === 'iframeReady') {
      isIframeReady = true
      queue.forEach(callback => callback())
      queue = []
    }
  })
} else {
  window.top.postMessage({ type: 'iframeReady' }, '*')
}

function getCurrentDir (vueRouter) {
  return vueRouter.history.current.path
}

/**
 * 同步 父页面
 * @param vueRouter
 */
export function syncPathToParent (vueRouter) {
  window.top.postMessage(
    { 
      type: 'replacePath',
      value: getCurrentDir(vueRouter)
    }, 
    '*'
  )
}

/**
 * 同步 子页面
 * @param vueRouter
 */
export function syncPathToChild (vueRouter) {
  const iframe = document.querySelector('iframe')
  if (iframe) {
    console.log('路由 to child', getCurrentDir(vueRouter))
    iframeReady(() => {
      console.log(getCurrentDir(vueRouter))
      iframe.contentWindow.postMessage(
        {
          type: 'replacePath',
          value: getCurrentDir(vueRouter)
        },
        '*'
      )
    })
  }
}

/**
 * 监听同步路径
 * @param router
 */
export function listenToSyncPath (router) {
  window.addEventListener('message', event => {
    if (event.data?.type !== 'replacePath') {
      return
    }

    const path = event.data?.value || ''
    // should preserve hash for anchor
    if (router.currentRoute.path !== path) {
      router.replace(path).catch(() => {})
    }
  })
}
