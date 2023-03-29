import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [result, setResults] = useState([]);
  const [filter, setInputFilter] = useState({ name: '' });
  const [btnFilter, setBtnFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [filtersOn, setFilters] = useState({
    filtersList: [],
  });

  const fetchData = useCallback(async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const fetchedData = await response.json();
    const { results } = fetchedData;
    results.map((e) => delete e.residents);
    setResults(results);
  }, []);

  const values = {
    result,
    setResults,
    fetchData,
    filter,
    setInputFilter,
    btnFilter,
    setBtnFilter,
    filtersOn,
    setFilters,
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
