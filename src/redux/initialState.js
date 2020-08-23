import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constans';

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {}, // {'0:1', 'text'}
    stylesState: {},
    currentText: '',
    currentStyle: defaultStyles
}
const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})
export const initialState = storage('exel-state') ?
    normalize(storage('exel-state')) : defaultState
