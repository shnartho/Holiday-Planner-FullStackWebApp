import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import authReducer from '../slices/auth/authSlice'
import counterReducer from '../slices/auth/counterSlice'



export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      authentication: authReducer,
      },
  })
}

export const store = makeStore()



// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//     users: usersReducer,
//   },
// })



// const combinedReducer = combineReducers({
//   counter: counterReducer,
//   users: usersReducer,
// });

// const masterReducer = (state, action) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             counter: {
//                 count: state.counter.count + action.payload.counter.count,
//             },
//             users: {
//                 users: [...action.payload.users.users, ...state.users.users]
//             }
//         }
//         return nextState;
//     } else {
//     return combinedReducer(state, action)
//   }
// }

// export const makeStore = () =>
//   configureStore({
//     reducer: masterReducer,
//   });

// export const wrapper = createWrapper(makeStore, { debug: true });