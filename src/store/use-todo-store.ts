import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface IActionsState {
  fetchTodos: () => Promise<void>;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

interface IInitialState {
  todos: ITodo[];
  isLoading: boolean;
}

interface ITodosState extends IActionsState, IInitialState {}

const initialState: IInitialState = {
  todos: [],
  isLoading: false,
};

const todoStore: StateCreator<
  ITodosState,
  [['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  ...initialState,
  fetchTodos: async () => {
    set({ isLoading: true }, false, 'startFetch');

    try {
      const response = await fetch('https://dummyjson.com/todos?limit=10');
      const data = await response.json();

      set({ todos: data.todos }, false, 'fetchtodos/sucess');
    } catch (error) {
      console.log('Error', error);
      set({ todos: [] }, false, 'fetchtodos/failed');
    } finally {
      set({ isLoading: false }, false, 'endFetch');
    }
  },
  completeTodo: (id: number) => {
    set(
      (state) => {
        const todo = state.todos.find((todo: ITodo) => todo.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      },
      false,
      'completeTodo'
    );
  },
  deleteTodo: (id: number) => {
    set((state) => {
      const index = state.todos.findIndex((todo: ITodo) => todo.id === id);

      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    });
  },
});

const useTodoStore = create<ITodosState>()(
  immer(
    devtools(
      persist(todoStore, {
        name: 'todos-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ todos: state.todos }),
      })
    )
  )
);

export const useTodos = () => useTodoStore((state) => state.todos);
export const useIsLoading = () => useTodoStore((state) => state.isLoading);
export const fetchTodos = () => useTodoStore.getState().fetchTodos();
export const completeTodo = (id: number) => useTodoStore.getState().completeTodo(id);
export const deleteTodo = (id: number) => useTodoStore.getState().deleteTodo(id);
