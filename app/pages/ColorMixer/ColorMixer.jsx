import typographyStyles from "../../styles/typography.module.css"
import styles from "./ColorMixer.module.css"
import { renderEffect } from "../../reactive/reactive.js"

const minColorInt = 0
const maxColorInt = 255
const colorMedian = Math.round(255 / 2)

const Slider = ({f}) => {
  const e = <input
      className={styles.slider}
      type="range" 
      min={minColorInt} 
      max={maxColorInt} 
      value={colorMedian}
      onInput={f}
  />

  renderEffect((e) => {
    console.log(e)
  }, e)

  return e
}

export const ColorMixer = () => {
  const RGB = {
    r: colorMedian,
    g: colorMedian,
    b: colorMedian
  }

  const onSliderChange = id => slider => {
    const val = slider.target.value
    switch (id) {
      case "r": RGB.r = val; break
      case "g": RGB.g = val; break
      case "b": RGB.b = val; break
    }

    const colorView = document.querySelector("." + styles.colorView)
    colorView.style["background"] = `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`
  }

  return <>
    <h3 className={typographyStyles.text}>
      simple color mixer
    </h3>

    <div 
      style={`background: rgb(${RGB.r}, ${RGB.g}, ${RGB.b});`} 
      className={styles.colorView}
    ></div>

    <div>
      r
      <Slider f={onSliderChange("r")} />
      g
      <Slider f={onSliderChange("g")} />
      b
      <Slider f={onSliderChange("b")} />
    </div>
  </>
}
