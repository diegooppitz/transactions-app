import axios from 'axios';

export const getTransactions = () => {
    return axios({
        method: 'GET',
        url: `https://warren-transactions-api.herokuapp.com/api/transactions`,
    })
}