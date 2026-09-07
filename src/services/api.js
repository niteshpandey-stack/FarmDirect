const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
export function getToken(){ return localStorage.getItem("farmdirect-token"); }
async function request(path, options={}){
  const headers={...(options.body instanceof FormData ? {} : {"Content-Type":"application/json"}),...(options.headers||{})};
  const token=getToken(); if(token) headers.Authorization=`Bearer ${token}`;
  const response=await fetch(`${API_BASE_URL}${path}`,{...options,headers});
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.message||`API request failed: ${response.status}`);
  return data;
}
export const api={
 login:(email,password)=>request("/auth/login",{method:"POST",body:JSON.stringify({email,password})}),
 register:(payload)=>request("/auth/register",{method:"POST",body:JSON.stringify(payload)}),
 getProducts:(params={})=>{const q=new URLSearchParams();if(params.search)q.set("search",params.search);if(params.category&&params.category!=="All Categories")q.set("category",params.category);return request(`/products${q.toString()?`?${q}`:""}`)},
 getProduct:(id)=>request(`/products/${id}`),
 createProduct:(payload)=>request("/products",{method:"POST",body:JSON.stringify(payload)}),
 updateProduct:(id,payload)=>request(`/products/${id}`,{method:"PUT",body:JSON.stringify(payload)}),
 deleteProduct:(id)=>request(`/products/${id}`,{method:"DELETE"}),
 getFarmerMe:()=>request("/farmers/me"),
 updateFarmerLocation:(payload)=>request("/farmers/me/location",{method:"PATCH",body:JSON.stringify(payload)}),
 getNearbyFarmers:(lat,lng,radius=20)=>request(`/farmers/nearby?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}&radius=${radius}`),
 getOrders:()=>request("/orders"),
 createOrder:(payload)=>request("/orders",{method:"POST",body:JSON.stringify(payload)}),
 updateOrderStatus:(id,status)=>request(`/orders/${id}/status`,{method:"PUT",body:JSON.stringify({status})}),
 getAdminDashboard:()=>request("/admin/dashboard"),
 getFarmers:()=>request("/admin/farmers"),
 verifyFarmer:(id,verified)=>request(`/admin/farmers/${id}/verify`,{method:"PATCH",body:JSON.stringify({verified})}),
 getNearbyDeliveryPartners:(lat,lng,radius=20)=>request(`/delivery/nearby?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}&radius=${radius}`),
 assignDeliveryPartner:(orderId,partnerId)=>request("/delivery/assign",{method:"POST",body:JSON.stringify({orderId,partnerId})}),
 getDeliveryPartners:()=>request("/delivery/partners"),
 createDeliveryPartner:(payload)=>request("/delivery/partners",{method:"POST",body:JSON.stringify(payload)}),
 getMyDeliveryAssignments:()=>request("/delivery/my-assignments"),
 updateDeliveryLocation:(payload)=>request("/delivery/location",{method:"PATCH",body:JSON.stringify(payload)}),
 updateDeliveryStatus:(id,status,location={})=>request(`/delivery/assignments/${id}/status`,{method:"PATCH",body:JSON.stringify({status,...location})}),
 getOrderTracking:(id)=>request(`/delivery/orders/${id}/tracking`)
};
