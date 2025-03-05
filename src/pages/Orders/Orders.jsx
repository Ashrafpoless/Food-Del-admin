import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

// assets
import {assets} from '../../assets/assets.js'

//components
import './Orders.css';
import { useEffect } from 'react';
const Order = () => {
  const [orders, setOrders] = useState([]);
  // fetch orders data function
  const fetchAllOrders = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/order/list`);
    if(res.data.success){
      setOrders(res.data.data)
      console.log(res.data.data)

    }else {
      toast.error('Failed to fetch orders. Please try again later.');      
    }
  }

  const statusHandler= async (e, orderId) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/order/status`, {orderId, status: e.target.value});
    if(res.data.success){
      toast.success('Order status updated successfully.');
      await fetchAllOrders();
    }else {
      toast.error('Failed to update order status. Please try again later.');
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{
                  if(index === order.items.length - 1){
                    return item.name + " x " + item.quantity
                  }else{
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", " +order.address.state+", "+order.address.country+", "+order.address.postcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e)=> statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}



export default Order