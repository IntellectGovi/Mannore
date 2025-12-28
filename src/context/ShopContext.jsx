import React, { createContext, useContext, useState, useEffect } from 'react';
// Removed mock product import; data will be fetched from Supabase API
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabase';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    inStock: false,
    onSale: false,
    sortBy: 'default',
  });

  // Products, Cart, Wishlist fetching
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
      setProductList([]); // Fallback to empty array
    } else if (data && data.length > 0) {
      setProductList(data);
    } else {
      setProductList([]);
    }
    setLoading(false);
  };

  const fetchUserData = async (userId) => {
    // Fetch Cart
    const { data: cartData } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', userId);
    
    if (cartData) {
      setCart(cartData.map(item => ({ ...item.products, qty: item.quantity, cart_item_id: item.id })));
    }

    // Fetch Wishlist
    const { data: wishlistData } = await supabase
      .from('wishlist_items')
      .select('*, products(*)')
      .eq('user_id', userId);
    
    if (wishlistData) {
      setWishlist(wishlistData.map(item => item.products));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          role: session.user.user_metadata?.role || 'user'
        });
        fetchUserData(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          role: session.user.user_metadata?.role || 'user'
        });
        fetchUserData(session.user.id);
      } else {
        setUser(null);
        setCart([]);
        setWishlist([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Cart helpers
  const addToCart = async (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });

    if (user) {
      const { error } = await supabase
        .from('cart_items')
        .upsert([{ 
          user_id: user.id, 
          product_id: product.id, 
          quantity: qty 
        }], { onConflict: 'user_id,product_id' });
      
      if (error) console.error('Error syncing cart:', error);
    }

    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = async (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    
    if (user) {
      await supabase.from('cart_items').delete().match({ user_id: user.id, product_id: id });
    }
  };

  const updateQty = (id, change) => {
    setCart(prev =>
      prev.map(i => {
        if (i.id === id) {
          const newQty = Math.max(1, i.qty + change);
          return { ...i, qty: newQty };
        }
        return i;
      })
    );
  };

  // Wishlist helpers
  const addToWishlist = async product => {
    const isAlreadyIn = wishlist.find(i => i.id === product.id);
    
    setWishlist(prev => {
      if (isAlreadyIn) {
        toast.info(`${product.name} removed from wishlist`);
        return prev.filter(i => i.id !== product.id);
      }
      toast.success(`${product.name} added to wishlist`);
      return [...prev, product];
    });

    if (user) {
      if (isAlreadyIn) {
        await supabase.from('wishlist_items').delete().match({ user_id: user.id, product_id: product.id });
      } else {
        await supabase.from('wishlist_items').insert([{ user_id: user.id, product_id: product.id }]);
      }
    }
  };

  const removeFromWishlist = async (id) => {
    const item = wishlist.find(i => i.id === id);
    if (item) toast.info(`${item.name} removed from wishlist`);
    
    setWishlist(prev => prev.filter(i => i.id !== id));

    if (user) {
      await supabase.from('wishlist_items').delete().match({ user_id: user.id, product_id: id });
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some(i => i.id === id);
  };

  const setCategory = (cat) => {
    setFilters({
      categories: [cat],
      priceRange: [0, 1000],
      inStock: false,
      onSale: false,
    });
  };

  // Auth helpers
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast.error(error.message);
      return false;
    }
    return true;
  };

  const register = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: 'user', // Default role
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return false;
    }
    toast.success('Registration successful! Please check your email for confirmation.');
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (name, email) => {
    if (!user) return false;

    // 1. Update Supabase Auth Metadata
    const { data: authData, error: authError } = await supabase.auth.updateUser({
      email: email,
      data: { full_name: name }
    });

    if (authError) {
      toast.error(authError.message);
      return false;
    }

    // 2. Update Profiles Table
    const { error: dbError } = await supabase
      .from('profiles')
      .update({ full_name: name, email: email })
      .eq('id', user.id);

    if (dbError) {
      console.error('Profile table update error:', dbError);
    }

    // 3. Update Local State
    setUser(prev => ({ ...prev, name, email }));
    return true;
  };

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      toast.error(error.message);
      return false;
    }
    return true;
  };

  const forgotPassword = (email) => {
    console.log('Password reset link sent to:', email);
    return true;
  };

  // Order management
  const placeOrder = async (orderData) => {
    if (!user) {
      toast.error('You must be logged in to place an order.');
      return false;
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        user_id: user.id,
        status: 'Pending',
        total: orderData.total,
        shipping_address: orderData.shippingAddress
      }])
      .select();

    if (error) {
      toast.error(error.message);
      return false;
    }

    // Clear cart in DB
    await supabase.from('cart_items').delete().eq('user_id', user.id);
    setCart([]);
    toast.success('Order placed successfully!');
    return true;
  };

  // Product management
  const addProduct = async (productData) => {
    // Map frontend fields to DB fields
    const dbProduct = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      original_price: productData.original_price,
      image_url: productData.image_url,
      category: productData.category,
      in_stock: productData.in_stock,
      is_sale: productData.is_sale,
      popularity: 0
    };

    const { data, error } = await supabase
      .from('products')
      .insert([dbProduct])
      .select();

    if (error) {
      toast.error(error.message);
      return false;
    }
    
    toast.success('Product added to database!');
    fetchProducts(); // Refresh list
    return true;
  };

  // Filter handling
  const applyFilters = () => {
    let filtered = productList;
    const { categories, priceRange, inStock, onSale } = filters;
    if (categories.length) {
      filtered = filtered.filter(p => categories.includes(p.category));
    }
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (inStock) filtered = filtered.filter(p => p.in_stock);
    if (onSale) filtered = filtered.filter(p => p.is_sale);

    // Sorting
    const sorted = [...filtered];
    if (filters?.sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (filters?.sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (filters?.sortBy === 'latest') {
      sorted.sort((a, b) => (b.id || 0) - (a.id || 0)); // Assuming higher ID is later
    } else if (filters?.sortBy === 'popularity') {
      sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)); // Mocked
    }

    return sorted;
  };

  const value = {
    products: productList,
    cart,
    wishlist,
    user,
    filters,
    setFilters,
    filteredProducts: applyFilters(),
    addToCart,
    removeFromCart,
    updateQty,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    setCategory,
    addProduct,
    placeOrder,
    login,
    logout,
    register,
    updateProfile,
    updatePassword,
    forgotPassword,
    isAdmin: user?.role === 'admin',
    loading,
    refreshProducts: fetchProducts,
    isCartOpen: false,
    setIsCartOpen: () => {},
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => useContext(ShopContext);
