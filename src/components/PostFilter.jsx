import React from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import MySelect from '../components/UI/select/MySelect'

export default function PostFilter({filter, setFilter}) {
  return (
    <div>
        <MyInput
          value ={filter.query}
          placeholder="Search"
          onChange={e => setFilter({...filter, query: e.target.value})}
        />
        <MyButton>Search</MyButton>
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue='Sort by'
          options={[
            { value: 'title', name: 'Name' },
            { value: 'body', name: 'Description' },
          ]}
        />
      </div>
  )
}
