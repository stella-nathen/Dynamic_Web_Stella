import { useState } from 'react'
import styles from './RecipeCard.module.css'

const UserRating = () => {
  const [count, setCount] = useState(0)

  const handlePlusClick = () => {
    setCount(count + 1)
  }

  const handleMinusClick = () => {
    setCount(count - 1)
  }

  return (
    <div className={styles.rating}>

      <span className={styles.rating_btn_slot}>
        {count > 0 && (
          <button
            onClick={handleMinusClick}
            className={styles.rating_btn}
          >
            -
          </button>
        )}
      </span>

      <span className={styles.hearts}>
        {[...Array(count)].map((heart, index) => (
          <span key={index}>♥</span>
        ))}
      </span>

      <span className={styles.rating_btn_slot}>
        {count < 5 && (
          <button
            onClick={handlePlusClick}
            className={styles.rating_btn}
          >
            +
          </button>
        )}
      </span>

    </div>
  )
}

export default UserRating