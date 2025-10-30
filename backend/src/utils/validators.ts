export const validateProduct = (product) => {
    const errors = {};
    if (!product.name || product.name.trim() === '') {
        errors.name = 'Product name is required';
    }
    if (!product.price || isNaN(product.price) || product.price <= 0) {
        errors.price = 'Valid product price is required';
    }
    if (!product.description || product.description.trim() === '') {
        errors.description = 'Product description is required';
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateUserRegistration = (user) => {
    const errors = {};
    if (!user.username || user.username.trim() === '') {
        errors.username = 'Username is required';
    }
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
        errors.email = 'Valid email is required';
    }
    if (!user.password || user.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateCartItem = (item) => {
    const errors = {};
    if (!item.productId) {
        errors.productId = 'Product ID is required';
    }
    if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
        errors.quantity = 'Valid quantity is required';
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateOrder = (order) => {
    const errors = {};
    if (!order.userId) {
        errors.userId = 'User ID is required';
    }
    if (!order.items || order.items.length === 0) {
        errors.items = 'At least one item is required in the order';
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};