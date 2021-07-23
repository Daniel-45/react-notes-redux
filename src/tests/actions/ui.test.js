import {
    finishLoadingAction,
    removeErrorAction,
    setErrorAction,
    startLoadingAction,

} from "../../actions/ui";
import { types } from "../../types/types";

describe('Tests in ui-actions', () => {
    test('All actions must work correctly', () => {
        const action = setErrorAction('El e-mail es obligatorio');
        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'El e-mail es obligatorio'
        });

        const removeError = removeErrorAction();
        const startLoading = startLoadingAction();
        const finishLoading = finishLoadingAction();

        expect(removeError).toEqual({
            type: types.uiRemoveError
        });

        expect(startLoading).toEqual({
            type: types.uiStartLoading
        });
        
        expect(finishLoading).toEqual({
            type: types.uiFinishLoading
        });
    });

});
