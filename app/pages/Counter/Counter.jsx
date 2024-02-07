import {reactive} from "../../reactive/reactive.js"

export const Counter = () => {
  const count = reactive(0);

  return <>
    <button onClick={() => count.val++}>
      +
    </button>
    <div>
      {count}
    </div>
    <button onClick={() => count.val--}>
      -
    </button>
  </>
}
