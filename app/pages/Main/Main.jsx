import styles from "./../../styles/typography.module.css"

export const Main = () => {
  return <div className={styles.text}>
    <h3>This is a simple modern SPA.</h3>
    <p>
      This small 3.5KB single page application uses its own extremely simple and
      lightweight jsx runtime, as well as its own incredibly lightweight router.
      It also uses lightningcss together with bun build tree shaking, which makes
      the output bundle incredibly small.
    </p>
    <p>
      Also since it has no external dependencies this application uses
      google closure compiler. Which not only optimizes the javascript
      but also makes our application's bundle even smaller.
    </p>
    <p>
      In fact, this approach is not really applicable in most cases.
      But since I have enough free time, I decided to try to implement
      it anyway.
    </p>

    <p>
      If you don't believe me about its size, you can take a look in 
      dev tools by pressing the F12 button.
    </p>
  </div>
}
