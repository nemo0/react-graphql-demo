export default function CountryCard(props) {
  const { code, name, capital, currency } = props.country;

  return (
    <div className='country-card-container'>
      <h1 className='country-code'>{code}</h1>
      <h1 className='country-name'>{name}</h1>
      <h2 className='country-capital'>{capital}</h2>
      <h3 className='country-currency'>{currency}</h3>
    </div>
  );
}
