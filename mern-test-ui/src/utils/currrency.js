export const convertToCurrency = (amount) => {
    return Number(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
};

export const calculateTotal = (amount, price) => {
    const total = amount * price;
    return convertToCurrency(total);
}