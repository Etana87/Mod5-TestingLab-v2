import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  const defaultProps = {
    isOpen: true,
    onAccept: vi.fn(),
    onClose: vi.fn(),
    title: 'Confirm Action',
    labels: {
      closeButton: 'Cancel',
      acceptButton: 'Confirm'
    },
    children: <div>Are you sure you want to delete?</div>
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('debe renderizar el diálogo con el título, contenido y botones', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);
    
    // Se verifica que el título y el contenido estén en el documento
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();

    // Se verifica que los botones aparezcan con los labels correctos
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('no debe renderizar el diálogo cuando isOpen es false', () => {
    render(<ConfirmationDialogComponent {...defaultProps} isOpen={false} />);
    
    // Al no estar abierto, el contenido no debería estar en el documento
    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
  });

  it('debe llamar onClose cuando se hace click en el botón de cancelar', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);
    
    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('debe llamar onAccept y onClose cuando se hace click en el botón de confirmar', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);
    
    const acceptButton = screen.getByText('Confirm');
    fireEvent.click(acceptButton);

    // Al hacer click en "Confirm", se debe llamar a onAccept y luego a onClose (según handleAccept)
    expect(defaultProps.onAccept).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
