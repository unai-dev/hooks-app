/**
 * Definimos la interfaz para indicar como luce la tarea
 */
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * Definimos la interfaz para indicar como luce el estado("state")
 */
interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

// Declaramos los tipos que contienen la accion("action")
export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

export const getTasksInitialState = (): TaskState => {
  return {
    todos: [],
    completed: 0,
    pending: 0,
    length: 0,
  };
};

export const taskReducer = (
  /**
   * Un reducer siempre devuelve un nuevo estado
   * que esta compuesto de un state y la action
   */
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    /**
     * Caso para agregar tarera
     */

    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      };

      return {
        /**
         * Equivale -> setTodos([...todos, newTodo]);
         */
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }

    case "TOGGLE_TODO":
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };

    case "DELETE_TODO":
      const currentTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: currentTodos,
        length: currentTodos.length,
        completed: currentTodos.filter((todo) => todo.completed).length,
        pending: currentTodos.filter((todo) => !todo.completed).length,
      };

    default:
      console.error("Accion no configurada");
      return state;
  }
};
