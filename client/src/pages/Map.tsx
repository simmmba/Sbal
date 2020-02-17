import React, { useEffect } from 'react'
import MapView from '../components/map/MapView'
import { useHistory } from 'react-router'
import { loadToken, authCheck } from '../utils/authCheck'


const MapPage = () => {
    const history = useHistory()
    useEffect(() => {
      loadToken()
      authCheck(history)
    }, [history])
    return (
      <>
        <MapView />
      </>
    )
  }
  
  export default MapPage