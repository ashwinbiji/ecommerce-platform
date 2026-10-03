import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen bg-darkBg text-slate-200 p-8">
      <div className="max-w-6xl mx-auto mt-10">
        <Link to="/" className="text-neonCyan hover:text-neonPurple transition-colors font-bold tracking-wide uppercase mb-8 inline-block">
          &larr; Back to Catalog
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="rounded-2xl overflow-hidden border border-slate-700/50 relative h-96">
             <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent opacity-30 z-10"></div>
             <img src={product.image} alt={product.name} className="w-full h-full object-cover z-0" />
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-slate-400 tracking-widest uppercase text-sm mb-2">{product.brand} • {product.category}</h3>
            <h1 className="text-4xl font-extrabold text-white mb-6">{product.name}</h1>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple mb-6">
              ${product.price}
            </p>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mt-auto border-t border-slate-700/50 pt-8 flex items-center justify-between">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${product.countInStock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              <button 
                disabled={product.countInStock === 0}
                className="px-8 py-3 rounded-xl font-bold uppercase tracking-widest bg-gradient-to-r from-neonCyan to-neonPurple text-slate-900 hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;