import React from 'react'

export const QwebContext = React.createContext({})

const QwebProvider = ({ qwebApi, children }) => {
  return <QwebContext.Provider value={qwebApi}>{children}</QwebContext.Provider>
}

export default QwebProvider
