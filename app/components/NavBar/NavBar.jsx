import styles from "./NavBar.module.css"

export const NavBar = ({ pages }) => {
  return <>
    <nav className={styles.nav}>
      {pages.map(
        page => <a href={page.path} className={styles.link} data-link>
          {page.name}
        </a>
      )}
    </nav>
  </>
}
