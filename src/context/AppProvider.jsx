import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [result, setResults] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const fetchedData = await response.json();
    const { results } = fetchedData;
    results.map((e) => delete e.residents);
    setResults(results);
  }, []);

  const values = {
    result,
    fetchData,
  };

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
