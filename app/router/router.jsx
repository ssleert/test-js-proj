const routerElementId = "router__"

const pathToRegex = path => new RegExp(
  "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
)

var routerGlobalContext = null
export const initRouter = ({pages, executePages}) => {
  const routerContext = {
    routes: pages,
    executePages: executePages,
    routeTarget: null,
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault()
        navigateTo(e.target.href)
      }
    });
  });

  window.addEventListener("popstate", e => {
    navigateTo(e.target.href)
  })

  routerGlobalContext = routerContext
  return routerContext
}

const setRoutePage = context => {
  const routerElement = document.getElementById(routerElementId)
  const page = context.executePages 
      ? context.routeTarget.view() 
      : context.routeTarget.view

  routerElement.innerHTML = ""

  if (page instanceof Array) {
    routerElement.append(...page)
    return
  }
  routerElement.append(page)
}

export const navigateTo = url => {
  history.pushState(null, "", url)
  setRouterTarget(routerGlobalContext)
  setRoutePage(routerGlobalContext)
}

const setRouterTarget = context => {
  const routes = context.routes
  const potentialMatches = routes.map(
    route => ({
      route: route,
      result: location.pathname.match(
        pathToRegex(route.path)
      ),
    }),
  );

  const match = potentialMatches.find(
    match => match.result !== null
  ) ?? {
    route: routes[0],
  }

  context.routeTarget = match.route
}

export const Router = ({ context }) => {
  setRouterTarget(context)
  return <div id={routerElementId}>
    {context.executePages 
       ? context.routeTarget.view()
       : context.routeTarget.view}
  </div>
}
