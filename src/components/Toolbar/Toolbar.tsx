import React, {ChangeEvent, useCallback, useState} from 'react';
import Grid from "@mui/material/Grid";
import {Button, InputAdornment, TextField} from "@mui/material";
import {createTask} from "../../api/task";
import SearchIcon from '@mui/icons-material/Search';
import './style.css'

interface IToolbarProps {
    setSearchValue: (value: string) => void;

    getTasks: () => void;

}

export const Toolbar = (props: IToolbarProps) => {

    const {setSearchValue, getTasks} = props;

    const [taskText, setTaskText] = useState<string>('');
    const [taskTextError, setTaskTextError] = useState<boolean>(false);

    const addTask = (value: string) => {
        if(value.length === 0) {
            setTaskTextError(true);
            return
        }
        setTaskTextError(false)
        setTaskText('')
        createTask({
            status: false,
            text: value
        }).then(() => {
            getTasks()
        })
    }

    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }, [setSearchValue]);

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTextError(false);
        setTaskText(e.target.value)
    }

    return (
        <div className="toolbar">
            <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={6} md={8}>
                    <h2>Create a new task:</h2>
                    <TextField
                        error={taskTextError}
                        className="toolbarTaskInput"
                        size="small"
                        value={taskText}
                        variant="outlined"
                        onChange={onChangeText}/>
                    <Button
                        size="medium"
                        variant="contained"
                        onClick={() => addTask(taskText)}>Add</Button>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className={"toolbarSearch"}>
                        <TextField
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            size="small"
                            variant="outlined"
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}