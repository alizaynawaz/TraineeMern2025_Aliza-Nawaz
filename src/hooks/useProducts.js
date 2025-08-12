import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useProducts = () => {
  const { data, error } = useSWR("https://fakestoreapi.com/products", fetcher);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProducts; // ✅ default export

