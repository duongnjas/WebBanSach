import React from 'react'
import './CardFlashsale.scss'
import {
    Card,
    CardContent ,
     CardMedia,
     Typography,
     Box
 } from '@mui/material';
import { Link } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress';
import { numWithCommas } from '../../constraints/Util';


function CardFlashsale({ data }) {
    return (
        <Link className="card__wrap" to={`/product/${data.slug}`}>
            <Card className='card'>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    width="124px"
                    height="124px"
                    image={data?.image}
                />
                <CardContent className="card__content">
                    <Typography className="card__price" color={`${data?.discount!==0 ? "#ff0000" : "#000000"}`} variant="h5" component="div">
                    {
                        data?.discount!==0 ?
                        <>{numWithCommas(Math.round(data?.price*(1-0.01*data.discount)))} ₫ <Box className="card__sale">{data?.discount}%</Box>
                        </>
                        :
                        <>{numWithCommas(data?.price)} ₫ </>
                    } 
                    </Typography>
                    <Box className='card-flashsale__sold' >
                        <LinearProgress variant="determinate" value={43} />
                        <Box>Đã bán {43}</Box>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CardFlashsale