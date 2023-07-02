import axios from 'axios';
import {IGetTasksDto} from "./dto/getTasks.dto";
import {IUpdateTaskDto} from "./dto/updateTask.dto";
import {ICreateTaskDto} from "./dto/createTask.dto";

export const getTasks = async () => {
    try {
        const response = await axios.get('http://localhost:3001/tasks');
        return response.data as IGetTasksDto[];
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        return []
    }
}

export const updateTask = async (data: IUpdateTaskDto) => {
    try {
        const response = await axios.put(`http://localhost:3001/tasks/${data.id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

export const createTask = async (data: ICreateTaskDto) => {
    try {
        await axios.post('http://localhost:3001/tasks', data);
    } catch (error) {
        console.error('Error creating task:', error);
    }
};

export const deleteAllTasks = async () => {
    try {
        await axios.delete('http://localhost:3001/tasks');
    } catch (error) {
        console.error('Error deleting tasks:', error);
    }
}