import { Section, Container, CountryInfo, Loader } from 'components';
import { fetchCountry } from 'service/country-service';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Country = () => {
  const [countryEn, setCountryEn] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  const { countryId } = useParams();
  console.log(countryId);
  useEffect(() => {
    setIsLoading(true);
    const fetchCountries = async () => {
      try {
        const data = await fetchCountry(countryId);
        console.log(data);
        setCountryEn(data);
      } catch (error) {
        console.log('Error countries', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, [countryId]);

  const location = useLocation();

  const goBack = location?.state?.from ?? '/';

  const { flag, capital, countryName, id, languages, population } = countryEn;

  return (
    <Section>
      <Container>
        <button type="button">
          <Link to={goBack}>Back</Link>
        </button>
        <CountryInfo
          flag={flag}
          capital={capital}
          country={countryName}
          id={id}
          languages={languages}
          population={population}
        />
      </Container>
    </Section>
  );
};
