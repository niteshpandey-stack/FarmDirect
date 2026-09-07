import React,{createContext,useContext,useMemo,useState} from "react";
const CartContext=createContext(null);
const key=(p)=>p?._id||p?.id;
export function CartProvider({children}){
 const [items,setItems]=useState(()=>{try{return JSON.parse(localStorage.getItem("farmdirect-cart"))||[]}catch{return[]}});
 const persist=(next)=>{setItems(next);localStorage.setItem("farmdirect-cart",JSON.stringify(next));};
 const addToCart=(product,quantity=1)=>persist((()=>{const id=key(product);const found=items.find(i=>key(i.product)===id);return found?items.map(i=>key(i.product)===id?{...i,quantity:Math.min((i.quantity||1)+quantity,product.stock||999)}:i):[...items,{product,quantity:Math.min(quantity,product.stock||999)}]})());
 const removeFromCart=id=>persist(items.filter(i=>key(i.product)!==id));
 const updateQuantity=(id,q)=>{const item=items.find(i=>key(i.product)===id);const max=item?.product?.stock||999;persist(items.map(i=>key(i.product)===id?{...i,quantity:Math.max(1,Math.min(Number(q)||1,max))}:i));};
 const clearCart=()=>persist([]);
 const total=useMemo(()=>items.reduce((s,i)=>s+(Number(i.product.price)||0)*(Number(i.quantity)||0),0),[items]);
 return <CartContext.Provider value={{items,addToCart,removeFromCart,updateQuantity,clearCart,total}}>{children}</CartContext.Provider>
}
export const useCart=()=>useContext(CartContext);
