import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-darkBg text-slate-200 p-8">
      <header className="mb-16 text-center mt-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple drop-shadow-lg mb-4">
          NEXT-GEN COMMERCE
        </h1>
        <p className="text-slate-400 text-lg tracking-widest uppercase">Hardware • Art • Tech</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <div key={product._id} className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-neonCyan/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(0,242,254,0.15)] group flex flex-col">
            
            <div className="h-48 w-full bg-slate-900 rounded-xl mb-6 overflow-hidden flex items-center justify-center border border-slate-800 group-hover:border-neonPurple/50 transition-colors duration-300 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent opacity-50 z-10"></div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-0"
              />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-neonCyan transition-colors">
              {product.name}
            </h2>
            
            <p className="text-slate-400 text-sm mb-6 line-clamp-3">
              {product.description}
            </p>
            
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
              <span className="text-2xl font-bold text-neonPurple">${product.price}</span>
              <Link to={`/product/${product._id}`} className="px-5 py-2 rounded-lg font-bold uppercase tracking-wide bg-slate-700/50 text-slate-300 hover:bg-gradient-to-r hover:from-neonCyan hover:to-neonPurple hover:text-slate-900 transition-all duration-300">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;