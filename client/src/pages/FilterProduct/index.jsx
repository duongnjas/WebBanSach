 /* eslint-disable */
import { useState, useEffect, useCallback, } from 'react'
import {
    Stack,
    Box,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Grid,
    Rating,
    Tab,
    Tabs,
}
    from '@mui/material';
import "./FilterProduct.scss"
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CardProduct from '../../components/CardProduct';
import apiProduct from '../../apis/apiProduct';
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';

function FilterProduct(props) {
    const slugCategory = useParams().slug
    const [category, setCategory] = useState(null)
    const [value, setValue] = useState(0);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({})
    const [filterPrice, setFilterPrice] = useState({
        minPrice: '',
        maxPrice: '',
        option: -1,
        apply: false,
        value: ''
    })


    const [productFilter, setProductFilter] = useState([])

    const navigate = useNavigate()
    const size = 30;

    useEffect(() => {
        const getData = async () => {
            apiProduct.getCategoryFilterById({ slug: slugCategory })
                .then(res => {
                    setCategory(res[0])
                })
                .catch(error => {
                    setCategory(null)
                    toast.warning("Không tồn tại danh mục trong hệ thống")
                    navigate('/')
                })
        }
        getData()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slugCategory])

    useEffect(() => {
        const getData = async () => {
            if(category){
                
                let params = {
                    _page: 1,
                    _limit: 50,
                    "details.category.id": category.id
                }
                const response = await apiProduct.getProducts(params);
                if (response) {
                    setProducts(response.data);
                }
            }
        };
        getData();
    }, [page, category]);

    useEffect(() => {
        const filterData = () => {
            if (!category)
                return
            let data = [...products]
            if (filter.rate)
                data = data.filter(item => Math.round(item.rate) >= filter.rate)

            let data1 = [...data]
            let data2 = [...data]
            category.properties.forEach(item => {
                data1 = data1.filter(product => {
                    if (!filter[item.name] || filter[item.name].length === 0)
                        return true
                    let option = product.details.options.find(option => option.name === item.name)
                    if (option) {
                        return option.values.some(item2 => filter[item.name].includes(item2.value))
                    }
                    return false
                })

                data2 = data2.filter(product => {
                    if (!filter[item.name] || filter[item.name].length === 0)
                        return true
                    let specification = product.details.specifications.find(spec => spec.name === item.name)
                    if (specification) {
                        return filter[item.name].includes(specification.value)
                    }
                    return false
                })
            })

            data = [...data1, ...data2]
            data = data.filter((item, index) => data.indexOf(item) === index)

            if (filterPrice.apply) {
                if (filterPrice.option > -1) {
                    const range = filterPrice.value.split(',')
                    if (range.length === 2) {
                        const minPrice = Number(range[0]) || 0
                        const maxPrice = Number(range[1]) || 1000000000
                        data = data.filter(item => item.price * (1 - item.discount / 100) > minPrice
                            && item.price * (1 - item.discount / 100) < maxPrice)
                    }

                }
                else
                    data = data.filter(item => item.price * (1 - item.discount / 100) > filterPrice.minPrice
                        && item.price * (1 - item.discount / 100) < filterPrice.maxPrice)

            }
            switch (value) {
                case 1: {
                    data.sort((a, b) => b.sold - a.sold)
                    break
                }
                case 2: {
                    break
                }
                case 3: {
                    data.sort((a, b) => a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100))
                    break
                }
                case 4: {
                    data.sort((a, b) => b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100))
                    break
                }
                default: {
                    break
                }
            }
            setProductFilter(data)
        }
        filterData()
    }, [products, filter, category, filterPrice, value])

    const onChangeMinPrice = (e) => {
        let value = Number(e.target.value)
        if (Number.isInteger(value) && value >= 0) {
            setFilterPrice({ ...filterPrice, minPrice: value, option: -1 })
        }
        else {
            setFilterPrice({ ...filterPrice, minPrice: 0, option: -1 })
        }
    }
    const onChangeMaxPrice = (e) => {
        let value = Number(e.target.value)
        if (Number.isInteger(value) && value >= 0) {
            setFilterPrice({ ...filterPrice, maxPrice: value, option: -1 })
        }
        else {
            setFilterPrice({ ...filterPrice, maxPrice: 1000000000, option: -1 })
        }
    }

    const onSetFilterPrice = (value, index) => {
        setFilterPrice(pre => {
            return {
                ...pre,
                option: index,
                value: value
            }
        })
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const onChangeFilter = useCallback((e, propertyName) => {
        let property = filter[propertyName] || []
        if (e.target.checked) {
            property = [...property, e.target.name]
        }
        else
            property = property.filter(item => item !== e.target.name)

        setFilter(filter => {
            return {
                ...filter,
                [propertyName]: [...property]
            }
        })

        console.log({
            ...filter,
            [propertyName]: [...property]
        })
    }, [filter])
    const onChangeRating = (rate) => {
        if (filter.rate === rate) {
            const newFilter = delete filter.rate
            setFilter(newFilter)
        }
        else {
            setFilter({ ...filter, rate })
        }

    }
    
    const handleApplyFilterPrice = () => {
        setFilterPrice(pre => {
            return { ...pre, apply: !pre.apply }
        })
    }


    return (
        <Stack className='filterProduct container' direction="row" spacing={1}>
            <Stack className='filterProduct__sidebar' direction="column">
                <Box className='filterProduct__form'>
                    <Typography className='filterProduct__title'>Đánh giá</Typography>
                    <FormGroup>
                        {
                            [5, 4, 3].map(item =>
                                <Box key={item} onClick={() => onChangeRating(item)}
                                    className={`filterProduct__rating ${item === filter.rate ? 'selected' : ''}`}>
                                    <Rating
                                        name="hover-feedback"
                                        value={item}
                                        readOnly
                                        icon={<StarIcon sx={{ fontSize: 16 }} />}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} sx={{ fontSize: 16 }} />}
                                    /><Box fontSize="13px">{`từ ${item} sao`}</Box>
                                </Box>)
                        }
                    </FormGroup>
                </Box>

                <Box className='filterProduct__form'>
                    <Typography className='filterProduct__title'>Giá</Typography>
                    {
                        category?.rangePrice.values.map((item, i) =>
                            <span key={i}
                                className={`filterPrice ${filterPrice.option === i ? 'selected' : ''}`}
                                onClick={() => onSetFilterPrice(item.value, i)}
                            >
                                {item.display_value}
                            </span>)
                    }
                    <Typography sx={{ fontSize: "13px", fontWeight: 400, color: "#888" }}>Chọn khoảng giá</Typography>
                    <Box className="filterPrice__groupInput">
                        <input type="text" value={filterPrice.minPrice} onChange={onChangeMinPrice}></input>
                        <span>-</span>
                        <input type="text" value={filterPrice.maxPrice} onChange={onChangeMaxPrice}></input>
                    </Box>
                    <Button onClick={handleApplyFilterPrice}
                        variant='outlined' sx={{ width: "100px", height: "26px", fontWeight: 400 }}>
                        {filterPrice.apply ? 'Huỷ' : 'Áp dụng'}
                    </Button>
                </Box>

                {
                    category?.properties.map(property =>
                        <FilterForm key={property.id} property={property} onChangeFilter={onChangeFilter} />
                    )
                }

                {/* <Box className='filterProduct__form'>
                    <Typography className='filterProduct__title'>Giao hàng</Typography>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={onChangeShipping}
                    >
                        <FormControlLabel className='filterProduct__label'
                            value="noidia"
                            control={<Radio className="filterProduct__radiobutton" />}
                            label="Hàng Nội Địa" />
                        <FormControlLabel className='filterProduct__label'
                            value="quocte"
                            control={<Radio className="filterProduct__radiobutton" />}
                            label="Hàng Quốc Tế" />
                    </RadioGroup>
                </Box> */}
            </Stack >
            <Box sx={{ flex: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="basic tabs example"
                    >
                        {
                            tabs.map(item =>
                                <Tab key={item.id}
                                    label={item.name}
                                    sx={{ fontSize: "12px", textTransform: "none", fontWeight: "500" }}
                                />)
                        }
                    </Tabs>
                </Box>
                <Box>
                    <Grid container spacing={2}>
                        {
                            productFilter.map(item =>
                                <Grid key={item.id} item xs={3}>
                                    <CardProduct data={item} />
                                </Grid>)
                        }
                    </Grid>
                </Box>
            </Box>
        </Stack >
    )
}

function FilterForm(props) {
    const { property, onChangeFilter } = props
    const [expand, setExpand] = useState(false)
    const handleExpand = () => {
        setExpand(pre => !pre)
    }

    return (
        <Box className='filterProduct__form'>
            <Typography className='filterProduct__title'>{property.name}</Typography>
            <FormGroup >
                {(expand ? property.values : property.values.slice(0, 4))
                    .map(item =>
                        <FormControlLabel
                            key={item.id}
                            className='filterProduct__label'
                            name={item.value}
                            onChange={(e) => onChangeFilter(e, property.name)}
                            control={<Checkbox className="filterProduct__checkbox" />}
                            label={item.value} />)
                }
            </FormGroup>
            {
                expand ?
                    <Stack onClick={handleExpand} direction="row" sx={{ cursor: "pointer", marginTop: "14px" }} >
                        <Typography sx={{ fontSize: 14, color: "#0D5CB6" }}>Thu gọn</Typography>
                        <KeyboardArrowUpIcon sx={{ fontSize: 20, color: "#0D5CB6" }} />
                    </Stack>
                    :
                    <Stack onClick={handleExpand} direction="row" sx={{ cursor: "pointer", marginTop: "14px" }} >
                        <Typography sx={{ fontSize: 14, color: "#0D5CB6" }}>Xem thêm</Typography>
                        <KeyboardArrowDownIcon sx={{ fontSize: 20, color: "#0D5CB6" }} />
                    </Stack>
            }
        </Box>
    )

}


const tabs = [
    {
        id: 1,
        name: "Phổ biến"
    },
    {
        id: 2,
        name: "Bán chạy"
    },
    {
        id: 3,
        name: "Hàng mới"
    },
    {
        id: 4,
        name: "Giá thấp"
    },
    {
        id: 5,
        name: "Giá cao"
    },
]



export default FilterProduct