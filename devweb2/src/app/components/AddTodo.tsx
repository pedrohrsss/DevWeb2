import React from "react";

interface Props {
  task: string;
  onSubmit: (e: React.FormEvent) => void;
  onChnage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTodo = ({ task, onSubmit, onChnage }: Props) => {
  return (
    <>
      <img src="todo.png" alt="todo logo" width={150} />
      <form className="flex justify-center w-full" onSubmit={onSubmit}>
        <input
          className="w-full rounded shadow p-2 text-gray-500 mr-2 placeholder-gray-200"
          type="text"
          name="task"
          value={task}
          onChange={onChnage}
          placeholder="do ..."
        />
        <button className="shadow rounded text-gray-600 px-3" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default AddTodo;