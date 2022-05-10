import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { useSelector, useDispatch} from "react-redux";
import {RootStore} from "../Store";
import {GetInput} from "../actions/searchActions";




// https://material-ui.com/components/text-fields/
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);
export default function CustomizedInputBase() {
    const dispatch = useDispatch();
    const searchState = useSelector( (state:RootStore) => state.search);
    const classes = useStyles();



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(GetInput(event.target.value, searchState.price, searchState.country, 0, searchState.lowToHigh))
    };

    return (
        <div>
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search your preferred wine"
                color='secondary'
              //  onChange={(event)=>setState({input: event.target.value, page: 0, count: state.count})}
                 onChange={handleChange}
            />
        </Paper>
        
        </div>
    );
}