import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const fetchProductById = async (id: string) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
};

export const addToCart = async (item: any) => {
    const response = await axios.post(`${API_URL}/cart`, item);
    return response.data;
};

export const removeFromCart = async (itemId: string, userId?: string) => {
    // call DELETE /api/cart/:itemId optionally with userId as query/body
    const response = await axios.delete(`${API_URL}/cart/${itemId}`, {
        data: { userId },
    });
    return response.data;
};

export const fetchCart = async (userId?: string) => {
    const response = await axios.get(`${API_URL}/cart`, {
        params: userId ? { userId } : {},
    });
    return response.data;
};

export const checkout = async (orderData: any) => {
    const response = await axios.post(`${API_URL}/checkout`, orderData);
    return response.data;
};

export const registerUser = async (userData: any) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
};

export const loginUser = async (credentials: any) => {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
};

// compatibility aliases for older import names used in components
export const getProducts = fetchProducts;
export const getProductById = fetchProductById;
export const getCartItems = fetchCart;
export const getCart = fetchCart;

export default {
    fetchProducts,
    fetchProductById,
    addToCart,
    removeFromCart,
    fetchCart,
    checkout,
    registerUser,
    loginUser,
};