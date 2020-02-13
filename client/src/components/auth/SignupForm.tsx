import React from 'react'
/** @jsx jsx */
import {useLocalStore, useObserver} from 'mobx-react'
import {css, jsx} from '@emotion/core'
import UserStore from '../../stores/UserStore'
import {
    AuthFormBlock,
    StyledInput,
    StyledLabel,
    StyledSelect,
    StyledTextarea,
    StyledButton,
    FlexBetween,
    Guide,
    PlusButton,
    DeleteButton,
    StyledRadio
} from './AuthStyled'
import {
    SignupState,
    Interests,
    CityAndTowns,
    Interest,
    AuthFormProps, UpdateData
} from './AuthTypes'
import {RouteComponentProps, withRouter} from 'react-router'
import qs from 'qs'
import {
    getSocialData,
    validateEmail,
    validateNickname,
    getMyInfoDetailsForModify
} from '../../lib/api/auth'
import {useEffect} from "react";
import { useHistory } from "react-router";

function ListItem({
                      interest,
                      onRemove
                  }: {
    interest: Interest
    onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) {
    return (
        <FlexBetween
            css={css`
        font-size: 0.85rem;
        margin: 0;
      `}
        >
            {interest.lcategory} > {interest.scategory}
            <DeleteButton
                onClick={e => {
                    onRemove(e)
                }}
            />
        </FlexBetween>
    )
}

function SignupForm({type, location}: RouteComponentProps & AuthFormProps) {
    const history = useHistory();
    const cityToTowns: CityAndTowns = UserStore.cityAndTowns
    const interests: Interests = UserStore.interests
    useEffect(
        () => {
            if (type === 'mypage/update') {
                getMyInfoDetailsForModify()
                    .then(res => {
                        const data = res.data.value;
                        state.email = data.email;
                        state.nickname = data.nickname;
                        state.phoneNumber = data.phoneNum;
                        state.city = data.city.substr(0, 2);
                        state.town = data.town;
                        state.introduction = data.introduction;;
                        state.interestList = data.interestDTOList
                    }).catch(e => {
                    alert(e);
                })
            }
        }, []
    )
    const state = useLocalStore<SignupState>(() => ({
        email: '',
        emailState: false,
        emailDupMessage: '',
        isCheckedEmail: false,
        nickname: '',
        nicknameState: false,
        nicknameDupMessage: '',
        isCheckedNickname: false,
        password: '',
        password2: '',
        phoneNumber: '',
        introduction: '',
        isEqualPassword: false,
        city: Object.keys(cityToTowns)[0],
        town: cityToTowns[Object.keys(cityToTowns)[0]][0],
        gender: 0,
        lcategory: Object.keys(interests)[0],
        scategory: interests[Object.keys(interests)[0]][0],
        interestList: [],
        equalsOfPasswords: '',
        onChange(e: React.ChangeEvent<HTMLInputElement>) {
            state[e.target.name] = e.target.value
            if (e.target.name === 'password' || e.target.name === 'password2') {
                state.isEqualPassword = this.password === this.password2
                if (this.isEqualPassword) {
                    state.equalsOfPasswords = '비밀번호가 일치합니다.'
                } else {
                    state.equalsOfPasswords = '비밀번호가 일치하지 않습니다.'
                }
            }
            if (e.target.name === 'email') {
                state.isCheckedEmail = false
            }
            if (e.target.name === 'nickname') {
                state.isCheckedNickname = false
            }
        },
        onChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
            state[e.target.name] = e.target.value
        },
        onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
            state[e.target.name] = e.target.value
        },
        async validateUserEmail() {
            if (this.email.length === 0) {
                this.isCheckedEmail = true
                this.emailState = false
                this.emailDupMessage = '이메일을 입력해주세요.'
                return
            }
            const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
            if (this.email.match(regExp) == null) {
                this.isCheckedEmail = true
                this.emailState = false
                this.emailDupMessage = `올바르지 않은 이메일 양식입니다. (abc@def.com)`
                return
            }
            try {
                const res = await validateEmail(state.email)
                this.isCheckedEmail = true
                this.emailState = res.data.state === 'SUCCESS'
                this.emailDupMessage = res.data.message
            } catch (error) {
                alert(error)
            }
        },
        async validateUserNickname() {
            if (this.nickname.length === 0) {
                this.isCheckedNickname = true
                this.nicknameState = false
                this.nicknameDupMessage = '닉네임을 입력해주세요.'
                return
            }
            try {
                const res = await validateNickname(this.nickname)
                this.isCheckedNickname = true
                this.nicknameState = res.data.state === 'SUCCESS'
                this.nicknameDupMessage = res.data.message
            } catch (error) {
                alert(error)
            }
        }
    }))

    const fetchSocialData = async () => {
        const query = qs.parse(location.search, {ignoreQueryPrefix: true})
        const kakaoAccessToken = query.code
        const res = await getSocialData(kakaoAccessToken, 'kakao')
        console.log(res)
        const {email, nickname, socialLogin} = res.data.value

        if (email) {
            // dispatch({ type: 'CREATE', field: 'email', value: email })
        }
        if (nickname) {
            // dispatch({ type: 'CREATE', field: 'nickname', value: nickname })
        }
    }
    if (type === 'signup/oauth') {
        fetchSocialData()
    }

    const appendInterest = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        if (state.lcategory && state.scategory) {
            state.interestList.push({
                lcategory: state.lcategory,
                scategory: state.scategory
            })
            state.lcategory = Object.keys(interests)[0]
            state.scategory = interests[state.lcategory][0]
        }
    }
    const deleteInterest = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) => {
        e.preventDefault()
        state.interestList = state.interestList.filter(
            (interest: Interest, index: number) => index !== id
        )
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if(type==='mypage/update') {
            const dataToSend: UpdateData = {
                email: state.email,
                nickname: state.nickname,
                city: state.city,
                town: state.town,
                phoneNum: state.phoneNumber,
                introduction: state.introduction,
                interestDTOList: state.interestList
            }
            UserStore.edit(dataToSend);
            history.push('/');
            return;
        }
        // const dataToSend = {
        //   email,
        //   nickname: username,
        //   pw: password,
        //   city,
        //   town,
        //   gender,
        //   phoneNum: phoneNumber,
        //   introduction,
        //   interestList: interestList,
        //   socialLogin
        // }
        // signup(dataToSend)
        // dispatch({ type: 'RESET' })
        e.preventDefault()
    }
    return useObserver(() => (
        <AuthFormBlock>
            {type === 'signup/oauth' ? (
                <h3>최초 로그인을 위한 추가정보 입력</h3>
            ) : type === 'mypage/update' ? (
                <h3>회원 정보 수정</h3>
            ) : (
                <h3>회원가입</h3>
            )}
            <Guide color="red">* 아래는 필수 입력사항입니다</Guide>
            <form onSubmit={handleSubmit}>
                <div>
                    <StyledLabel htmlFor="email">
                        <Guide color="red">* </Guide>이메일 아이디
                    </StyledLabel>
                    <StyledInput
                        placeholder="이메일 아이디를 입력하세요"
                        autoComplete="email"
                        name="email"
                        value={state.email}
                        onChange={state.onChange}
                        width={60}
                    />
                    <StyledButton
                        width={30}
                        marginLeft={5}
                        onClick={(e) => {
                            state.validateUserEmail()
                            e.preventDefault();
                        }}
                    >
                        중복 확인
                    </StyledButton>
                    <div hidden={!state.isCheckedEmail}>
                        <Guide color={state.emailState ? 'green' : 'red'}>
                            {state.emailDupMessage}
                        </Guide>
                    </div>
                </div>
                <StyledLabel htmlFor="nickname">
                    <Guide color="red">* </Guide>닉네임
                </StyledLabel>
                <StyledInput
                    placeholder="사용하실 닉네임을 입력하세요"
                    autoComplete="nickname"
                    name="nickname"
                    value={state.nickname}
                    type="text"
                    onChange={state.onChange}
                    width={60}
                />
                <StyledButton
                    width={30}
                    marginLeft={5}
                    onClick={(e) => {
                        state.validateUserNickname()
                        e.preventDefault();
                    }}
                >
                    중복 확인
                </StyledButton>
                <div hidden={!state.isCheckedNickname}>
                    <Guide color={state.nicknameState ? 'green' : 'red'}>
                        {state.nicknameDupMessage}
                    </Guide>
                </div>
                {type === 'mypage/update' ?
                    (<div/>) :
                    (
                        <div>
                            <StyledLabel htmlFor="password">
                                <Guide color="red">* </Guide>비밀번호
                            </StyledLabel>
                            < StyledInput
                                placeholder="비밀번호를 입력하세요"
                                autoComplete="password"
                                name="password"
                                value={state.password}
                                type="password"
                                onChange={state.onChange}
                            />
                            <StyledLabel htmlFor="password2">
                                <Guide color="red">* </Guide>비밀번호 확인
                            </StyledLabel>
                            <StyledInput
                                placeholder="비밀번호를 입력하세요"
                                autoComplete="password"
                                name="password2"
                                value={state.password2}
                                type="password"
                                onChange={state.onChange}
                            />
                            <div>
                                <Guide color={state.isEqualPassword ? 'green' : 'red'}>
                                    {state.equalsOfPasswords}
                                </Guide>
                            </div>
                        </div>
                    )
                }
                <Guide marginTop="20px">* 아래는 추가 입력사항입니다</Guide>
                <StyledLabel htmlFor="email">연락처</StyledLabel>
                <StyledInput
                    placeholder="휴대폰 번호를 입력하세요"
                    autoComplete="phoneNumber"
                    name="phoneNumber"
                    value={state.phoneNumber}
                    type="text"
                    onChange={state.onChange}
                />
                {type === 'mypage/update' ?
                    (<div/>) :
                    (
                        <div>
                            <StyledLabel htmlFor="gender">성별</StyledLabel>
                            <FlexBetween className="gender-select">
                                <StyledRadio name="gender" value="1" onChange={state.onChange}>
                                    남성
                                </StyledRadio>
                                <StyledRadio name="gender" value="2" onChange={state.onChange}>
                                    여성
                                </StyledRadio>
                                <StyledRadio name="gender" value="3" onChange={state.onChange}>
                                    기타
                                </StyledRadio>
                                <StyledRadio name="gender" value="0" onChange={state.onChange}>
                                    선택 안함
                                </StyledRadio>
                            </FlexBetween>
                        </div>
                    )
                }
                <StyledLabel htmlFor="introduction">간단한 자기소개</StyledLabel>
                <StyledTextarea
                    name="introduction"
                    id="introduction"
                    value={state.introduction}
                    cols={37}
                    rows={10}
                    onChange={state.onChangeTextarea}
                >
                    aaa
                </StyledTextarea>
                <StyledLabel htmlFor="city">지역</StyledLabel>
                <FlexBetween>
                    <div>
                        <StyledSelect
                            name="city"
                            onChange={state.onChangeSelect}
                            value={state.city}
                        >
                            {Object.keys(cityToTowns).map((city: string, index: number) => {
                                return <option key={index}>{city}</option>
                            })}
                        </StyledSelect>
                        <StyledSelect
                            name="town"
                            onChange={state.onChangeSelect}
                            value={state.town}
                        >
                            {cityToTowns[state.city].map((town: string, index: number) => {
                                return <option key={index}>{town}</option>
                            })}
                        </StyledSelect>
                    </div>
                </FlexBetween>
                <StyledLabel htmlFor="interest">관심사</StyledLabel>
                <div>
                    {state.interestList.map((interest: Interest, index: number) => (
                        <ListItem
                            interest={interest}
                            onRemove={e => {
                                deleteInterest(e, index)
                            }}
                            key={index}
                        />
                    ))}
                </div>
                <FlexBetween>
                    <div>
                        <StyledSelect
                            name="lcategory"
                            value={state.lcategory}
                            onChange={state.onChangeSelect}
                        >
                            {Object.keys(interests).map(
                                (lCategory: string, index: number) => {
                                    return <option key={index}>{lCategory}</option>
                                }
                            )}
                        </StyledSelect>
                        <StyledSelect
                            name="scategory"
                            value={state.scategory}
                            onChange={state.onChangeSelect}
                        >
                            {interests[state.lcategory].map(
                                (sCategory: string, index: number) => {
                                    return <option key={index}>{sCategory}</option>
                                }
                            )}
                        </StyledSelect>
                    </div>
                    <PlusButton onClick={appendInterest}/>
                </FlexBetween>
                <StyledButton marginTop={15}>{type === "mypage/update" ? ("수정") : ("가입")}</StyledButton>
            </form>
        </AuthFormBlock>
    ))
}

export default withRouter(SignupForm)
