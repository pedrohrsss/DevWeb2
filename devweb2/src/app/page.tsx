"use client"
import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash, FiEdit, FiCheck } from "react-icons/fi"
import { api } from "./api";

interface TaskProps {
  id: string;
  description: string;
  date: string;
  status: boolean;
}


export default function Home() {

  // Linkar os inputs
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const dateRef = useRef<HTMLInputElement | null>(null)

  // Inicializa lista de tarefas da página como lista vazia
  const [tasks, setTasks] = useState<TaskProps[]>([])

  // Ao renderizar a página, chama a função "readTasks"
  useEffect(() => {
    readTasks();
  }, [])

  // Busca as tarefas no banco de dados via API
  async function readTasks() {
    const response = await api.get("/tasks")
    setTasks(response.data)
  }

  // Cria uma nova tarefa via API
  async function createTask(event: FormEvent) {
    event.preventDefault()
    const response = await api.post("/tasks", {
      description: descriptionRef.current?.value,
      date: dateRef.current?.value
    }) 
    setTasks(allTasks => [...allTasks, response.data])
  }

  // Deleta uma tarefa
  async function deleteTask(id: string){
    try{
      await api.delete("/tasks/" + id)
      const allTasks = tasks.filter((task) => task.id !== id)
      setTasks(allTasks)
    }
    catch(err){
      alert(err)
    }
  }

  async function setTaskDone(id:string) {
    try {
      await api.put("/tasks", {
        params: {
          id: id
        },
        status: true,
      })
      const response = await api.get("/tasks")
      setTasks(response.data)
    }
    catch(err){
      alert(err)
    }
  }


  return (
    <div className="w-full min-h-screen bg-sky-500 flex justify-center items-center px-4 shadow-lg">
      <main className="my-10 w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <section>
          <h1 className="text-4xl text-sky-800 font-bold text-center mb-6">Lista de Tarefas</h1>
          
          <form className="flex flex-col mb-6" onSubmit={createTask}>
            <label className="text-sky-800 mb-2">Descrição da Tarefa</label>
            <input
              type="text"
              className="w-full mb-4 p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400" ref = {descriptionRef}
              placeholder="Digite sua tarefa"
            />
            <label className="text-sky-800 mb-2">Data</label>
            <input
              type="date"
              className="w-full mb-4 p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400" ref = {dateRef}
            />
            <input
              type="submit"
              value="Adicionar Tarefa"
              className="cursor-pointer w-full bg-sky-800 rounded-md font-semibold text-white p-3 hover:bg-sky-700 transition duration-200"
            />
          </form>
        </section>
        <section className="flex flex-col">
          <h2 className="text-sky-800 font-semibold mb-2">Tarefas:</h2>
          {tasks.map((task) => (
            <article className="w-full bg-sky-200 text-slate-800 p-2 rounded relative hover:bg-sky-300" key={task.id}>
              <p>{task.description}</p>
              <p>{task.date}</p>
              <p>{task.status}</p>
              <button className="flex absolute right-14 -top-2 bg-green-600 w-7 h-7 items-center justify-center text-slate-200"><FiCheck></FiCheck> </button>
              <button className="flex absolute right-7 -top-2 bg-yellow-500 w-7 h-7 items-center justify-center text-slate-200"><FiEdit></FiEdit>  </button>
              <button className="flex absolute right-0 -top-2 bg-red-600 w-7 h-7 items-center justify-center text-slate-200"> <FiTrash></FiTrash> </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
