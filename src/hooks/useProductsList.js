import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS_LIST = gql`
    {
        categories{
            name,
            products{
                id,
                name,
                inStock,
                gallery,
                category,
                prices{
                    amount
                    currency{
                        symbol
                    }
                },
            }
        }
    }
`;

export const useProductsList = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS_LIST);

    return{
        error,
        data,
        loading
    }

}