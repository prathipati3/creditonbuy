import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

export const Transactions = ({ data }) => {
    const [transactions, setTransactions] = useState(data);

    useEffect(() => {
        setTransactions(data)
    }, [data])

    return (
        <div style={{ flex: 1, flexDirection: 'row', width: '50%',padding:10 }}>
            <h3 style={{ color: 'black' }}>
                Transactions
            </h3>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>Product Id</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item, index) => {
                        const { productId, price,
                            quantity, total,
                            customerId, date } = item;
                        return (
                            <tr key={`${productId}+${customerId}+${index}`}>
                                <th scope="row">{customerId}</th>
                                <td>{productId}</td>
                                <td>{date}</td>
                                <td>{price}</td>
                                <td>{quantity}</td>
                                <td>{total}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

Transactions.propTypes = {
    data: PropTypes.array,
}