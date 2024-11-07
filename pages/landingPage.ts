import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class LandingPage extends BasePage{
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameInput = this.page.getByTestId('username');
        this.passwordInput = this.page.getByTestId('password');
        this.loginButton = this.page.getByRole('button', {name: 'login'});
        this.loginContainer = this.page.getByTestId('login-container');
    }

    async loginAs(user? : string, pass? : string){
        await this.userNameInput.fill(user ?? '');
        await this.passwordInput.fill(pass ?? '');
        await this.loginButton.click();
    }
}