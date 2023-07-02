import React, {useCallback} from 'react';
import Grid from '@mui/material/Grid';
import {Button} from "@mui/material";
import {deleteAllTasks} from "../../api/task";
import DeleteIcon from '@mui/icons-material/Delete';
import './style.css';

interface IHeaderProps {
    setTaskList: ([]) => void;
}
export const Header = (props: IHeaderProps) => {
    const {setTaskList} = props;

    const deleteTask = useCallback(async () => {
        await deleteAllTasks();
        setTaskList([]);
    }, [setTaskList]);

    return (
        <div className="header">
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <h1>Marvelouse v2.0</h1>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className="headerControls">
                        <Button variant="outlined" color="error" size="small" onClick={deleteTask}>
                            <DeleteIcon />
                            Delete all tasks
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};