import { types } from '../../types/types';

describe('Tests in file types', () => {
    test('Should have these types', () => {
        const objectTypes = {
            login: '[auth] Login',
            logout: '[auth] Logout',
            uiSetError: '[UI] Set error',
            uiRemoveError: '[UI] Remove error',
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Update note saved',
            notesFileUrl: '[Notes] Update image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout cleaning'
        }

        expect(types).toEqual(objectTypes);
    });

});
