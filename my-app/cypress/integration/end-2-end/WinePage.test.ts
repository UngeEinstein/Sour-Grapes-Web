describe("Find wine and get more info", () => {
    it("Finds wine and gets more info", () => {
        cy.visit('localhost:3000')
        cy.contains("Château les Ormes Sorbet 2013 Médoc").click()
        cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel1a-content > .MuiAccordionDetails-root > .MuiTypography-root').should('contain', "This ripe wine shows plenty of blackberry fruits balanced well with some dry tannins. It is fresh, juicy with plenty of acidity, For a light vintage, it's perfumed, full of fresh flavors and will be ready to drink from 2017.")
    })
})

describe("Give wine review", () => {
    it("Gives correct review", () => {
        cy.visit('localhost:3000')
        cy.contains("Château les Ormes Sorbet 2013 Médoc").click()
        cy.get('[for="Château les Ormes Sorbet 2013  Médoc-5"]').click()
        cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel1a-content > .makeStyles-root-20 > :nth-child(2) > .MuiTypography-root')
        cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel1a-content > .makeStyles-root-20 > :nth-child(2) > .MuiTypography-root').should('contain', "You gave")
        
    })
})

describe("Get wine from next page", () => {
    it("Gets the first wine on the next page", () => {
        cy.visit('localhost:3000')
        cy.contains("Château les Ormes Sorbet 2013 Médoc")
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').click()
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root')
        cy.get(':nth-child(1) > #panel1a-header > .MuiAccordionSummary-content > .MuiTypography-root > b').should('contain', 'Louis Latour 2015 Les Quatre')
    })
})

describe("Goes to next page then back", () => {
    it("Gets the same page after going back and forth", () => {
        cy.visit('localhost:3000')
        cy.contains("Château les Ormes Sorbet 2013 Médoc")
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').click()
        cy.contains("Louis Latour 2015 Les Quatre")
        cy.get(':nth-child(1) > #panel1a-header > .MuiAccordionSummary-content > .MuiTypography-root > b').should('contain', '51')
        cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').click()
        cy.get(':nth-child(1) > #panel1a-header > .MuiAccordionSummary-content > .MuiTypography-root > b').should('contain', 'Château les Ormes Sorbet 2013')
    })
})

describe("Search for wine", () => {
    it("Gets first wine from correct search result", () => {
        cy.visit('localhost:3000')
        cy.get('.MuiPaper-root > .MuiInputBase-root > .MuiInputBase-input').type("kuk")
        cy.get(':nth-child(1) > #panel1a-header > .MuiAccordionSummary-content > .MuiTypography-root > b').should('contain', "kukkula 2014 Noir Syrah")
    })
})

