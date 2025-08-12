// src/hooks/useSearch.js
import { create } from "zustand";

const useSearch = create((set) => ({
    searchTerm: "",
    setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useSearch;
