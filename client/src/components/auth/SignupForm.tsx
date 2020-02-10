/** @jsx jsx */
import {useLocalStore, useObserver} from 'mobx-react'
import {css, jsx} from '@emotion/core'
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
    AuthFormProps
} from './AuthTypes'
import {RouteComponentProps, withRouter} from 'react-router'
import qs from 'qs'
import {getSocialData, validateEmail, validateNickname} from '../../lib/api/auth'
import apiClient from "../../lib/api/client";

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
    const cityToTowns: CityAndTowns = {
        서울시: ['강북구', '성북구'],
        강원도: ['강릉시', '원주시']
    }
    const interests: Interests = {
        어학: ['TOEIC', 'TOEIC SPEAKING'],
        취업: ['면접', '인적성']
    }

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
        onChange(e: React.ChangeEvent<HTMLInputElement>) {
            state[e.target.name] = e.target.value
        },
        onChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
            state[e.target.name] = e.target.value
        },
        onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
            state[e.target.name] = e.target.value
        },
        onChangePassword() {
            return this.password === this.password2
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

    // const onChangeInterest = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //   e.persist()
    //   if (e.target !== null) {

    //   }
    // }
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
            ) : (
                <h3>회원가입 {state.isEqualPassword}</h3>
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
                        type="email"
                        onChange={state.onChange}
                        width={60}
                    />
                    <StyledButton width={30} marginLeft={5} onClick={() => {
                        if(state.email.length===0) {
                            alert("이메일을 입력해주세요.");
                            return;
                        }
                        validateEmail(state.email)
                            .then(res => {
                              state.isCheckedEmail=true
                              state.emailState= res.data.state==='SUCCESS'?true:false
                              state.emailDupMessage=res.data.message
                            }).catch(e => {
                            alert(e);
                        })
                    }}>중복 확인</StyledButton>
                    <div hidden={!state.isCheckedEmail}>
                        <Guide color={state.emailState?"green":"red"}>{state.emailDupMessage}</Guide>
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
                <StyledButton width={30} marginLeft={5} onClick={() => {
                    if(state.nickname.length===0) {
                        alert("닉네임을 입력해주세요.");
                        return;
                    }
                    validateNickname(state.nickname)
                        .then(res => {
                          state.isCheckedNickname = true;
                          state.nicknameState = res.data.state==='SUCCESS'?true:false;
                          state.nicknameDupMessage=res.data.message;
                        }).catch(e => {
                        alert(e);
                    })
                }}>중복 확인</StyledButton>
                <div hidden={!state.isCheckedNickname}>
                    <Guide color={state.nicknameState?"green":"red"}>{state.nicknameDupMessage}</Guide>
                </div>
                <StyledLabel htmlFor="password">
                    <Guide color="red">* </Guide>비밀번호
                </StyledLabel>
                <StyledInput
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
                <div hidden={state.onChangePassword()}>asdf</div>
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
                <StyledButton marginTop={15}>가입</StyledButton>
            </form>
        </AuthFormBlock>
    ))
}

export default withRouter(SignupForm)
