import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class CartPage extends BasePage{
    readonly checkoutBtn : Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutBtn = this.page.getByTestId('checkout');
    }

    async checkoutCart(){
        await this.checkoutBtn.click();
    }

    async productInCart(title : string){
        return this.page.getByTestId('inventory-item-name').and(this.page.getByText(title)).isVisible();
    }
}