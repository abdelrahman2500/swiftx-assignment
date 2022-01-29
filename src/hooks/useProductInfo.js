import { gql, useQuery } from "@apollo/client";

const GET_PRODUCT = gql`
    query useProductInfo($id: String!){
        product(id:$id){
            id,
            name,
            gallery,
            description,
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

export const useProductInfo = (id) => {
    const { loading, error, data } = useQuery(GET_PRODUCT, {
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