import React, {useState, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {Badge, Checkbox} from "@mui/material";
import {updateTask} from "../../api/task";
import './style.css'
import {ITask} from "../../App";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

interface ITaskColumnProps {
    taskList: ITask[]
}

export const Column = (props: ITaskColumnProps) => {

    const [doneTaskList, setDoneTaskList] = useState<ITask[]>([])
    const [todoTaskList, setTodoTaskList] = useState<ITask[]>([])

    useEffect(() => {
        const data = props.taskList;

        const doneTaskListFiltered = data.filter((item: ITask) => item.status);
        const todoTaskListFiltered = data.filter((item: ITask) => !item.status);

        setDoneTaskList(doneTaskListFiltered)
        setTodoTaskList(todoTaskListFiltered)
    }, [props.taskList])

    const changeToDoTaskStatus = (id: number) => {
        const currentTask = doneTaskList.find((item: ITask) => item.id === id)
        const filtered = doneTaskList.filter((item: ITask) => item.id !== id)

        if (currentTask) {
            currentTask.status = false;

            setDoneTaskList(filtered)
            setTodoTaskList((prevState: ITask[]) => [...prevState, currentTask])
            updateTask(currentTask)
        }
    }

    const changeDoneStatus = (id: number) => {
        const currentTask = todoTaskList.find((item: ITask) => item.id === id)
        const filtered = todoTaskList.filter((item: ITask) => item.id !== id)

        if (currentTask) {
            currentTask.status = true;

            setTodoTaskList(filtered)
            setDoneTaskList((prevState: ITask[]) => [...prevState, currentTask])
            updateTask(currentTask)
        }

    }


    return (
        <div className="column" id="test-column">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <h3><p>To Do</p> {todoTaskList.length > 0 ? <Badge color="primary" badgeContent={todoTaskList.length} /> : null}</h3>
                    <ul>
                        {todoTaskList.map((item: ITask) => {
                            return (
                                <li key={item.id}>
                                    <Checkbox
                                        {...label}
                                        checked={item.status}
                                        onChange={() => changeDoneStatus(item.id)}/>
                                    <span>{item.text}</span>
                                </li>
                            )
                        })}

                    </ul>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h3><p>Done</p> {doneTaskList.length > 0 ? <Badge color="success" badgeContent={doneTaskList.length} /> : null}</h3>
                    <ul>
                        {doneTaskList.map((item: ITask) => {
                            return (
                                <li key={item.id}>
                                    <Checkbox
                                        {...label}
                                        checked={item.status}
                                        onChange={() => changeToDoTaskStatus(item.id)}/>
                                    <span>{item.text}</span>
                                </li>
                            )
                        })}
                    </ul>
                </Grid>
            </Grid>
        </div>
    );
}