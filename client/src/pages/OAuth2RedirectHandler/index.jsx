// eslint-disable-next-line react-hooks/exhaustive-deps
import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiAuth from '../../apis/apiAuth';
import Loading from '../../components/Loading';
import { loginSuccess } from '../../slices/authSlice';

function OAuth2RedirectHandler() {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [count,setCount ] = useState(6) //xử lý đếm ngược
    const [loading, setLoading]  =useState(true)

    const getUrlParameter = (name)=> {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');//eslint-disable-line
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));//eslint-disable-line
    };

    useEffect(()=>{
        const getToken = ()=>{
            let token = getUrlParameter('token')
            if(token){
                let params = {
                    token:token
                }
                
                apiAuth.getUserBySocialToken(params)
                .then(res=>{
                    let {accessToken, refreshToken, user} = res.data
                    dispatch(loginSuccess({
                        accessToken,
                        refreshToken,
                        ...user
                    }))
                    toast.success("Đăng nhập thành công")
                    navigate('/')
                })
                .finally(()=>setLoading(false))
            }
        }
        getToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location])

    useEffect(() => {
        const countDown = () => {//hàm xử lý đếm ngược 5s sau khi kích hoạt xong
            if(count === 0){
                toast.error("Đăng nhập thất bại")
                navigate("/")
                return
            }
            if (!loading)
                return
            
            setTimeout(() => {
                if (count > 0) {
                    setCount(pre => pre - 1)
                }
                else {
                    navigate("/")
                }
            }, 1000)
        }
        countDown();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

   
  return (
    <Stack height="400px" justifyContent={'center'} alignItems='center'>
        <Stack  alignItems='center' spacing={2}>
            <Loading size={40}/>
            <Typography>Đang xử lý. Vui lòng chờ trong {count} giây</Typography>
        </Stack>
    </Stack>
  )
}


export default OAuth2RedirectHandler