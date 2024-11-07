import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class InventoryPage extends BasePage{
    readonly cartBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.cartBtn = this.page.getByTestId('shopping-cart-link');
    }

    async goToCart(){
        await this.cartBtn.click();
    }

    async shoppingCartCount(){
        let num = await this.page.getByTestId('shopping-cart-badge').textContent({timeout: 2_000});
        return num === null ? 0 : Number(num);
    }
}