import React, {useEffect, useState} from 'react';
import {Header} from './components/Header/Header';
import {Toolbar} from './components/Toolbar/Toolbar';
import {Column} from './components/Column/Column';
import {getTasks} from "./api/task";
import './App.css'

export interface ITask {
    id: number;
    text: string;
    status: boolean;
}

function App() {
    const [initialTaskList, setInitialTaskList] = useState<ITask[]>([])
    const [taskList, setTaskList] = useState<ITask[]>([])
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        getTaskList()
    }, [])

    useEffect(() => {
        if(searchValue.length === 0) return setTaskList(initialTaskList)
        const filteredList = initialTaskList.filter((item: ITask) => {
            return item.text.search(searchValue) >= 0
        })

        setTaskList(filteredList)

    }, [searchValue])

    const getTaskList = async() => {
        const tasks = await getTasks()
        setInitialTaskList(tasks)
        setTaskList(tasks)
    }

    return (
        <div className="app">
            <Header setTaskList={setTaskList} />
            <Toolbar setSearchValue={setSearchValue} getTasks={getTaskList}/>
            <Column taskList={taskList}/>
        </div>
    );
}

export default App;
