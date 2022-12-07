
const faker = require("faker")
const fs = require("fs")

faker.locale = 'vi'

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('/');
}

const imgRandom = [
    faker.image.abstract(),
    faker.image.animals(),
    faker.image.cats(),
    faker.image.city(),
    faker.image.fashion(),
    faker.image.food(),
    faker.image.nature(),
    faker.image.nightlife(),
    faker.image.transport(),
    faker.image.technics(),
    faker.image.sports(),
    faker.image.people(),
]

const ramdomImgList = (n) => {
    var imgList = []
    for (let i = 0; i < n; i++) {
        imgList.push(imgRandom[faker.datatype.number({ 'min': 0, 'max': 11 })])
    }
    return imgList
}

const randomProductList = (numberOfProducts) => {
    if (numberOfProducts <= 0) return [];

    const productList = [];

    const country = ['Việt Nam', 'Mỹ', 'Thái Lan']


    var category = JSON.parse(fs.readFileSync('./static-data/category.json', 'utf8'));
    var brand = JSON.parse(fs.readFileSync('./static-data/brand.json', 'utf8'));


    var detailProduct = () => {
        const categoryProduct = category[faker.datatype.number({ 'min': 0, 'max': 1 })]
        return {
            category: { id: categoryProduct.id, name: categoryProduct.name },
            images: ramdomImgList(faker.datatype.number({ 'min': 3, 'max': 10 })),
            options: categoryProduct.options,
            specifications: [
                {
                    name: 'origins',
                    display: 'Xuất xứ',
                    value: country[faker.datatype.number({ 'min': 0, 'max': 2 })]
                },
                {
                    name: 'brands',
                    display: 'Thương hiệu',
                    value: brand[faker.datatype.number({ 'min': 0, 'max': 3 })].name
                }
            ],
            description: faker.random.words(faker.datatype.number({ 'min': 30, 'max': 500 }))
        }
    }

    // random data
    Array.from(new Array(numberOfProducts)).forEach(() => {
        const product = {
            id: faker.random.uuid(),
            image: imgRandom[faker.datatype.number({ 'min': 0, 'max': 11 })],
            name: faker.commerce.productName(),
            rate: faker.datatype.number({ 'min': 0, 'max': 5 }),
            price: faker.datatype.number({ 'min': 1000, 'max': 10000000 }),
            discount: faker.datatype.number({ 'min': 0, 'max': 100 }),
            sold: faker.datatype.number({ 'min': 0, 'max': 100 }),
            details: detailProduct()
        };

        productList.push(product);
    });

    return productList;
};

const randomNotificationList = (numberOfNotifications) => {
    if (numberOfNotifications <= 0) return [];

    const typeNotification = [
        {
            id: 1,
            name: 'discount'
        },
        {
            id: 2,
            name: 'order'
        },
        {
            id: 3,
            name: 'system'
        }
    ]
    const notificationList = [];

    // random data
    Array.from(new Array(numberOfNotifications)).forEach(() => {
        const notification = {
            id: faker.random.uuid(),
            date: formatDate(faker.date.between('2020-01-01', '2022-01-01')),
            text: faker.random.words(faker.datatype.number({ 'min': 30, 'max': 60 })),
            type: typeNotification[faker.datatype.number({ 'min': 0, 'max': 2 })].name,
            link: ''
        };
        notificationList.push(notification);
    });

    return notificationList;
};

const randomCouponList = (numberOfCoupon) => {
    if (numberOfCoupon <= 0) return [];

    const imageLink = [
        'https://salt.tikicdn.com/cache/128x128/ts/upload/92/ad/57/0d9a096885400b7b4752b67afdc72898.png',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/4f/bb/60/2797e4e553ea5b4e9b4f93ad63ccc110.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/c2/61/91/6c9f5ffdc717a12ddbc00ba810f640af.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/df/75/06/1079e41dccd9ca93b2ff28c40171e66a.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/b4/11/e9/a70b080cf3c808d5812df2f52a5483ad.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/7e/9f/64/e846fe20e9700e4404c06b6917bf66f4.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/0a/9d/2a/543b4485d46bbdfe088312aee042da44.jpg',
    ]

    const couponList = [];

    // random data
    Array.from(new Array(numberOfCoupon)).forEach(() => {
        const coupon = {
            id: faker.random.uuid(),
            publisher: faker.company.companyName(),
            title: faker.random.words(faker.datatype.number({ 'min': 2, 'max': 4 })),
            subtitle: faker.random.words(faker.datatype.number({ 'min': 5, 'max': 10 })),
            expired: formatDate(faker.date.between('2020-01-01', '2022-01-01')),
            image: imageLink[faker.datatype.number({ 'min': 0, 'max': 6 })],
            unit: faker.datatype.number({ 'min': 0, 'max': 10 }),
            link: ''

        };
        couponList.push(coupon);
    });

    return couponList;
};

const randomMyReviewList = (numberOfReview) => {
    if (numberOfReview <= 0) return [];

    const imgRateList = (n) => {
        var imgList = []
        for (let i = 0; i < n; i++) {
            imgList.push(imgRandom[faker.datatype.number({ 'min': 0, 'max': 11 })])
        }
        return imgList
    }

    const satisfy = ['Rất hài lòng', 'Hài lòng', 'Tạm hài lòng', 'Không hài lòng', 'Rất không hài lòng']

    const reviewList = [];

    // random data
    Array.from(new Array(numberOfReview)).forEach(() => {
        const review = {
            id: faker.random.uuid(),
            productName: faker.commerce.productName(),
            productImg: faker.image.technics(),
            storeName: faker.company.companyName(),
            rating: faker.datatype.number({ 'min': 0, 'max': 5 }),
            satisfy: satisfy[faker.datatype.number({ 'min': 0, 'max': 4 })],
            content: faker.lorem.paragraph(),
            imgRate: imgRateList(faker.datatype.number({ 'min': 0, 'max': 5 }))

        };
        reviewList.push(review);
    });

    return reviewList;
};

const randomMyOrderList = (numberOfOrder) => {
    if (numberOfOrder <= 0) return [];

    const randomProductOrder = (numberOfProducts) => {
        if (numberOfProducts <= 0) return [];

        const productList = [];

        // random data
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                id: faker.random.uuid(),
                image: imgRandom[faker.datatype.number({ 'min': 0, 'max': 11 })],
                name: faker.commerce.productName(),
                price: faker.datatype.number({ 'min': 1000, 'max': 10000000 }),
                discount: faker.datatype.number({ 'min': 0, 'max': 100 }),
                quantity: faker.datatype.number({ 'min': 0, 'max': 100 }),
            };

            productList.push(product);
        });

        return productList;
    };

    const orderType = [
        {
            id: 1,
            name: 'Chờ thanh toán'
        },
        {
            id: 2,
            name: 'Đang xử lý'
        },
        {
            id: 3,
            name: 'Đang vận chuyển'
        },
        {
            id: 4,
            name: 'Đã giao'
        },
        {
            id: 5,
            name: 'Đã hủy'
        },
    ]

    const orderList = [];

    // random data
    Array.from(new Array(numberOfOrder)).forEach(() => {

        const order = {
            id: faker.random.uuid(),
            type: orderType[faker.datatype.number({ 'min': 0, 'max': 4 })],
            totalPrice: faker.datatype.number({ 'min': 100000, 'max': 10000000 }),
            products: randomProductOrder(faker.datatype.number({ 'min': 1, 'max': 5 }))

        };
        orderList.push(order);
    });

    return orderList;
};

const randomAddressList = (numberOfAddress) => {
    if (numberOfAddress <= 0) return [];

    const addressList = [];

    // random data
    Array.from(new Array(numberOfAddress)).forEach(() => {

        const address = {
            id: faker.random.uuid(),
            name: faker.random.words(faker.datatype.number({ 'min': 2, 'max': 5 })),
            address: faker.random.words(faker.datatype.number({ 'min': 10, 'max': 50 })),
            phone: faker.phone.phoneNumber()

        };
        addressList.push(address);
    });

    return addressList;
}


(() => {

    // const productList = randomProductList(100);

    var productList = JSON.parse(fs.readFileSync('./static-data/products.json', 'utf8'));

    const notificationList = randomNotificationList(30)

    const couponList = randomCouponList(40)

    const myReviewList = randomMyReviewList(10)

    //const myOrderList = randomMyOrderList(10)
    const myOrderList = []
    

    const addressList = randomAddressList(10)

    var aboutTiki = JSON.parse(fs.readFileSync('./static-data/aboutTiki.json', 'utf8'));
    var categorySpecify = JSON.parse(fs.readFileSync('./static-data/categorySpecify.json', 'utf8'));
    var quickLink = JSON.parse(fs.readFileSync('./static-data/quickLink.json', 'utf8'));
    var sliderKhuyenMai = JSON.parse(fs.readFileSync('./static-data/sliderKhuyenMai.json', 'utf8'));
    var sliderThuongHieu = JSON.parse(fs.readFileSync('./static-data/sliderThuongHieu.json', 'utf8'));
    var suggestions = JSON.parse(fs.readFileSync('./static-data/suggestions.json', 'utf8'));
    var supportCustomer = JSON.parse(fs.readFileSync('./static-data/supportCustomer.json', 'utf8'));

    const db = {
        products: productList,
        notifications: notificationList,
        coupons: couponList,
        myReview: myReviewList,
        myOrder: myOrderList,
        address: addressList,
        aboutTiki: aboutTiki,
        categorySpecify: categorySpecify,
        quickLink: quickLink,
        sliderKhuyenMai: sliderKhuyenMai,
        sliderThuongHieu: sliderThuongHieu,
        suggestions: suggestions,
        supportCustomer: supportCustomer,

    }

    fs.writeFile("db.json", JSON.stringify(db), () => {
        console.log("Generate data successfully");
    });
})();



