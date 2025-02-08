import { describe, it, expect } from 'vitest';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('mapProjectFromApiToVm', () => {
  it('Debería devolver undefined o null', () => {
    // Arrange
    const nullProject = null;
    const undefinedProject = undefined;

    // Act
    const resultNull = mapProjectFromApiToVm(nullProject as any);
    const resultUndefined = mapProjectFromApiToVm(undefinedProject as any);

    // Assert
    expect(resultNull).toEqual(viewModel.createEmptyProject());
    expect(resultUndefined).toEqual(viewModel.createEmptyProject());
  });

  it('Debería mappear correctamente', () => {
    // Arrange
    const apiProject: apiModel.Project = {
      id: '1',
      name: 'Proyecto A',
      employees: [
        { id: '101', employeeName: 'Alejandra' },
        { id: '102', employeeName: 'Ares' }
      ]
    };

    const expectedVmProject: viewModel.Project = {
      id: '1',
      name: 'Proyecto A',
      employees: [
        { id: '101', employeeName: 'Alejandra' },
        { id: '102', employeeName: 'Ares' }
      ]
    };

    // Act
    const result = mapProjectFromApiToVm(apiProject);

    // Assert
    expect(result).toEqual(expectedVmProject);
  });

  it('Debería devolver undefined o vacío', () => {
    // Arrange
    const apiProject: apiModel.Project = {
      id: '2',
      name: 'Proyecto B',
      employees: []
    };

    const expectedVmProject: viewModel.Project = {
      id: '2',
      name: 'Proyecto B',
      employees: []
    };

    // Act
    const result = mapProjectFromApiToVm(apiProject);

    // Assert
    expect(result).toEqual(expectedVmProject);
  });
});
