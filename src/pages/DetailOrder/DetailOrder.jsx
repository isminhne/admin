import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import OrderService from "../../services/order.service.js";
import pushToast from "../../helpers/sonnerToast.js";
import moment from "moment";
import './DetailOrder.css';
import {ORDER_STATUS} from "../Orders/Orders.jsx";

export default function DetailOrder() {
  const {id} = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    const res = await OrderService.getOrder(id);
    if (!res) {
      navigate('/orders');
      return;
    }
    setOrder(res);
  }

  const handleChangeStatus = async (id, status) => {
    const res = await OrderService.updateOrder({
      id,
      status
    });
    if(res) {
      pushToast("Update order successfully", "success");
      await fetchOrder();
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="order-details">
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {order?._id}</p>
      <p><strong>Status:</strong>
        <select
          value={order?.status}
          onChange={(e) => handleChangeStatus(order._id, e.target.value)}
        >
          {Object.values(ORDER_STATUS).map((status, index) => {
            return (
              <option key={index} value={status}>{status}</option>
            )
          })}
        </select>
      </p>
      <p><strong>Total:</strong> {order?.total} vnd</p>
      <p><strong>Created At:</strong> {moment(order?.createdAt)?.format("HH:mm, DD/MM/YYYY")}</p>
      <h2>Delivery Information</h2>
      <p><strong>First Name:</strong> {order?.deliveryInfo?.firstName}</p>
      <p><strong>Last Name:</strong> {order?.deliveryInfo?.lastName}</p>
      <p><strong>Email:</strong> {order?.deliveryInfo?.email}</p>
      <p><strong>Street:</strong> {order?.deliveryInfo?.street}</p>
      <p><strong>City:</strong> {order?.deliveryInfo?.city}</p>
      <p><strong>State:</strong> {order?.deliveryInfo?.state}</p>
      <p><strong>Country:</strong> {order?.deliveryInfo?.country}</p>
      <p><strong>Phone:</strong> {order?.deliveryInfo?.phone}</p>
      <h2>Products</h2>
      <div className="product-list">
        {order?.products?.map((item) => (
          <div key={item?._id} className="product-item">
            <p><strong>Product Name:</strong> {item?.product?.title}</p>
            <p><strong>Price:</strong> {item?.product?.price} vnd</p>
            <p><strong>Description:</strong> {item?.product?.description}</p>
            <p><strong>Quantity:</strong> {item?.quantity}</p>
            <img src={item?.product?.images[0]} alt={item?.product?.title} />
          </div>
        ))}
      </div>
    </div>
  );
}