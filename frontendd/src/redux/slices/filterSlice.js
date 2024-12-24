// redux/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'All', // Default category
  priceRange: 'All', // Default price range
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setPriceRangeFilter: (state, action) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.category = 'All';
      state.priceRange = 'All';
    },
  },
});

export const { setCategoryFilter, setPriceRangeFilter, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
