import { RECIPE_DATA } from './recipe-data'
import Card from './Card'
import RecipeImg from './RecipeImg'
import RecipeInfo from './RecipeInfo'
import IngredientsList from './IngredientsList'
import InstructionsList from './InstructionsList'
import UserRating from './UserRating'
import styles from './RecipeCard.module.css'

export default function RecipeCard() {
  return (
    <Card>
      <RecipeImg
        imgSrc={RECIPE_DATA.imgSrc}
        imgAlt={RECIPE_DATA.imgAlt}
      />

      <div className={styles.card_text}>
        <RecipeInfo
          title={RECIPE_DATA.title}
          description={RECIPE_DATA.description}
        />

        <div className={styles.card_lists}>
          <IngredientsList ingredients={RECIPE_DATA.ingredients} />
          <InstructionsList instructions={RECIPE_DATA.instructions} />
        </div>

        <UserRating />
      </div>
    </Card>
  )
}