import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SuccessPayment() {
    const location = useLocation()
    const navigate = useNavigate()
    const [count, setCount] = useState(6) //xử lý đếm ngược
    const [message, setMessage] = useState("")

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');//eslint-disable-line
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));//eslint-disable-line
    };
    let orderId = getUrlParameter('orderId')
    useEffect(() => {
        const getToken = () => {
            let message = getUrlParameter('message')
            setMessage(message)
            
        }
        getToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    useEffect(() => {
        const countDown = () => {//hàm xử lý đếm ngược 5s sau khi kích hoạt xong

            setTimeout(() => {
                if (count > 0) {
                    setCount(pre => pre - 1)
                }
                else {
                    navigate(`/customer/order/detail/${orderId}`)
                }
            }, 1000)
        }
        countDown();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])


    return (
        <Stack height="400px" justifyContent={'center'} alignItems='center'>
            <Stack alignItems='center' spacing={2}>
                <Typography>{message}</Typography>
                <Link to={`/customer/order/detail/${orderId}`}>Chuyển đến thông tin đơn hàng trong {count} giây</Link>
            </Stack>
        </Stack>
    )
}


export default SuccessPayment