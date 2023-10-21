import { ChangeEvent } from "react";
import { Trash } from "@phosphor-icons/react";

import styles from "./ListTasks.module.css";

export interface TaskType {
    id: number;
    description: string;
    done: boolean;
}

interface TaskProps {
    task: TaskType;
    onMarkTask: (event: ChangeEvent<HTMLInputElement>,index: number) => void;
    onDeleteTask: (id: number) => void;
}



export function ListTasks({task ,onDeleteTask , onMarkTask}: TaskProps) {
   

    function handleMarkTask(event: ChangeEvent<HTMLInputElement>) {
        onMarkTask(event,task.id);
    }

    function handleDeleteItem() {
        onDeleteTask(task.id);
    }


    return (
        <li className={styles.listItems}>
                 <input type="checkbox" onChange={handleMarkTask} />
                 <p className={task.done === true ? styles.markedItem : ""}>{task.description}</p>
                 <button className={styles.trashButton} onClick={handleDeleteItem} title="Remove"> <Trash size={18} className={styles.trashIcon} /> </button>
         </li>
    )
}