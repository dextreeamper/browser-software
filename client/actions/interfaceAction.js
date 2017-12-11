import { OPEN_MODAL, CLOSE_MODAL } from '../actionTypes';

/**
 * When opening a modal, we will dispatch this action. Control the
 * state for the UI.
 *
 * @returns {{OPEN_MODAL, payload: boolean}} - action creator
 */
export const openModal = () => {
    return {
        type: OPEN_MODAL,
        payload: true
    };
};

/**
 * When closing a modal, we will dispatch this action. Control the
 * state for the UI.
 *
 * @returns {{CLOSE_MODAL, payload: boolean}} - action creator
 */
export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
        payload: false
    };
};