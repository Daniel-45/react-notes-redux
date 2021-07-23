import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Tests in authReducer', () => {
    test('Should login', () => {
        const initialState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'ddc7e8fd--6caa54b22903',
                displayname: 'Daniel'
            }
        }

        const state = authReducer(initialState, action);
        
        expect(state).toEqual({
            uid: 'ddc7e8fd--6caa54b22903',
            name: 'Daniel'
        });
    });

    test('Should logout', () => {
        const initialState = {
            uid: 'ddc7e8fd--6caa54b22903',
            name: 'Daniel'
        };

        const action = {
            type: types.logout
        }

        const state = authReducer(initialState, action);

        expect(state).toEqual({});
    });

    test('Should not make any changes to the state', () => {
        const initialState = {
            uid: 'ddc7e8fd--6caa54b22903',
            name: 'Daniel'
        };

        const action = {
            type: 'no-exists'
        }

        const state = authReducer(initialState, action);

        expect(state).toEqual(initialState);
    });
});
