const product_list = document.getElementById("products");
const cart_list = document.getElementById("cart-list");
const total_price = document.getElementById("total-price");
let product_arry = [];
let to_show = null;

let datajson = null;
  const fetchData = async ()=>{
  const resualt = await fetch("data.json");
  datajson = await resualt.json();
  dataProduct(datajson);
 }
const dataProduct = async(product)=>{
  const products = await product;

    products.forEach(prd => {
      const {id , name , price , alt , image } = prd;

      const div_elem = document.createElement("div");

      div_elem.innerHTML = `<img src=${image} alt=${alt}>
      <div id="products-info">
        <div>
          <span>$ ${price}</span>
          <button id=${id} onclick="clickButton(${id})">+</button>
        </div>
        <h3>${name}</h3>
      </div>
      `
      product_list.append(div_elem)
    }
    )
}
const toshowFunction=()=>{
  to_show = [... new Set(product_arry)];
 cart_list.innerHTML = "";
to_show.forEach(item => 
 {
 const qty = product_arry.filter(p=> p.id === item.id).length;
 showCart(item , qty); 
 }
);
 }
const clickButton = (e) => {
   const find_id = datajson.find(item => item.id === e);
   product_arry.push(find_id);
   toshowFunction();
   totalPrice()
 }
 function showCart(item , qty) {
  const cart_div = document.createElement("div");
  const {id , name , price , alt , image } = item;
   const contrlelem = `
      <img src=${image} alt=${alt}>
        <div id="cart-info">
          <h4>${name}</h4>
          <p>$ ${price}</p>
        </div>
      <div id="cart-control">
        <div>
          <button id=${id}>-</button>
          <span>${qty}</span>
          <button id=${id}>+</button>
      </div>
      <button id=${id}>remove</button>
    </div>`;
    cart_div.innerHTML =  contrlelem;

    cart_list.append(cart_div)
 }
//  const totalPrice = () => {
  // 
  // total_price.innerText = `$ `
//  }
const cartlist =(event) => {
  const elem = event.target.tagName;
  const elem_id = event.target.id;
  const elem_inner = event.target.innerText;

  if(elem !== "BUTTON") return;
  else {
    if(elem_inner === "-"){
      minez(elem_id)
    }
    else if(elem_inner === "+"){
      pluse(elem_id)
    }
    else if(elem_inner === "remove"){
      removePrd(elem_id)
    }
  }
function minez(id){
  const new_cart = product_arry.findIndex(elem => elem.id === +id);
  product_arry.splice(new_cart , 1);
  toshowFunction()
};
function pluse(id){
  const new_cart = product_arry.find(elem => elem.id === +id);
  product_arry.push(new_cart);
  toshowFunction()
};
function removePrd(id){
  const new_cart = product_arry.filter(item => item.id !== +id);
  product_arry = new_cart;
  toshowFunction();
  // const new_cart = to_show.findIndex(elem => elem.id === +id);
  // to_show.splice(new_cart , 1);
  // cart_list.innerHTML = "";
  // to_show.forEach(item => 
  //  {
  //  const qty = product_arry.filter(p=> p.id === item.id).length;
  //  showCart(item , qty); 
  //  }
  // );
};
}
function totalPrice(){
  const sum_price = product_arry.reduce((a , b)=>a + b.price,0)
  total_price.innerText = `$ ${sum_price}`
}
cart_list.addEventListener("click" , cartlist)
 window.addEventListener("load" , fetchData())