import React, { useEffect } from 'react'
import MapView from '../components/map/MapView'
import { useHistory ,useParams} from 'react-router'
import { loadToken, authCheck } from '../utils/authCheck'
import UserDetailStore from '../stores/UserDetailStore'
import StudyDetailStore from '../stores/StudyDetailStore'



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