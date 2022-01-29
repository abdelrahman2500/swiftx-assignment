import { gql, useQuery } from "@apollo/client";

const GET_CATEGORY = gql`
{
    categories{
        name
    }

}
`;

export const useCategoriesNames = () => {
    const { loading, error, data } = useQuery(GET_CATEGORY);

    return{
        error,
        data,
        loading
    }

}