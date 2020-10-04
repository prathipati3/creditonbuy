import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { months } from '../../constants';
import { transformRewardsForCustomers } from '../../utils/transactionHelper';

export const Rewards = ({ data }) => {
    const rewardsByCustomers = transformRewardsForCustomers(data)
    // considering only 3 months for now as per the transactions
    const rewardMonths = months.slice(0, 3);

    return (
        <div style={{ flex: 1, flexDirection: 'row', width: '50%', padding: 10 }}>
            <h3 style={{ color: 'black' }}>
                Rewards
            </h3>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Customer Id</th>
                        {rewardMonths.map(m => (<th key={m}>{m}</th>))}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {rewardsByCustomers.map((customer, index) => {
                        const { customerId, rewards } = customer;
                        const totalRewards = rewardMonths.reduce((acc, val) => {
                            acc += rewards[val];
                            return acc;
                        }, 0)
                        return (
                            <tr key={`${customerId}+${index}`}>
                                <th scope="row">{customerId}</th>
                                {rewardMonths.map(m => (<td key={m}>{rewards[m]}</td>))}
                                <td>{totalRewards}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

Rewards.propTypes = {
    data: PropTypes.array,
}