import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import LoginForm from '../components/LoginForm.vue';
import { handleLogin } from '../server/handlers/loginHandler';

vi.mock('../server/handlers/loginHandler', () => ({
    handleLogin: vi.fn(),
}));

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush
    }),
}));

describe('LoginForm', () => {
    it('should render the form', () => {
        const cmp = mount(LoginForm);
        expect(cmp.exists()).toBe(true);

        const usernameInput = cmp.find('input#mail_or_username');
        const passwordInput = cmp.find('input#motDePasse');

        expect(usernameInput.exists()).toBe(true);
        expect(passwordInput.exists()).toBe(true);
    });
    
    it('should handle submit and redirect', async () => {
        const mockHandleLogin = vi.fn().mockResolvedValue({ status: 200 });
        handleLogin.mockImplementation(mockHandleLogin);

        const cmp = mount(LoginForm);

        const emailInput = cmp.find('input#mail_or_username');
        const passwordInput = cmp.find('input#motDePasse');

        await emailInput.setValue('test@example.com');
        await passwordInput.setValue('password123');

        await cmp.find('form').trigger('submit.prevent');

        expect(handleLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(mockPush).toHaveBeenCalledWith('/');
    });
});