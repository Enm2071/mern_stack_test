import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../../actions/actionTypes";
import Order from "../../components/Order";
import httpClient from "../../api/http.client";

import "./Orders.style.css";

const Orders = () => {
    const dispatch = useDispatch();
    const { filteredOrders } = useSelector((state) => state);

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                dispatch({
                    type: actionTypes.FETCH_ORDERS,
                });
                const response = await httpClient.get("/orders");
                dispatch({
                    type: actionTypes.FETCH_ORDERS_SUCCESS,
                    payload: response.data.orders,
                });
            } catch (error) {
                dispatch({
                    type: actionTypes.FETCH_ORDERS_FAILURE,
                    payload: error.message,
                });
            }
        };

        fetchOrders();
    }, []);

    const sortOrderByDesc = (a, b) => {
        if (a.id > b.id) {
            return -1;
        }
        if (a.id < b.id) {
            return 1;
        }
        return 0;
    };

    return (
        <div className="Orders">
            <h1>Orders</h1>
            <div className="Products-items">
                {filteredOrders.sort(sortOrderByDesc).map(order => (
                    <Order
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        </div>
    );
};

export default Orders;