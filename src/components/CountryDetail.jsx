import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_COUNTRY_DETAIL = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      capital
      currency
      emoji
      states {
        code
        name
      }
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;

const CountryDetail = () => {
  const { code } = useParams();
  const { loading, error, data } = useQuery(GET_COUNTRY_DETAIL, {
    variables: { code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className='container'>
      <div className='country-detail-container'>
        <h1 className='country-name'>
          {data.country.name}{' '}
          <span className='country-emoji'>{data.country.emoji}</span>
        </h1>
        <p className='country-capital'>Capital: {data.country.capital}</p>
        <p className='country-currency'>Currency: {data.country.currency}</p>
        <div className='country-states'>
          <h3>States:</h3>
          <div className='states'>
            {data.country.states &&
              data.country.states.map((state) => (
                <div className='state' key={state.code}>
                  {state.name}
                </div>
              ))}
          </div>
        </div>
        <div className='country-languages'>
          <h3>Languages:</h3>
          {data.country.states &&
            data.country?.languages.map((lang, index) => (
              <span className='language' key={index}>
                {lang.name}
              </span>
            ))}
        </div>
        <p className='country-continent'>
          Continent: {data.country.continent.name}
        </p>
      </div>
    </div>
  );
};

export default CountryDetail;
