"use client"
import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash, FiEdit, FiCheck } from "react-icons/fi"
import { api } from "./api";

interface Usuarios {
  matricula: string;
  nome: string;
  cpf: string;
  senha: string;
  email: string;
  fkperfil: string;
}

export default function HomeUsuarios() {

  // Linkar os inputs
  const matricula = useRef<HTMLInputElement | null>(null)
  const nome = useRef<HTMLInputElement | null>(null)
  const cpf = useRef<HTMLInputElement | null>(null)
  const senha = useRef<HTMLInputElement | null>(null)
  const email = useRef<HTMLInputElement | null>(null)
  const fkperfil = useRef<HTMLInputElement | null>(null)

  // Inicializa lista de tarefas da página como lista vazia
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])

  // Ao renderizar a página, chama a função "readTasks"
  useEffect(() => {
    readUsuarios();
  }, [])

  // Busca as tarefas no banco de dados via API
  async function readUsuarios() {
    const response = await api.get("/usuarios")
    console.log(response.data)
    setUsuarios(response.data)
  }

  // Cria uma nova tarefa
  async function createUsuarios(event: FormEvent) {
    event.preventDefault()
    const response = await api.post("/usuarios", {
      matricula: matricula.current?.value,
      nome: nome.current?.value,
      cpf: cpf.current?.value,
      senha: senha.current?.value,
      email: email.current?.value,
      fkperfil: fkperfil.current?.value
    }) 
    setUsuarios(allUsuarios => [...allUsuarios, response.data])
  }

  // Deleta uma tarefa
  async function deleteUsuarios(matricula: string){
    try{
      await api.delete("/usuarios/" + matricula)
      const allUsuarios = usuarios.filter((usuario) => usuario.matricula !== matricula)
      setUsuarios(allUsuarios)
    }
    catch(err){
      alert(err)
    }
  }

  async function setUsuariosDone(matricula:string) {
    try {
      await api.put("/usuarios/" + matricula, {
        status: true,
      })
      const response = await api.get("/usuarios")
      setUsuarios(response.data)
    }
    catch(err){
      alert(err)
    }
  }

  return (
    <div className="w-full min-h-screen bg-sky-500 flex justify-center items-center px-4 shadow-lg">
      <main className="my-10 w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <section>
          <h1 className="text-4xl text-sky-800 font-bold text-center mb-6">Lista de Usuarios</h1>
          
          <form className="flex flex-col mb-6" onSubmit={createUsuarios}>
          <label className="text-sky-800 mb-2">matricula</label>
            <input
              type="text"
              className="w-full mb-4 p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400" ref = {matricula}
              placeholder="Digite sua matricula"
            />
            <label className="text-sky-800 mb-2">Usuarios</label>
            <input
              type="text"
              className="w-full mb-4 p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400" ref = {nome}
              placeholder="Digite seu nome"
            />
            <label className="text-sky-800 mb-2">CPF</label>
            <input
              type="text"
              className="w-full mb-4 p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400" ref = {cpf}
              placeholder="Digite seu cpf"
            />
            <label className="text-sky-800 mb-2">Senha</label>
            <input
              type="text"
              className="w-full mb-4 p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400" ref = {senha}
              placeholder="Digite sua senha"
            />
            <label className="text-sky-800 mb-2">Email</label>
            <input
              type="text"
              className="w-full mb-4 p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400" ref = {email}
              placeholder="Digite seu e-mail"
            />        
            <label className="text-sky-800 mb-2">Perfil</label>
            <input
              type="text"
              className="w-full mb-4 p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400" ref = {fkperfil}
              placeholder="Digite seu perfil"
            />         
            <input
              type="submit"
              value="Adicionar Usuarios"
              className="cursor-pointer w-full bg-sky-800 rounded-md font-semibold text-white p-3 hover:bg-sky-700 transition duration-200"
            />
          </form>
        </section>
        <section className="flex flex-col">
          <h2 className="text-sky-800 font-semibold mb-2">Usuarios:</h2>
          {usuarios.map((usuario) => (
            <article className="w-full bg-sky-200 text-slate-800 p-2 rounded relative hover:bg-sky-300" key={usuario.matricula}>
              <p>{usuario.matricula}</p>
              <p>{usuario.nome}</p>
              <p>{usuario.cpf}</p>
              <p>{usuario.senha}</p>
              <p>{usuario.email}</p>
              <p>{usuario.fkperfil}</p>
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
