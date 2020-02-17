/**@jsx jsx */
import { useCallback } from 'react'
import { css, jsx } from '@emotion/core'
import { useObserver } from 'mobx-react'
import { Input, Modal, Button, Icon, Select } from 'antd'
import { FieldFormStoreType } from './ListTypes'
import CreateForm from './CreateForm'
import StudyStore from '../../stores/StudyStore'

const SearchForm = () => {
  const toggle = (value: string) => {
    StudyStore.filterData.searchBy = value
  }
  const handleSearch = (value: string) => {
    StudyStore.filterData.searchText = value
    StudyStore.filterStudyList()
  }
  const openModal = () => {
    StudyStore.modalVisible = true
  }
  const handleCancel = () => {
    StudyStore.modalVisible = false
  }
  const { Search } = Input
  const { Option } = Select

  const filterMap: { [key: string]: string } = {
    lcategory: '대분류',
    scategory: '소분류',
    city: '광역시/도',
    town: '시/군/구',
    isOnline: '방식',
    weekdayOrWeekend: '주중/주말'
  }
  const searchByMap = [
    { value: 'title', name: '스터디명' },
    { value: 'leader', name: '개설자명' }
  ]
  const isOnlineMap: { [key: number]: string } = { 1: '온라인', 0: '오프라인' }

  const weekdayOrWeekendMap: { [key: number]: string } = {
    1: '평일',
    2: '주말',
    3: '혼합',
    0: '추후 협의'
  }

  return useObserver(() => (
    <div
      css={css`
        margin: 0 0 5px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          margin: 40px 0;
        `}
      >
        <Select defaultValue={StudyStore.filterData.searchBy} onChange={toggle}>
          {searchByMap.map(
            (elem: { value: string; name: string }, index: number) => (
              <Option value={elem.value} key={index}>
                {elem.name}
              </Option>
            )
          )}
        </Select>
        <Search
          css={css`
            width: 200px;
          `}
          placeholder="스터디 검색"
          onSearch={handleSearch}
          enterButton
        />
        <Button
          css={css`
            margin-left: 20px;
          `}
          onClick={openModal}
        >
          <Icon css={css`color: ;primary`} type="filter" />
        </Button>
        <Modal
          title="검색 필터"
          visible={StudyStore.modalVisible}
          onCancel={handleCancel}
          footer={[<div></div>]}
        >
          <CreateForm />
        </Modal>
      </div>
      <div>
        {Object.keys(StudyStore.filterData).map(
          (filterKey: string, index: number) => {
            if (filterMap[filterKey] && StudyStore.filterData[filterKey]) {
              let value: string | number | null

              if (filterKey === 'isOnline') {
                const idx = StudyStore.filterData[filterKey] as number
                value = isOnlineMap[idx]
              } else if (filterKey === 'weekdayOrWeekend') {
                const idx = StudyStore.filterData[filterKey] as number
                value = weekdayOrWeekendMap[idx]
              } else {
                value = StudyStore.filterData[filterKey]
              }

              return (
                <Button
                  onClick={openModal}
                  key={index}
                  ghost
                  type="primary"
                  css={css`
                    margin-right: 5px;
                  `}
                >{`${filterMap[filterKey]}: ${value}`}</Button>
              )
            }
          }
        )}
      </div>
    </div>
  ))
}

export default SearchForm
