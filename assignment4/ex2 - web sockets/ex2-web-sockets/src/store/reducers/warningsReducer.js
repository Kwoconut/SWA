import * as actionTypes from "../actions/actionTypes"

var data = {
    warnings: []
}

var data2 = {
    warnings: []
}

const initialState = {
    data: data,
    data2: data2,
    loading: false,
    error: null
}

const addWarnings = (payload) =>
{
    var newData = payload;
    var filteredWarnings = payload.warnings.filter(x => x.prediction != null);
    newData.warnings = filteredWarnings;
    return newData;
}

function updateWarning(payload, stateData)
{
    var newData = stateData;
    const index = newData.warnings.findIndex(x => x.id === payload.id);
    if (index === null || index === -1)
    {
        newData.warnings.push(payload);
    }
    else
    {
        newData.warnings[index] = payload;
    }
    return newData;
}

function deleteWarning(payload, stateData)
{
    var newData = stateData;
    const index = newData.warnings.findIndex(x => x.id === payload.id);
    if (index != null && index !== -1)
    {
        newData.warnings.splice(index, 1);
    }
    return newData;
}


const warningsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_WARNINGS_START:
            return {...state, loading: true, error: null}
        case actionTypes.FETCH_WARNINGS_SUCCESS:
            return {...state, data: addWarnings(action.payload), data2: addWarnings(action.payload), loading: false, error: null}
        case actionTypes.FETCH_WARNINGS_UPDATE:
            return {...state, data: updateWarning(action.payload, state.data), loading: false, error: null}
        case actionTypes.FETCH_WARNINGS_DELETE:
            return {...state, data: deleteWarning(action.payload, state.data), loading: false, error: null}
        case actionTypes.FETCH_WARNINGS_FAILED:
            return {...state, loading: false, error: null}
        default:
            return state
    }
}

export default warningsReducer