import styles from './RecipeCard.module.css'

const IngredientsList = (props) => {
  const { ingredients } = props

  return (
    <div className={styles.ingredients_list}>
      <h3>Ingredients</h3>

      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  )
}

export default IngredientsList