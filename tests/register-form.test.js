import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import RegisterForm from '../components/RegisterForm.vue';
import { handleSubmit } from '../server/handlers/registerHandler';

vi.mock('../server/handlers/loginHandler', () => ({
    handleSubmit: vi.fn(),
}));

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush
    }),
}));

describe('RegisterForm', () => {    
    it('should render the form', () => {
        const cmp = mount(RegisterForm);
        expect(cmp.exists()).toBe(true);

        const usernameInput = cmp.find('input#username');
        const emailInput = cmp.find('input#email');
        const passwordInput = cmp.find('input#motDePasse');

        expect(usernameInput.exists()).toBe(true);
        expect(emailInput.exists()).toBe(true);
        expect(passwordInput.exists()).toBe(true);
    });

    it('should handles submit and redirect', async () => {
        const mockHandleLogin = vi.fn().mockResolvedValue({ status: 200 });
        handleLogin.mockImplementation(mockHandleLogin);

        const cmp = mount(RegisterForm);

        const usernameInput = cmp.find('input#username');
        const emailInput = cmp.find('input#email');
        const passwordInput = cmp.find('input#motDePasse');
        
        await usernameInput.setValue('JaneDoe');
        await emailInput.setValue('jane.doe@example.com');
        await passwordInput.setValue('password123');
    
        await cmp.find('form').trigger('submit');
    
        expect(handleSubmit).toHaveBeenCalledWith('JaneDoe', 'jane.doe@example.com', 'password123');
        expect(mockPush).toHaveBeenCalledWith('/');
    });
});