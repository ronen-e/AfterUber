export function createStore(reducer, initial = {}) {
    const listeners = new Set();
    let state = initial;
    return {
        dispatch(change) {
            state = reducer(state, change);
            for(let listener of listeners) {
                listener(state);
            }
        },

        getState() {
            return state;
        },

        subscribe(listener) {
            listeners.add(listener);
        }
    };
}
