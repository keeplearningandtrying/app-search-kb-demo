/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 describe('Contact form', () => {

  describe('Homepage', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    describe('Open modal', () => {
      it ('should be present in the header', () => {
        cy.get('.layout__header__actions .contact__link').contains('Contact Support').click()
        cy.get('.contact__modal__container').should('be.visible')
      })
  
      it ('should be present before footer', () => {
        cy.get('.contact__callout').within(() => {
          cy.get('.contact__callout__title').contains('Can’t find what you’re looking for?')
          cy.get('.contact__callout__content').contains('We’re here to help. Get in touch and we’ll get back to you as soon as possible.').within(() => {
            cy.get('.contact__link')
          })
        })
  
        cy.get('.contact__callout .contact__link').contains('Contact Support').click()
        cy.get('.contact__modal__container').should('be.visible')
      })
    })

    describe('Close modal', () => {
      const selectors = ['.button__primary', '.button__secondary', '.contact__modal__title__close']

      beforeEach(() => {
        cy.get('.layout__header__actions .contact__link').click()
      })
      
      selectors.forEach((selector) => {
        it('should be closed when clicking', () => {
          cy.get('.contact__modal__container').within(() => {
            cy.get(selector).click()
            cy.get('.contact__modal__container').should('not.be.visible')
          })
        })
      })
    })

    describe('Autocomplete', () => {

      const query = 'elasticsea';

      beforeEach(() => {
        cy.get('.layout__header__actions .contact__link').click()
      })

      it('should display suggestions', () => {
        cy.get('.contact__modal__content .form-row').first().within(() => {
          cy.get('input').type(query)
          cy.get('dl.suggestions dt').contains('Recommended for you')
          cy.get('dl.suggestions dd').should('has.length', 6)
          cy.get('dl.suggestions dd').first().contains('elasticsearch').click()
        })
      })

      it('suggestions should be clickable', () => {
        cy.get('.contact__modal__content .form-row').first().within(() => {
          cy.get('input').type(query)
          cy.get('dl.suggestions dd').first().contains('elasticsearch').click()
          cy.get('input').should('have.value', 'elasticsearch')
          cy.get('dl.suggestions').should('not.be.visible')
        })
      })
    })
  })
})
