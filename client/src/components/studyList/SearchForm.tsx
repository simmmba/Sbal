/**@jsx jsx */
import { useCallback } from 'react'
import { css, jsx } from '@emotion/core'
import { useLocalStore } from 'mobx-react'
import { Input, Modal, Button, Icon, Select } from 'antd'
import { FieldFormStoreType } from './ListTypes'

const SearchForm = () => {
  const state = useLocalStore<FieldFormStoreType>(() => ({
    visible: false,
    lcategory: null,
    scategory: null,
    city: null,
    town: null,
    isOnline: null,
    weekdayOrWeekend: null,
    searchBy: 'title',
    searchText: null,

    toggle(value) {
      this.searchBy = value
    }
  }))
  const { Search } = Input
  const { Option } = Select

  const filterMap = {
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

  return (
    <div>
      <Button>
        <Icon type="filter" />
      </Button>
      <Select defaultValue={state.searchBy} onChange={state.toggle}>
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
        onSearch={value => console.log(value)}
        enterButton
      />
    </div>
  )
}

export default SearchForm
