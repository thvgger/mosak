import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthModal } from '../../contexts/AuthModalContext';
import SellBg from "../../assets/sell-bg.png";

const Sell = () => {
  // const { isAuthenticated } = useAuth();
  const { hasCompleteSellerProfile } = useAuth();
  const { openModal } = useAuthModal();
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: "",
    price: '',
    stock: '',
    image: "",
    status: 'Active'
  });

  const handleAddProduct = (e) => {
    e.preventDefault();

    console.log('Product added');

    setShowAddModal(false);
  };

  const handleSellClick = () => {
    if (!hasCompleteSellerProfile) {
      // e.preventDefault();
      openModal('login');
    } else {
      setShowAddModal(!showAddModal);
    }
  };


  return (
    <div className='container min-h-100 py-16 mx-auto'>
      <div className='text-center flex flex-col gap-2 md:gap-4 items-center justify-center'>
        <h1 className='text-2xl md:text-4xl text-center font-semibold'> 
          Start Selling on 
          <span className='text-primary font-bold ml-1'>MosakHub</span> 
        </h1>
        {/* {!isAuthenticated ? (
          <p className='text-sm text-gray-500'>
            Please log in to add your products.
          </p>
        ) : ( */}
          <p className='text-sm text-gray-500'>
            Turn your products into income with secure transactions.
          </p>
        {/* )} */}
        <button className='btn px-4' onClick={() => {handleSellClick()}}>
          {/* {isAuthenticated ? 'Add New Product' : 'Become a Seller'} */}
          Add New Product
        </button>


        <img src={SellBg} alt="Sell on MosakHub" className='w-full max-w-md -mt-20 -z-1' />
      </div>


       {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-5000 p-4">
          
          {/* Modal Box */}
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg relative max-h-[95vh] overflow-y-auto scrollbar-hide">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Add New Product</h2>
              <button className='hover:bg-gray-200 rounded-full w-8 h-8' onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddProduct} className="space-y-4">              
              {/* Product Name */}
              <div>
                <label className="text-sm text-gray-600">Product Name</label>
                <input 
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="text-sm text-gray-600">Product Description</label>
                <textarea 
                  // type="text"
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-y"
                  placeholder="Enter product description"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-sm text-gray-600">Price</label>
                <input 
                  type="number"                  
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Stock */}
              <div>
                <label className="text-sm text-gray-600">Stock</label>
                <input 
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Enter stock quantity"
                  required
                />
              </div>

              {/* Image */}
              <div>
                <label className="text-sm text-gray-600">Product Image</label>
                <input 
                  type="file"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  // placeholder="Enter product name"
                />
              </div>
              

              {/* Status */}
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 btn btn-tertiary"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 btn"
                  // disabled={false}
                >
                  Save Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sell;