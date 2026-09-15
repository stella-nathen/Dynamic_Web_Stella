import styles from './RecipeCard.module.css'

const RecipeImg = (props) => {
  const { imgSrc, imgAlt } = props

  return (
    <img
      src={imgSrc}
      alt={imgAlt}
      className={styles.img}
    />
  )
}

export default RecipeImg