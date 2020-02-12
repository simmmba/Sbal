import {observable} from 'mobx'
import * as studyApi from '../lib/api/study'
// import {Study} from '../components/studyList/StudyTypes'
const StudyStore = observable({
    studyList: [],
    async getStudyList() {
        await studyApi.getStudyList().then(res => {
            this.studyList = res.data.value;
            // console.log(this.studyList);
        }).catch(e => {
            alert(e);
        })
    }
})

export default StudyStore
