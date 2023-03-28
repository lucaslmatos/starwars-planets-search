import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { result, fetchData, filter, setInputFilter } = useContext(AppContext);

  const titles = ['Name', 'Rotation Period',
    'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'Url'];

  const nameFiltered = result.filter((planet) => planet.name
    .includes(filter.name));

  useEffect(() => {
    async function getList() {
      const list = await fetchData();
      return list;
    }
    getList();
  }, [fetchData]);

  function handleChange({ target: { name, value } }) {
    setInputFilter({
      ...filter,
      [name]: value,
    });
  }

  return (
    <div>
      <br />
      <section>
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
      </section>
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
