import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { result, fetchData, filter, setInputFilter, btnFilter, setBtnFilter,
    setFilters, filtersOn, setBtnOrder, btnOrder, setResults } = useContext(AppContext);
  const columnFilterOriginal = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  let columnFilter = columnFilterOriginal;
  columnFilter = columnFilter
    .filter((element) => !filtersOn.filtersList
      .find(({ column }) => element === column));
  const titles = ['Name', 'Rotation Period',
    'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'Url'];
  let nameFiltered = result.filter((planet) => planet.name.toUpperCase()
    .includes(filter.name.toUpperCase()));

  filtersOn.filtersList.forEach(({ column, comparison, value }) => {
    nameFiltered = nameFiltered.filter((e) => {
      switch (comparison) {
      case 'maior que':
        return Number(e[column]) > Number(value);
      case 'menor que':
        return Number(e[column]) < Number(value);
      default:
        return Number(e[column]) === Number(value);
      }
    });
  });

  useEffect(() => {
    async function getList() {
      const list = await fetchData();
      return list;
    }
    getList();
  }, [fetchData]);

  function handleClick({ target: { name } }) {
    if (name === 'numberFilter') {
      setFilters((prevState) => ({
        filtersList: [...prevState.filtersList, btnFilter],
      }));
    }
    if (name === 'Order') {
      nameFiltered
        .sort((a, b) => Number(b[btnOrder.column]) - Number(a[btnOrder.column]));
      if (btnOrder.sort === 'ASC') {
        nameFiltered
          .sort((a, b) => Number(a[btnOrder.column]) - Number(b[btnOrder.column]));
        setResults(nameFiltered);
      }
      if (btnOrder.sort === 'DESC') {
        setResults(nameFiltered);
      }
    }
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

  const handleExclude = ({ target: { name } }) => {
    if (name === 'excludeAll') {
      setFilters({ filtersList: [] });
    } else {
      const newfiltersList = filtersOn.filtersList.filter((e) => e.column !== name);
      setFilters({ filtersList: newfiltersList });
    }
  };

  const handleOrder = ({ target: { name, value } }) => {
    setBtnOrder({
      ...btnOrder,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <label htmlFor="inputFilter">
          <input
            type="text"
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
          name="column"
          value={ btnFilter.column }
          onChange={ handleFilters }
          onClick={ handleFilters }
          data-testid="column-filter"
        >
          { columnFilter
            .map((item, index) => (
              <option key={ index } value={ item }>{ item }</option>
            ))}
        </select>
        <select
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
          id="numberInput"
          name="value"
          value={ btnFilter.value }
          onChange={ handleFilters }
          data-testid="value-filter"
        />
        <button
          type="button"
          name="numberFilter"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
        <button
          type="button"
          name="excludeAll"
          onClick={ handleExclude }
          data-testid="button-remove-filters"
        >
          Remover todas filtragens
        </button>
        <select
          name="column"
          value={ btnOrder.column }
          onChange={ handleOrder }
          onClick={ handleOrder }
          data-testid="column-sort"
        >
          { columnFilter
            .map((item, index) => (
              <option key={ index } value={ item }>{ item }</option>
            ))}
        </select>
        <label htmlFor="ASC">
          <input
            type="radio"
            name="sort"
            value="ASC"
            onClick={ handleOrder }
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            name="sort"
            value="DESC"
            onClick={ handleOrder }
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>
        <button
          type="button"
          name="Order"
          data-testid="column-sort-button"
          onClick={ handleClick }
        >
          Ordenar
        </button>
      </div>
      <div>
        { filtersOn.filtersList
          .map((item, index) => (
            <div key={ index } value={ item } data-testid="filter">
              { item.column }
              {' '}
              {item.comparison}
              {' '}
              { item.value}
              {item.column && (
                <button
                  type="button"
                  name={ item.column }
                  onClick={ handleExclude }
                >
                  Excluir
                </button>)}
            </div>
          ))}
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
              <td data-testid="planet-name">{ e.name }</td>
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
