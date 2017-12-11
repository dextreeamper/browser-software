/**
 * Created by leetdigitalmac01 on 24/06/2017.
 */
import { OPEN_MODAL, CLOSE_MODAL } from '../actionTypes';

// it will return a state for modal
const processingModal = (state={
    isModalOpen: false,
}, action) => {
    switch(action.type){
    case OPEN_MODAL: {
        return {
            ...state,
            isModalOpen: action.payload
        };
    }
    case CLOSE_MODAL: {
        return {
            ...state,
            isModalOpen: action.payload
        };
    }
    default: {
        return state;
    }

    }
};

const reducer = (state={}, action) => {
    return {
        processingModal: processingModal(
            state.processingModal,
            action
        )
    };
};

export default reducer;