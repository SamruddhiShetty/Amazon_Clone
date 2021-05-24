//considering as a dataLayer
//it plays a very important role in pushing the elements to the dataLayer- eg: 
// when we press the "Add to Basket" button
export const initialState={
    basket:[],
    user:null
};

//Context API and REDUX have the same pattern of storing the item in global store.
//pattern of dispatching item to the basket

//Selector
export const getBasketTotal=(basket)=>
basket?.reduce((amount, item) => item.price+ amount, 0);
//the above line is the another way of doing the one displayed below
// function findPrice(basket){
//     var Sum=0;
//     for (let i=0; i<basket.length; i++){
//         Sum+=basket[i].price;
//     }
//     return Sum;
// }
const reducer = (state, action) =>{
    console.log(action);
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state, //orignal state
                basket: [...state.basket, action.item],
            };

        case 'EMPTY_BASKET':
            return {
                ...state, //keep the original state as it is
                basket: [] //but change the basket to empty
            }

        //    the index function only selects the first matching elements and returns the index which is used to remove the item.
        case "REMOVE_FROM_BASKET":
            const index=state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket];

            if (index>=0){

                newBasket.splice(index, 1); //cutting the basket by 1

            }else{
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`        
                )
            }

            return {
                ...state,
                basket: newBasket 
            }

        case "SET_USER":
            return{
                ...state,
                user:action.user
            }

        

        default:
            return state;
    }
};

export default reducer;
