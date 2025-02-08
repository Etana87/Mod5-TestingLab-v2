import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup } from '#common/models';

describe('useConfirmationDialog', () => {
  it('debe inicializarse con los valores por defecto', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('onOpenDialog debe abrir el diálogo y establecer el item a eliminar', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem = { id: '1', name: 'Elemento de prueba' };

    act(() => {
      result.current.onOpenDialog(testItem);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(testItem);
  });

  it('onClose debe cerrar el diálogo', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    // Abrir el diálogo primero
    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'Elemento de prueba' });
    });
    expect(result.current.isOpen).toBe(true);

    // Luego cerrarlo
    act(() => {
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('onAccept debe resetear itemToDelete a un valor vacío', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem = { id: '1', name: 'Elemento de prueba' };

    // Abrir el diálogo con un item específico
    act(() => {
      result.current.onOpenDialog(testItem);
    });
    expect(result.current.itemToDelete).toEqual(testItem);

    // Aceptar la acción y reiniciar el item
    act(() => {
      result.current.onAccept();
    });
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});