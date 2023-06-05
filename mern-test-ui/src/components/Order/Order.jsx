import React from "react";
import {
    Link
} from "react-router-dom";
import "./Order.style.css";


const Order = ({ order }) => {

    return (
        <div className="card">
            <div className="order-number">Order #{order.id} <span className={`order-status ${order.state}`}>{order.state}</span></div>
            <div className="item-count">Ítems: {order.totalItems}</div>
            <div className="total-amount">Total to pay: ${order.total.toFixed(2)}</div>

            <Link to={`/orders/${order.id}`}><button className="order-detail-button">detail</button></Link>
        </div>
    )
};

export default Order;