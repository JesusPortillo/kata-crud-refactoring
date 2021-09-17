
import {createContext } from 'react';

export const initialState = {
  todo: { list: [], item: {} },
  todoList: { list: [], item: {} },
  errorTodoList: false,
  errorTodo: { isError:false, id: null }
};
export const Store = createContext(initialState)

export default Store;