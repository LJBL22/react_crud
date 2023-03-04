import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onToggleDone,
  onSave,
  onDelete,
  onChangeMode,
}) => {
  return (
    <div>
      {todos.map((todo) => {
        //要把 id 也往上傳
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleDone={(id) => onToggleDone?.(id)}
          />
        );
      })}
    </div>
  );
};

export default TodoCollection;
