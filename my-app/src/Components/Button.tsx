import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {RootStore} from "../Store";
import {GetInput} from "../actions/searchActions";
import { useSelector, useDispatch} from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
      backgroundColor: "#F87060",
      color: "#e3ddca"
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);
//Handles price sorting
export default function ButtonSizes() {
  const classes = useStyles();
  const dispatch= useDispatch();
  const componentState = useSelector((state:RootStore) => state.search);



  return (
      <div className={"arrowBtn"}>
        Sort by ascending / descending price: <br/>
        <IconButton aria-label="delete" className={classes.margin}  onClick={() => {dispatch(GetInput(componentState.searchString, componentState.price, componentState.country, componentState.page, !componentState.lowToHigh));}}>
          {componentState.lowToHigh?<ArrowDownwardIcon fontSize="inherit" />:<ArrowUpwardIcon fontSize="inherit" />}
        </IconButton>
      </div>
  );
}