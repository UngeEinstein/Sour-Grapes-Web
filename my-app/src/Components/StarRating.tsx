import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Client from './Client';
import { gql } from '@apollo/client';
import { Typography } from '@material-ui/core';

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        fontSize: 'medium',
        margin: '10px',
    },
    label: {
        color: 'red',
        margin: '10px 0 0 5px',
    },
    starAndLabel: {
        display: 'grid',
        gridTemplateColumns: 'auto',
    },
});

interface Props {
    readOnly?: boolean;
    title?: string;
}


// gives the revuew with a graphql query
const submitReviewGQL = gql`
mutation Mutation($title:String, $points: String) {
    giveReview(title: $title, points: $points)
  }
`;
//Handles review
async function submitRating(title: string, starRating: number) {
    let points = starRating.toString();
    let response = Client
        .mutate({
            mutation: submitReviewGQL,
            variables: { title: title, points: points }
        }).then(result => result.data.giveReview);

    let wineRating = await response;

    return wineRating;
}


export default function HoverRating(props: Props) {
    const [value, setValue] = React.useState<number | null>(0);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();
    const [wineRating, setWineRating] = React.useState("");
    const [avgRating, setAvgRating] = React.useState("");
    const [ratingCount, setRatingCount] = React.useState("");

    return (
        <div className={classes.root}>
            <div className={classes.starAndLabel}>
                <Rating
                    readOnly={props.readOnly}
                    name={props.title}
                    value={value}
                    precision={0.5}
                    onChange={async (event, newValue) => {
                        if (props.readOnly) {
                            setValue(parseInt(avgRating));
                        } else {
                            setValue(newValue);
                        }

                        try {
                            if (props.title != null) {
                                let ratingResponse = await submitRating(props.title, newValue!);
                                setWineRating(ratingResponse[0]);
                                setAvgRating("Average rating: " + ratingResponse[1] + " / 5");
                                setRatingCount(ratingResponse[2]);
                            }
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                {value !== null && <Box className={classes.label} ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
            </div>
            <div>
                <Typography>
                    {wineRating}
                </Typography>
            </div>
            <Typography>
                <b>{avgRating}</b>
                <br />
                {ratingCount}
            </Typography>
        </div>
    );
}

