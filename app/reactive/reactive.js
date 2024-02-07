const callbackRenderEffects = _ => {
  for (const renderEffect of globalState.listenToDomElements) {
    if (renderEffect.element.isConnected) {
      renderEffect.callback(renderEffect.element)
    }
  }
}

new MutationObserver(
  callbackRenderEffects
).observe(document.getElementById("app"), {
  childList: true,
  subtree: true
})

const globalState = {
  listenToDomElements: [],
  reactiveReaction: []
}

export const renderEffect = (fn, element) => {
  globalState.listenToDomElements.push({
    callback: fn,
    element: element,
  })
}

export const reactive = value => {
  let subscribers = []

  return {
    __name: "reactiveVal",
    get val() { return value },
    set val(nextValue) {
      value = nextValue
      this.react()
      return value
    },

    set subscribe(fn) { subscribers.push(fn) },
    cleanup() { subscribers = [] },
    react() {
      for (const sub of subscribers) {
        sub()
      }
    },
  }
}

export const reaction = (fn, reactives) => {
  for (const reactive of reactives) {
    reactive.subscribe = fn
  }
}
