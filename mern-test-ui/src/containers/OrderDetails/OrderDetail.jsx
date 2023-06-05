import React, { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom";
import httpClient from "../../api/http.client";
import {
    convertToCurrency,
    calculateTotal
} from "../../utils/currrency";
import {
    useNavigate
} from "react-router-dom";

import "./OrderDetail.style.css";


const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await httpClient.get(`/orders/${id}`);
                setOrder(response.data.order);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrder();
    }, []);


    const updateOrderState = async (state) => {
        try {
            await httpClient.put(`/orders/${id}/state/${state}`);
            navigate('/orders')
        } catch (error) {
            console.error(error);
        }
    }

    if (!order) return (<div className="order-details">Loading...</div>);

    return (
        <div className="order-details">
            <h2 className="order-title">Order Detail #{order?.id}</h2>

            <table className="order-items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order && (order?.items?.map(item => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>${item.price}</td>
                                <td>{item.OrderProduct.amount}</td>
                                <td>{calculateTotal(item.price, item.OrderProduct.amount)}</td>
                            </tr>
                        )))
                    }
                </tbody>
            </table>

            <div className="order-total">
                <p>Total to Pay: {convertToCurrency(order?.total)}</p>
            </div>
            {order.state === 'pending' && (
                <div className="order-buttons">

                    <button className="cancel-button" onClick={() => {
                        updateOrderState('cancelled')
                    }}>Cancel Order</button>
                    <button className="pay-button" onClick={() => {
                        updateOrderState('completed')
                    }}>Pay Order</button>
                </div>
            )}

        </div>
    )
};

export default OrderDetails;