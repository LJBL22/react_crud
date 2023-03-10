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
            onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })}
            onSave={({ id, title }) => onSave?.({ id, title })}
            onDelete={(id) => onDelete?.(id)}
          />
        );
      })}
    </div>
  );
};

export default TodoCollection;
