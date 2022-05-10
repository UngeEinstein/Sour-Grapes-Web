import React from 'react'
import { mount } from 'cypress-react-unit-test'
import WineAccordion from '../../src/Components/WineAccordion'
import { Provider } from 'react-redux'
import Store from '../../src/Store'

describe('WineAccordion unit test', () => {
  it('Mounting WineAccordion works', () => {
    mount(<Provider store={Store}><WineAccordion /></Provider>)
  })
})