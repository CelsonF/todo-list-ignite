import logo from './assets/img/todo-logo.svg'

import {ChangeEvent, FormEvent, useState} from 'react'
import {PlusCircle} from '@phosphor-icons/react'
import {TaskType, ListTasks} from "./components/ListTasks"

import styles from  './App.module.css'
import '../src/assets/css/global.css'



const items : TaskType[] = [
  {
    id: 1,
    description: 'Comprar pão',
    done: false
  },
  {
    id: 2,
    description: 'Comprar bolo',
    done: false
  },
  {
    id: 3,
    description: 'Comprar biscoito',
    done: false
  }
];

function App() {

  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<TaskType[]>(items);


  function handleMarkTask(event: ChangeEvent<HTMLInputElement>,index: number) {
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
        <ul>
          {tasks.map((tasks,index) => {
                return (
                  <ListTasks 
                    key={tasks.id} 
                    onMarkTask={(event) => handleMarkTask(event,index) }
                    onDeleteTask={() => handleDeleteItem(tasks.id)}
                    task={tasks}  
                  />
                )
              }
          )}
        </ul>
        </div>        
      </main>
    </>
  )
}

export default App
