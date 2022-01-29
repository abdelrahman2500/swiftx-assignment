import { gql, useQuery } from "@apollo/client";

const GET_CURRENCY = gql`
    {
        currencies{
            label,
            symbol
        }

    }
`;

export const useCurrency = () => {
    const { loading, error, data } = useQuery(GET_CURRENCY);

    return{
        error,
        data,
        loading
    }

}