describe('Test components imports', () => {
    it('Should import header', async () => {
        const name = 'Header';
        const cmp = await import(`components/${name}.vue`);
        expect(cmp).toBeDefined();
    });

    it('Should import footer', async () => {
        const name = 'Footer';
        const cmp = await import(`components/${name}.vue`);
        expect(cmp).toBeDefined();
    });

    it('Should import inventory', async () => {
        const name = 'Inventory';
        const cmp = await import(`components/${name}.vue`);
        expect(cmp).toBeDefined();
    });
});

describe('Test icon imports', () => {
    it('Should import Logo', async () => {
        const name = 'Logo';
        const cmp = await import(`components/icon/${name}.vue`);
        expect(cmp).toBeDefined();
    });

    it('Should import github logo', async () => {
        const name = 'Github';
        const cmp = await import(`components/icon/${name}.vue`);
        expect(cmp).toBeDefined();
    });

    it('Should import google logo', async () => {
        const name = 'Google';
        const cmp = await import(`components/icon/${name}.vue`);
        expect(cmp).toBeDefined();
    });

    it('Should import mail icon', async () => {
        const name = 'Mail';
        const cmp = await import(`components/icon/${name}.vue`);
        expect(cmp).toBeDefined();
    });

    it('Should import ChevronDown', async () => {
        const name = 'ChevronDown';
        const cmp = await import(`components/icon/${name}.vue`);
        expect(cmp).toBeDefined();
    });
});