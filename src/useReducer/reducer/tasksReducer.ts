/**
 * Zod es una libreria que permite validar datos
 */

import * as z from "zod/v4";

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

/**
 * Declaramos un schema que indica como debe lucir la tarea
 * Basicamente es un validador, comprueba que la tarea luzca de esa manera
 */
const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

/**
 * Declaramos un schema que indica como debe lucir el estado de la tarea
 */
const TaskStateScheme = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem("tasks-state");

  /**
   * Si el estado del local storge esta vacio devolvemos el estado por defecto
   * Evitamos que el programa pete
   */
  if (!localStorageState) {
    return {
      todos: [],
      completed: 0,
      pending: 0,
      length: 0,
    };
  }

  /**
   * Validamos que el local storage coincida con el schema que hemos definido
   */
  const result = TaskStateScheme.safeParse(JSON.parse(localStorageState));

  /**
   * Si el resultado da error devolvemos un error y el estado inicial
   * Evitamos que el programa pete
   */
  if (result.error) {
    console.error(result.error);
    return {
      todos: [],
      completed: 0,
      pending: 0,
      length: 0,
    };
  }

  // Devolvemos la data
  return result.data;
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
