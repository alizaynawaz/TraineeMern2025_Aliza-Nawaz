import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useCart from '../hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/*  Left: Image as Card */}
        <div className="w-full flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain h-[300px] w-full"
            />
          </div>
        </div>

        {/*  Right: Product Info */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold text-orange-500">${product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-1/2 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;


