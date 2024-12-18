import React from 'react';

// Creates a Context object
// a context object as the name sates is a data type of an object that can be used to store infromation that can be shared to other components within the app.
//The context object is a different approach of passing information between components and allows access by avoiding the use of prop drilling
const UserContext = React.createContext();

// The provider component allows other components to consume/use the context object and supply the necessary info needed to the context object
export const UserProvider = UserContext.Provider;


export default UserContext;