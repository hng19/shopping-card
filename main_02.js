let products = [{
        id: 1,
        title: "Điện thoại Samsung Galaxy Z Fold3 5G 512GB",
        description: "Galaxy Z Fold3 5G, chiếc điện thoại được nâng cấp toàn diện về nhiều mặt, đặc biệt đây là điện thoại màn hình gập đầu tiên trên thế giới có camera ẩn (08/2021). Sản phẩm sẽ là một “cú hit” của Samsung góp phần mang đến những trải nghiệm mới cho người dùng.",
        count: 2,
        price: 43990000,
        image: "https://cdn.tgdd.vn/Products/Images/42/226935/samsung-galaxy-z-fold-3-silver-1-600x600.jpg"

    },
    {
        id: 2,
        title: "Điện thoại iPhone 13 Pro Max 1TB",
        description: "iPhone 13 Pro Max 1 TB thuộc phân khúc điện thoại cao cấp mà không một iFan nào có thể bỏ qua, với màn hình lớn sắc nét, cấu hình vượt trội, dung lượng lưu trữ khủng, thời gian sử dụng dài, mỗi lần trải nghiệm đều cho bạn cảm giác thỏa mãn đáng ngạc nhiên.",
        count: 1,
        price: 46690000,
        image: "https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-gold-1-600x600.jpg"

    }
]
//Mã giảm giá:
let promotionCode = {
    A: 10,
    B: 20,
    C: 30,
    D: 40
}

//convert tiền:
function convertMoney(number) {
    return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

//Truy cap vao cac thanh phan:
let productsEl = document.querySelector(".products")

//Hien thi du lieu tren giao dien
function renderProduct(arr) {
    productsEl.innerHTML = "";
    //Cap nhat so luong sp:
    updateTotalProduct(arr)
    //Update so luowng:
    updateTotalMoney(arr)

    //Kiem tra khong co san pham nao trong gio hang
    if(arr.length == 0) {
        productsEl.insertAdjacentHTML("afterbegin", "<li>Khong co sp nao trong gio hang</li>");
        document.querySelector(".option-container").style.display = "none";
        return
    }
    //TH co sp:
    let html = ""
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        html += `
        <li class="row">
        <div class="col left">
            <div class="thumbnail">
                <a href="#">
                    <img src="${p.image}" alt="${p.title}">
                </a>
            </div>
            <div class="detail">
                <div class="name"><a href="#">${p.title}</a></div>
                <div class="description">
                ${p.description}
                </div>
                <div class="price">${convertMoney(p.price)}</div>
            </div>
        </div>

        <div class="col right">
            <div class="quantity">
                <button onclick="subtractCount(${p.id})" class="btn-subtract">-</button>
                <p>${p.count}</p>
                <button onclick="addCount(${p.id})" class="btn-add">+</button>
            </div>

            <div class="remove">
                <span class="close" onclick="removeProduct(${p.id})">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
            </div>
        </div>
    </li>
        `
        
    }
//Chen lai noi dung cho phan tu:
    productsEl.innerHTML = html
}

//Tinh so luong san pham:
function updateTotalProduct(arr) {
    //Duyet vong lap de tinh tong cac gia tri cua thuoc tinh "count"
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
       
        const element = arr[i];
        total += element.count
    }

    //Update tong tinh duoc trong phan tu co class "count"
    const totalProduct = document.querySelector(".count")
    totalProduct.innerText = `${total} items in the bag`
}

//Xoa sp:
function removeProduct(id) {
    for (let i = 0; i < products.length; i++) {
        if(products[i].id == id) {
            products.splice(i, 1)
        }
    }
    renderProduct(products)
}

//Thay doi so luong sp:
    //Giam sl:
    
function subtractCount(id) {
    for (let i = 0; i < products.length; i++) {
        if(products[i].id == id) {
            if(products[i].count == 0) {
                return
            }
            products[i].count -= 1
            
        }
    }
    renderProduct(products)
}

 //Tang sl:
function addCount(id) {
    for (let i = 0; i < products.length; i++) {
        if(products[i].id == id) {
            products[i].count += 1
        }
    }
    renderProduct(products)
}


let inputPromotion = document.querySelector('#promo-code');

function checkPromotion() {
    let value = inputPromotion.value;
    if (promotionCode[value]) {
        return promotionCode[value];
    }
    return 0;
}

//Tính tong tien:
const subTotal = document.querySelector(".subtotal span")
const vat = document.querySelector(".vat span")
const total = document.querySelector(".total span")
const discount = document.querySelector('.discount');
const discountEle = document.querySelector('.discount span');

// Cập nhật tổng tiền
function updateTotalMoney(arr) {
    // Tính tổng tiền cart
    let totalMoney = 0;
    let discountMoney = 0;

    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        totalMoney += p.count * p.price;
    }

    // Có mã giảm giá hay không?
    // Mã giảm giá có hợp lệ hay không?
    let data = checkPromotion();

    if (data) {
        discountMoney = (totalMoney * data) / 100;
        discount.classList.remove('hide');
    } else {
        discount.classList.add('hide');
    }

    // Cập nhật tiền lên trên giao diện
    subTotal.innerText = convertMoney(totalMoney);
    vat.innerText = convertMoney(totalMoney * 0.05);
    discountEle.innerText = convertMoney(discountMoney);
    total.innerText = convertMoney(totalMoney * 1.05 - discountMoney);
}
const btnPromotion = document.querySelector('.promotion button');

btnPromotion.addEventListener('click', function () {
    updateTotalMoney(products);
});
renderProduct(products)
