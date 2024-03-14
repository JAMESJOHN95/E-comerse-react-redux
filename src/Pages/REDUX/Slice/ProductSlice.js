import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const FetchProducts = createAsyncThunk('products/FetchProducts',async()=>{
const response = await axios.get("https://dummyjson.com/products")
// console.log(response.data.products);
sessionStorage.setItem("allproducts",JSON.stringify(response.data.products))
return response.data.products
})

const productSlice =  createSlice({
    name:'products',
    initialState:{
        allProducts:[],
        allproductsdummy:[],
        error:"",
        loading:false
        
    },
    reducers:{

        searchproducts:(state,action)=>{
            state.allProducts = state.allproductsdummy.filter(item=>item.title.toLowerCase().includes(action.payload))
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(FetchProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.allProducts = action.payload
            state.allproductsdummy = action.payload
            state.error = ""
        })
        builder.addCase(FetchProducts.pending,(state,action)=>{

            state.loading = true
            state.allProducts = []
            state.error = ""
        })
        builder.addCase(FetchProducts.rejected,(state,action)=>{
            state.loading=false
            state.allProducts=[]
            state.error="API Call Failed.....Please Try After Some Time!!!!!!!"
        })
    }

    
})
export const {searchproducts} = productSlice.actions

export default productSlice.reducer