import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class CheckoutCompletePage extends BasePage{
    readonly completeHeader : Locator;
    readonly backHomeBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.completeHeader = this.page.getByTestId('complete-header');
        this.backHomeBtn = this.page.getByRole('button', { name: 'back-to-products'});
    }
}