import React from "react";

const { Provider, Consumer } = React.createContext({
   clickMapObj: false,
   changeClickMapObj: () => { }
});

const withContext = Component => props => {
   return (
      <Consumer>
         {({ changeClickMapObj }) => <Component {...props} changeClickMapObj={changeClickMapObj} />}
      </Consumer>
   );
};

export { Provider, withContext };