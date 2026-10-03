import { create } from 'zustand';

const useCartStore = create((set) => ({
  // Load initial cart from local storage if it exists
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  
  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find((x) => x._id === item._id);
    let newCartItems;
    
    if (existingItem) {
      // If item exists, update its quantity
      newCartItems = state.cartItems.map((x) => (x._id === existingItem._id ? item : x));
    } else {
      // If item is new, add it to the array
      newCartItems = [...state.cartItems, item];
    }
    
    // Save to local storage
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    return { cartItems: newCartItems };
  }),

  removeFromCart: (id) => set((state) => {
    const newCartItems = state.cartItems.filter((x) => x._id !== id);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    return { cartItems: newCartItems };
  }),
}));

export default useCartStore;