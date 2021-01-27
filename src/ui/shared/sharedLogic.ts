import * as React from 'react'
import storesContext from '../../stores/sharedStore'

export const useStores = () => React.useContext(storesContext)