import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const cartSchema = new mongoose.Schema({
    // allow userId to be either an ObjectId or a string (e.g. 'guest') to avoid casting errors
    userId: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        // ref removed because Mixed can be a string or ObjectId
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0
    }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;