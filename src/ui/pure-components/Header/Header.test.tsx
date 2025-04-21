import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useLocation: () => ({ pathname: '/' })
}));

describe('Header', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it('should render navigation tabs', () => {
    renderHeader();
    expect(screen.getByText('Все задачи')).toBeInTheDocument();
    expect(screen.getByText('Проекты')).toBeInTheDocument();
  });

  it('should navigate when tab is clicked', () => {
    renderHeader();
    fireEvent.click(screen.getByText('Проекты'));
    expect(mockedNavigate).toHaveBeenCalledWith('/boards');
  });

  it('should open modal when create button is clicked', () => {
    renderHeader();
    fireEvent.click(screen.getByText('Создать задачу'));
    // TaskModal should be visible
  });
});
