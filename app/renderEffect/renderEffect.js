const globalState = {
  inited: false,
  renderEffects: {},
  observer: null,
}

const callbackRenderEffects = mutations => {
  const callbackEffects = elements => {
    for (const element of elements) {
      const renderEffect = globalState.renderEffects[element.id]
      if (renderEffect) {
        renderEffect.callback(renderEffect.element)
      } else if (element.children) {
        callbackEffects(element.children)
      }
    }
  }

  for (const mutation of mutations) { 
    callbackEffects(mutation.addedNodes)
  }
}

export const renderEffect = (fn, element) => {
  if (!globalState.inited) {
    globalState.observer = new MutationObserver(callbackRenderEffects)
    globalState.observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
    globalState.inited = true
  } 

  const uniqueId = (Math.floor(Math.random() * 100000)).toString()
  element.id = uniqueId 
  
  globalState.renderEffects[uniqueId] = {
    callback: fn,
    element: element,
  }
}
