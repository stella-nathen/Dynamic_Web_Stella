import styles from './RecipeCard.module.css'

const InstructionsList = (props) => {
  const { instructions } = props

  return (
    <div className={styles.instructions_list}>
      <h3>Instructions</h3>

      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  )
}

export default InstructionsList