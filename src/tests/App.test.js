import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testes: Tabela.', () => {
  test('Ao entrar na página, os filtros devem aparecer e deve ser feito uma requisição a API e mostrar os dados em forma de tabela', async () => {
    render(<App />);
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filtrar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Remover todas filtragens/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ordenar/i })).toBeInTheDocument();
    expect( await screen.findByText('Tatooine')).toBeInTheDocument();
  });
  test('Teste dos filtros', async () => {
    render(<App />);
    userEvent.type(screen.getByTestId('name-filter'), 'Tatoo');
    expect( await screen.findAllByText('arid')).toHaveLength(1);
    userEvent.clear(screen.getByTestId('name-filter'));
    expect( await screen.findAllByText('temperate')).toHaveLength(6);
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    userEvent.type(screen.getByTestId('value-filter'), '350');
    userEvent.click(screen.getByRole('button', { name: /Filtrar/i }));
    expect(screen.getByText('orbital_period menor que 0350')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Excluir/i })).toBeInTheDocument();
    expect(screen.getAllByTestId('planet-name')).toHaveLength(3);
    userEvent.click(screen.getByRole('button', { name: /Excluir/i }));
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '350');
    userEvent.click(screen.getByRole('button', { name: /Filtrar/i }));
    expect(screen.getByText('orbital_period maior que 350')).toBeInTheDocument();
    expect(screen.getAllByTestId('planet-name')).toHaveLength(7);
    userEvent.click(screen.getByRole('button', { name: /Remover todas filtragens/i }));
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '350');
    userEvent.click(screen.getByRole('button', { name: /Filtrar/i }));
    expect(screen.getByText('orbital_period igual a 350')).toBeInTheDocument();
    expect(screen.queryAllByTestId('planet-name')).toHaveLength(0);
    userEvent.click(screen.getByRole('button', { name: /Remover todas filtragens/i }));
  });
  test('Teste da ordenação da tabela', async () => {
    render(<App />);
    userEvent.selectOptions(screen.getByTestId('column-sort'), 'orbital_period');
    userEvent.click(screen.getByTestId('column-sort-input-asc'));
    userEvent.click(screen.getByRole('button', { name: /Ordenar/i }));
    userEvent.click(screen.getByTestId('column-sort-input-desc'));
    userEvent.click(screen.getByRole('button', { name: /Ordenar/i }));
  });
});
