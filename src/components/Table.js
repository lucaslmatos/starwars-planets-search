import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { result, setResults, fetchData, filter,
    setInputFilter, btnFilter, setBtnFilter } = useContext(AppContext);

  const titles = ['Name', 'Rotation Period',
    'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'Url'];

  let nameFiltered = result.filter((planet) => planet.name.toUpperCase()
    .includes(filter.name.toUpperCase()));

  useEffect(() => {
    async function getList() {
      const list = await fetchData();
      return list;
    }
    getList();
  }, [fetchData]);

  function handleClick() {
    const { column, comparison, value } = btnFilter;
    switch (comparison) {
    case 'maior que':
      nameFiltered = result
        .filter((item) => Number(item[column]) > Number(value));
      break;
    case 'menor que':
      nameFiltered = result
        .filter((item) => Number(item[column]) < Number(value));
      break;
    default:
      nameFiltered = result
        .filter((item) => Number(item[column]) === Number(value));
    }
    setResults(nameFiltered);
  }

  function handleChange({ target: { name, value } }) {
    setInputFilter({
      ...filter,
      [name]: value,
    });
  }

  const handleFilters = ({ target: { name, value } }) => {
    setBtnFilter({
      ...btnFilter,
      [name]: value,
    });
  };

  return (
    <div>
      <br />
      <div>
        <label htmlFor="inputFilter">
          <input
            type="text"
            id="nameFilter"
            name="name"
            value={ filter.name }
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
      </div>
      <br />
      <div>
        <select
          id="column"
          name="column"
          value={ btnFilter.column }
          onChange={ handleFilters }
          data-testid="column-filter"
        >
          <option defaultValue value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          id="comparisonFilter"
          name="comparison"
          value={ btnFilter.comparison }
          onChange={ handleFilters }
          data-testid="comparison-filter"
        >
          <option defaultValue value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          id="numberInput"
          name="value"
          value={ btnFilter.value }
          onChange={ handleFilters }
          data-testid="value-filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
      <br />
      <hr />
      <br />
      <table>
        <thead>
          <tr>
            {titles.map((e) => (
              <th key={ e }>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nameFiltered.map((e) => (
            <tr key={ e.url }>
              <td>{ e.name }</td>
              <td>{ e.rotation_period }</td>
              <td>{ e.orbital_period }</td>
              <td>{ e.diameter }</td>
              <td>{ e.climate }</td>
              <td>{ e.gravity }</td>
              <td>{ e.terrain }</td>
              <td>{ e.surface_water }</td>
              <td>{ e.population }</td>
              <td>{ e.films }</td>
              <td>{ e.created }</td>
              <td>{ e.edited }</td>
              <td>{ e.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
