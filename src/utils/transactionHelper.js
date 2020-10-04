// assuming all transactions will always be from a single year
// lodash library can be used for groupBy 
// using custom js code to group arrays
import { months } from "../constants";

// here year 2020
export const groupByMonth = (transactions) => {
    return transactions.reduce((acc, item) => {
        const { date } = item;
        const jsDate = new Date(date);
        const month = months[jsDate.getMonth()];
        if (acc[month]) acc[month].push(item);
        else acc[month] = [item];
        return acc;
    }, {})
}

export const transactionsByCustomer = (transactions) => {
    return transactions.reduce((acc, item) => {
        const { customerId } = item;
        if (acc[customerId]) acc[customerId].push(item);
        else acc[customerId] = [item];
        return acc;
    }, {})
}

export const calculateRewardForItem = (item) => {
    let totalRewards = 0;
    const { total } = item;
    // 2 x rewards
    const twoXRewards = total - 100;
    if (twoXRewards > 0) {
        totalRewards += twoXRewards * 2;
    }
    // 1 x rewards
    const oneXRewards = total - 50 - (twoXRewards > 0 ? twoXRewards : 0);
    if (oneXRewards > 0) {
        totalRewards += oneXRewards;
    }
    return totalRewards;
}

export const transformRewardsForCustomers = (transactions) => {
    // get transactions per customer
    const transactionsPerCustomer = transactionsByCustomer(transactions);
    return Object.keys(transactionsPerCustomer).map(key => {
        let response = {
            rewards: {}
        };
        const customerTransactions = transactionsPerCustomer[key];
        // just to get customerId
        const [firstTransaction] = customerTransactions;
        const { customerId } = firstTransaction;
        response.customerId = customerId;
        // get transactions by month
        const byMonths = groupByMonth(customerTransactions);
        // get rewards by month
        Object.keys(byMonths).forEach(key => {
            const totalForMonth = byMonths[key].reduce((acc, item) => {
                const total = calculateRewardForItem(item);
                acc += total;
                return acc;
            }, 0)
            response.rewards = {
                ...response.rewards,
                [key]: totalForMonth,
            }
        });
        return response
    });
}
