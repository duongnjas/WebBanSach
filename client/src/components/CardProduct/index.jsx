import React from 'react'
import './CardProduct.scss'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Rating,
    Stack,
    Box,
    Skeleton,
}from '@mui/material';
import {Link} from 'react-router-dom'
import { numWithCommas } from "../../constraints/Util"
import imgDefault from '../../assets/img/img_default.jpg'

function CardProduct({ data }) {
    const [loading, setLoading] = React.useState(true)

    return (
        <Link className="card__wrap" to={`/product/${data.slug}`}>
            <Card className="card">
                <Box className="card__img">
                    {loading&&<Skeleton variant="rectangular" width='100%' height='100%' />}
                <CardMedia
                    component="img"
                        alt="green iguana"
                        onLoad={()=>setLoading(false)}
                    image={data?.images}
                    onError={err=>err.target.src=imgDefault}
                />
                </Box>
                <CardContent className="card__content">
                    <Typography className="card__title" variant="h5" component="div" fontSize="13px">
                        {data?.name}
                    </Typography>
                    <Stack direction="row" alignItems="center">
                        <Rating name="read-only" value={data?.rate || 0} sx={{ fontSize: "0.875rem" }} readOnly />
                        <span style={{ color: "#787878", fontSize: "11px" }}>| Đã bán {data?.sold}</span>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography className="card__price" color={`${data?.discount!==0 ? "#ff0000" : "#000000"}`} variant="h5" component="div">
                        {
                            data?.discount!==0 ?
                            <>{numWithCommas(Math.round(data?.price*(1-0.01*data.discount)))} ₫ <Box className="card__sale">{data?.discount}%</Box>
                            </>
                            :
                            <>{numWithCommas(data?.price)} ₫ </>
                            
                        } 
                        </Typography> 
                    </Stack>
                    
                </CardContent>
            </Card>
        </Link>
    )
}

export default CardProduct