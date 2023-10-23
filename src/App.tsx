import logo from './assets/img/todo-logo.svg'

import { ChangeEvent, FormEvent, useState } from 'react'
import { ClipboardText, PlusCircle } from '@phosphor-icons/react'
import { TaskType, ListTasks } from "./components/ListTasks"

import styles from './App.module.css'
import '../src/assets/css/global.css'



const items: TaskType[] = [];

function App() {

  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<TaskType[]>(items);


  function handleMarkTask(event: ChangeEvent<HTMLInputElement>, index: number) {
    const updatedItems = [...tasks];
    updatedItems[index].done = event.target.checked;
    setTasks(updatedItems);
  }

  function handleDeleteItem(id: number) {
    const updatedItems = tasks.filter((task) => task.id !== id);
    setTasks(updatedItems);
  }

  function handleAddTask(event: FormEvent) {
    event.preventDefault();
    const updatedItems = [...tasks];
    updatedItems.push({
      id: updatedItems.length + 1,
      description: newTask,
      done: false
    });
    setTasks(updatedItems);
    setNewTask('');
  }

  function handleTaskInput(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  return (
    <>
      <header>
        <h1> <img className={styles.logo} src={logo} alt="To do list with React and TS" /> to<span className={styles.titleH1}>do</span></h1>
      </header>
      <main>
        <div className={styles.contentTasks}>
          <form className={styles.formTask} onSubmit={handleAddTask}>
            <input
              className={styles.inputTask}
              type="text"
              placeholder="Adicione uma tarefa"
              value={newTask}
              onChange={handleTaskInput}
            />
            <button type="submit" className={styles.addTask}> Criar <PlusCircle size={16} /> </button>
          </form>
          <section className={styles.stats} >
            <div>Tarefas criadas <button> {tasks.length} </button> </div>
            <div>Concluídas <button> {tasks.filter((task) => task.done === true).length} de {tasks.length} </button> </div>
          </section>
          <ul>
            {tasks.length === 0 ? (
              <div className={styles.emptyList}>
                <ClipboardText size={56} />
                <h3> Você ainda não tem tarefas cadastradas </h3>
                <p> Crie tarefas e organize seus itens a fazer </p>
              </div>
            ) : (
              <>
                {tasks.map((tasks, index) => {
                  return (
                    <ListTasks
                      key={tasks.id}
                      onMarkTask={(event) => handleMarkTask(event, index)}
                      onDeleteTask={() => handleDeleteItem(tasks.id)}
                      task={tasks}
                    />
                  )
                }
                )}
              </>
            )}
          </ul>
        </div>
      </main>
    </>
  )
}

export default App
