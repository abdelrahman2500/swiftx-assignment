import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';

function App() {

  const GET_CATEGORY = gql`
  {


    category{
  		name,
      products{
        id,
        name,
        inStock,
        prices{
          amount,
          currency{
            label,
            symbol
          }
        }
      }
    }

  }

  
  `;

  const { loading, error, data } = useQuery(GET_CATEGORY);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.category.products.map(( product ) => (
    <div key={product.id}>
      <p>
        {product.id} : {product.prices.map(price => price.currency.label == "USD" ? `${price.amount} ${price.currency.symbol}` : "")}
      </p>
    </div>
  ));
}

export default App;
