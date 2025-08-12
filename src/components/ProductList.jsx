import useProducts from "../hooks/useProducts";
import useSearch from "../hooks/useSearch"; //  Import search hook
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ProductList = () => {
  const { products, isLoading, isError } = useProducts();
  const { searchTerm } = useSearch(); //  use search hook

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMenuId, setShowMenuId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    price: "",
    image: "",
  });
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setProductList(products);
    }
  }, [products]);

  //  Delete Product
  const handleDelete = (id) => {
    const updated = productList.filter((p) => p.id !== id);
    setProductList(updated);
    setShowMenuId(null);
  };

  //  Open Edit Modal
  const openEditModal = (product) => {
    setEditedProduct({
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setSelectedProduct(product);
    setShowMenuId(null);
  };

  //  Save Edited Product
  const handleEditSave = () => {
    const updated = productList.map((p) =>
      p.id === selectedProduct.id ? { ...p, ...editedProduct } : p
    );
    setProductList(updated);
    setSelectedProduct(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;

  //  Apply Search Filter
  const filteredProducts = productList.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center w-full col-span-full text-gray-500">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative rounded-lg p-4 bg-white shadow hover:shadow-lg transition flex flex-col items-start"
            >
              {/* Three Dots Menu - Top Right */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() =>
                    setShowMenuId(showMenuId === product.id ? null : product.id)
                  }
                >
                  <BsThreeDotsVertical className="text-gray-500" />
                </button>
                {showMenuId === product.id && (
                  <div className="absolute z-10 right-0 mt-2 bg-white border rounded shadow text-sm w-28">
                    <button
                      onClick={() => openEditModal(product)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <img
                src={product.image}
                alt={product.title}
                className="h-32 object-contain mb-2 mx-auto"
              />
              <h3 className="font-semibold text-left w-full line-clamp-2">
                {product.title}
              </h3>
              <p className="text-orange-600 font-bold mb-2 text-left w-full">
                ${product.price}
              </p>
              <Link
                to={`/product/${product.id}`}
                className="mt-auto bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition self-start"
              >
                Add to Cart
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <input
              type="text"
              placeholder="Title"
              value={editedProduct.title}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, title: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <input
              type="number"
              placeholder="Price"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, price: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editedProduct.image}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, image: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;



