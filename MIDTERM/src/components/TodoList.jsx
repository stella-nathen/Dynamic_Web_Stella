import TodoItem from './TodoItem'

const TodoList = (props) => {
  const {todos, onDelete, onEdit, onToggle} = props

  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default TodoList