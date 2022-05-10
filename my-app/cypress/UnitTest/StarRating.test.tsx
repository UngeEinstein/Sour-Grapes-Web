import React from 'react'
import { mount } from 'cypress-react-unit-test'
import StarRating from '../../src/Components/StarRating';

describe('StarRating unit test', () => {
  it('Mounting StarRating works', () => {
    mount(<StarRating title="Nicosia"/>)
    cy.get('.MuiRating-root')
  })
})