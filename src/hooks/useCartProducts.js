import { gql, useQuery } from "@apollo/client";

const GET_CART_PRODUCTS = gql`
    query useProductInfo($id: String!){
        product(id:$id){
            id,
            name,
            gallery,
            attributes{
                id, 
                name, 
                type, 
                items{
                    id, 
                    displayValue, 
                    value
                }
            },
            prices{
                amount
                currency{
                    label, 
                    symbol
                }
            },
            brand
        }
    }
`;

export const useCartProducts = (id) => {
    const { loading, error, data } = useQuery(GET_CART_PRODUCTS, {
        variables: {
            id
        }
    });

    return{
        error,
        data,
        loading
    }

}