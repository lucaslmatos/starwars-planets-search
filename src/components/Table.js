import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { result, fetchData, filter,
    setInputFilter, btnFilter, setBtnFilter,
    setFilters, filtersOn } = useContext(AppContext);

  const columnFilterOriginal = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
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
      case 'igual a':
        return Number(e[column]) === Number(value);
      default:
        return true;
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

  function handleClick() {
    setFilters((prevState) => ({
      filtersList: [...prevState.filtersList, btnFilter],
    }));
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
      setFilters({
        filtersList: [],
      });
    } else {
      console.log(name);
      const newfiltersList = filtersOn.filtersList.filter((e) => e.column !== name);
      console.log(newfiltersList);
      setFilters({
        filtersList: newfiltersList,
      });
    }
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
          onClick={ handleFilters }
          data-testid="column-filter"
        >
          { columnFilter
            .map((item, index) => (
              <option key={ index } value={ item }>{ item }</option>
            ))}
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
        <button
          type="button"
          name="excludeAll"
          onClick={ handleExclude }
          data-testid="button-remove-filters"
        >
          Remover todas filtragens
        </button>
      </div>
      <br />
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
