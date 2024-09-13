import React from "react";
import { TodoData } from "../models/Todo";

interface Props {
  todo: TodoData;
  onDelete: (id: string) => void;
  onCheck: (id: string) => void;
}
const Row = ({ todo: { task, isCompleted, id }, onDelete, onCheck }: Props) => {
  return (
    <div
      className={`flex w-full p-4 mb-2 justify-between items-center
      ${isCompleted ? "bg-gray-300" : "bg-green-200"}
    `}
    >
      <p
        className={`ml-2 text-lg font-mono font-medium
        ${isCompleted ? "line-through text-white" : "text-gray-800"}
      `}
      >
        {task}
      </p>
      <div className="flex justify-between items-center w-1/6 mr-2">
        <button
          className="h-7 w-7 p-2 flex justify-center items-center rounded text-white font-bold  bg-red-400 hover:bg-red-300"
          onClick={() => onDelete(id)}
        >
          X
        </button>
        <input
          className="h-7 w-7 ml-2"
          type="checkbox"
          checked={isCompleted}
          onChange={() => onCheck(id)}
        />
      </div>
    </div>
  );
};

export default Row;