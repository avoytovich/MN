import { GET_QUESTIONS, ADD_QUESTIONS, DELETE_QUESTION } from "../../constants/actions";
import dispatchSend from '../../services/dispatchSend';
import _ from 'lodash';


const initialState = {
    questions: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_QUESTIONS: 
            return {
                ...state,
                questions: [
                    ...state.questions,
                    ..._.filter(action.data, ad => _.find(state.questions, sq => sq.id === ad.id ) === undefined)
                ]
            }
        case DELETE_QUESTION: 
            return {
                ...state,
                questions: _.filter(state.questions, sq => sq.questionId !== action.data)
            }
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.data
            }
        default:
            return state
    }
}