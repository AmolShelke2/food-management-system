import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setQuantity(1);
  };

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="card overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {!product.availability && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          {product.preparationTime && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {product.preparationTime} min
            </span>
          )}
        </div>

        {/* Quantity Selector & Add to Cart */}
        <div className="mt-4 flex gap-2">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
            <button
              onClick={handleDecrement}
              disabled={quantity === 1 || !product.availability}
              className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 min-w-[40px] text-center">{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={!product.availability}
              className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.availability}
            className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
