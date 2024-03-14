import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState:[],
    reducers:{
        addtocart :(state,action)=>{
            const existingproduct = state.find(item=>item.id==action.payload.id)
            if(existingproduct){
                    const remainingproduct = state.filter(item=>item.id!=existingproduct.id)
                    existingproduct.quantity++
                    existingproduct.totalprice = existingproduct.quantity * existingproduct.price 
                    state = [...remainingproduct,existingproduct]
            }
            else{
                state.push({...action.payload,quantity:1,totalprice:action.payload.price})

            }
        },
        removecartitem:(state,action)=>{
            return state.filter(item=>item.id!=action.payload)
        },
        incquantity:(state,action)=>{
            const existingproduct = state.find(item=>item.id==action.payload)
            existingproduct.quantity++
            existingproduct.totalprice = existingproduct.quantity * existingproduct.price 
            const remainingproduct = state.filter(item=>item.id!=existingproduct.id)
            state = [...remainingproduct,existingproduct]
        },
        decquantity:(state,action)=>{
            const existingproduct = state.find(item=>item.id==action.payload)
            existingproduct.quantity--
            existingproduct.totalprice = existingproduct.quantity * existingproduct.price 
            const remainingproduct = state.filter(item=>item.id!=existingproduct.id)
            state = [...remainingproduct,existingproduct]
        },
        emptycart:(state,action)=>{
            return state = []
        }


        
    }
})
export const {addtocart,removecartitem,incquantity,decquantity,emptycart} = cartSlice.actions
export default cartSlice.reducer

