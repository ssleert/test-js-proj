import styles from "./styles/global.module.css"
import { initRouter, Router } from "./router/router.jsx"
import { Main } from "./pages/Main/Main.jsx"
import { ColorMixer } from "./pages/ColorMixer/ColorMixer.jsx"
import { NavBar } from "./components/NavBar/NavBar.jsx"

const pages = [
  { name: "main info", path: "/", view: <Main /> },
  { name: "color mixer", path: "/color_mixer", view: <ColorMixer /> },
]
const routerContext = initRouter({
  pages: pages, executePages: false,
})

const App = () => {
  return <div>
    <NavBar
      pages={pages}
    />
    <div className={styles.main}>
      <Router context={routerContext} />
    </div>
  </div>
}

window.document.getElementById("app").append(<App />)
