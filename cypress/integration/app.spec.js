describe('Snapshot Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.contains('YOUR EXERCISES', { timout: 100000 });
    });
    it('should display the app', () => {
        cy.get('.App').toMatchImageSnapshot({
            threshold: 0.1,
        })
    });
    describe('Mobile', () => {
        beforeEach(() => {
            cy.viewport('iphone-6')
        });
        it('should display the app', () => {
            cy.get('.App').toMatchImageSnapshot({
                threshold: 0.1,
            })
        });
        it('should reveal the sidebar when you click on the menu button', () => {
            cy.click('.show-menu-button');
            cy.wait(1000);
            cy.get('.App').toMatchImageSnapshot({
                threshold: 0.1,
            })
        });
    })
});