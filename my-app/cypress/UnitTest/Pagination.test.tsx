import React from 'react'
import { mount } from 'cypress-react-unit-test'
import Pagination from '../../src/Components/Pagination';
import Store from '../../src/Store';
import { Provider } from 'react-redux';

describe('Pagination unit test', () => {
  it('Mounting Pagination works', () => {
    mount(<Provider store={Store}><Pagination /></Provider>)
  })
})