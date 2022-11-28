import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import {GoogleIcon} from '../parts/googleIcon';
import {HotPepperIcon} from '../parts/hotPepperIcon';
import Grid from '@mui/material/Grid';
export default function ResultCard(props) {
    return (
        <Card
        onClick={() => props.onClickFunc(props.lat, props.lng)}
        sx={{
            mb: 2,
            height: props.mode == 'noresults' ? 200 : 300,
        }}>
            {props.mode != 'noresults' &&
                <CardMedia
                    component="img"
                    height="150"
                    image={props.photo}
                    alt="picture"
                />}
            <CardContent>
                <Grid container rowSpacing={0.2}s pacing={1}>
                    <Grid item xs={12} md={12}>
                        <Typography gutterBottom variant="h5ty"
                            component="div"
                            noWrap={true}
                            sx={{textAlign: 'center'}}>
                            {props.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography
                            sx={{
                                fontSize: props.mode == 'noresults' ? '5rem' : '0.8rem',
                                textAlign: 'center',
                                textOverflow: 'ellipsis',
                            }}
                            noWrap={true}
                            color="text.secondary">
                            {props.vicinity}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        {(props.mode != 'noresult' ?
                        (props.google ? <Rating name="read-only" value={props.rating} precision={0.5}/> :
                            <Rating disabled name="read-only" value={0} precision={0.5} /> ) : <div>21e12</div>)}
                    </Grid>
                    <Grid item xs={2} md={2}>
                        {props.mode != 'noresult' &&
                            props.google ? <Typography>{`(${props.rat})`}</Typography>:
                            <Typography>(-)</Typography>
                        }
                    </Grid>
                    <Grid item xs={6} md={6}>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        {props.google && <IconButton onClick={() => window.open(`http://www.google.com`, '_blank')}>
                            <GoogleIcon size={1.5} />
                        </IconButton>}
                    </Grid>
                    <Grid item xs={2} md={2}>
                        {props.hotpepper && <IconButton onClick={() => window.open(`http://www.${props.hotpepper}`, '_blank')}>
                            <HotPepperIcon size={1.5} />
                        </IconButton>}
                    </Grid>
                    <Grid item xs={10} md={10}>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
