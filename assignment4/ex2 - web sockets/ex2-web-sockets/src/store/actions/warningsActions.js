import * as actionTypes from "./actionTypes"
import { webSocket } from "rxjs/webSocket";

var initial = true;

const subject = webSocket({
    url: "ws://localhost:8090/warnings",
    serializer: v => v 
});

const fetchWarningsStart = () => {
    return {
        type: actionTypes.FETCH_WARNINGS_START,
    };
};

const fetchWarningsSuccess = (warnings) => {
    return {
        type: actionTypes.FETCH_WARNINGS_SUCCESS,
        payload: warnings,
    };
};

const fetchWarningsUpdate = (warning) => {
    return {
        type: actionTypes.FETCH_WARNINGS_UPDATE,
        payload: warning,
    };
};

const fetchWarningsDelete = (warning) => {
    return {
        type: actionTypes.FETCH_WARNINGS_DELETE,
        payload: warning,
    };
};

const fetchWarningsFailed = (error) => {
    return {
        type: actionTypes.FETCH_WARNINGS_FAILED,
        error: error
    }
}

export const fetchWarnings = () => {
    return (dispatch) => {
        dispatch(fetchWarningsStart)
        subject.subscribe(
            msg => {
                if (initial === true)
                {
                    initial = false;
                    dispatch(fetchWarningsSuccess(msg))
                }
                else
                {
                    if (msg.prediction === null)
                    {
                        dispatch(fetchWarningsDelete(msg));
                    }
                    else
                    {
                        dispatch(fetchWarningsUpdate(msg));
                    }
                    
                }
            },
            err => dispatch(fetchWarningsFailed(err))
        )
        subject.next("subscribe");
    };
};

export const unsubscribeWarnings = () => {
    subject.next("unsubscribe");
    initial = true;
};

export const subscribeWarnings = () => {
    subject.next("subscribe");
    initial = true;
};