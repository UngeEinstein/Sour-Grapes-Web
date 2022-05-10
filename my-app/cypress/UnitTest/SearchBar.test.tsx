import React from 'react'
import { mount } from 'cypress-react-unit-test'
import SearchBar from '../../src/Components/SearchBar';
import { Provider } from 'react-redux';
import Store from '../../src/Store';

describe('Search bar unit test', () => {
  it('Mounting search bar works', () => {
    mount(<Provider store={Store}><SearchBar /></Provider>)
  })
})