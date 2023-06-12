import './App.css';
import CountryCard from './components/CountryCard';
import CountryDetail from './components/CountryDetail';
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      currency
    }
  }
`;

function CountryList() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className='flexbox'>
      {data.countries.map((country) => (
        <Link key={country.code} to={`/${country.code}`}>
          <CountryCard country={country} />
        </Link>
      ))}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/:code' element={<CountryDetail />} />
        <Route path='/' element={<CountryList />} />
      </Routes>
    </Router>
  );
}

export default App;
