import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../api';
import ProductCard from '../components/ProductCard';
import { Loader } from 'lucide-react';

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const categoriesRes = await productAPI.getCategories();
        setCategories(categoriesRes.data.data);

        // Fetch products
        const productsRes = await productAPI.getAll(category);
        setProducts(productsRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Menu</h1>
          <p className="text-gray-600">Browse our delicious selection of food</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-4">
          <button
            onClick={() => setSearchParams({})}
            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
              !category
                ? 'bg-primary text-white'
                : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-primary'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSearchParams({ category: cat.name })}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
                category === cat.name
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-primary'
              }`}
            >
              {cat.displayName} ({cat.count})
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader className="animate-spin text-primary" size={40} />
              <p className="text-gray-600">Loading menu...</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available in this category</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
