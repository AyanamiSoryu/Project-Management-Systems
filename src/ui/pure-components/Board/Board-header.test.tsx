import { render, screen } from '@testing-library/react';
import React from 'react';

import BoardHeader from './Board-header';

describe('BoardHeader', () => {
  it('should render the board name', () => {
    const boardName = 'Project Alpha';
    render(<BoardHeader name={boardName} />);

    expect(screen.getByText(boardName)).toBeInTheDocument();
  });

  it('should have correct styling', () => {
    render(<BoardHeader name='Test Board' />);

    const header = screen.getByText('Test Board');
    expect(header).toHaveClass('MuiTypography-h4');
    expect(header).toHaveStyle({ fontWeight: 'bold' });
  });
});
