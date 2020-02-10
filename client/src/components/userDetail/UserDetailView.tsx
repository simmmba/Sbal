import {useEffect} from 'react'
import {useObserver} from 'mobx-react'
import UserStore from '../../stores/UserStore'
import React from 'react'

const UserDetail = () => {
    useEffect(() => {UserStore.mypage()}, [])
    //JSON.stringify(UserStore.data);
    return useObserver(() => (
    <div>{JSON.stringify(UserStore.data)}</div>
    //<div>{user.value}</div>
    ))
}

export default UserDetail