const unpairedTags = new Set([
  "hr", "br", "input", "meta"
])

export const Fragment = (_) => _
export const jsx = (tagName, { children, ...attributes }) => {
  if (tagName === Fragment) {
    const divElement = document.createElement("div")
    if (children instanceof Array) {
      for (const child of children) {
        if (child instanceof Array) {
          divElement.append(...child)
        } else {
          divElement.append(child)
        }
      }
    } else {
      divElement.append(children)
    }
    return divElement
  }
  if (tagName instanceof Function) {
    return tagName(attributes)
  }


  const element = document.createElement(tagName)
  if (attributes) {
    for (const key in attributes) {
      if (key == "className") {
        element.setAttribute("class", attributes[key])
        continue
      }

      const eventName = key.match(/^on([A-Z]\w+)$/)
      if (eventName) {
        element.addEventListener(eventName[1].toLowerCase(), attributes[key])
      } else {
        element.setAttribute(key, attributes[key])
      }
    }
  }

  if (unpairedTags.has(tagName)) {
    return element
  }

  if (children == undefined) {
    return element
  }

  if (children instanceof Array) {
    for (const child of children) {
      if (child instanceof Array) {
        element.append(...child)
      } else {
        element.append(child)
      }
    }
  } else {
    element.append(children)
  }

  return element
}

export { jsx as jsxs }
