import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class CheckoutStepTwoPage extends BasePage{
    readonly pageTitle : Locator;
    readonly subTotal: Locator
    readonly finishBtn: Locator

    constructor(page: Page) {
        super(page);
        this.pageTitle = this.page.getByTestId('title');
        this.subTotal = this.page.getByTestId('subtotal-label');
        this.finishBtn = this.page.getByRole('button', {name: 'finish'});
    }

    productInOverview(title : string){
        return this.page.getByTestId('inventory-item-name').and(this.page.getByText(title));
    }

    productQuantity(title : string){
        let baseItem = this.page.locator(`//div[text()='${title}']/ancestor::div[@data-test='inventory-item']`);
        return baseItem.getByTestId('item-quantity')
    }

    productPrice(title : string){
        let baseItem = this.page.locator(`//div[text()='${title}']/ancestor::div[@data-test='inventory-item']`);
        return baseItem.getByTestId('inventory-item-price');
    }

    async getSubtotal(){
        let subTotalText = await this.subTotal.textContent();
        return Number(subTotalText?.match(/\d*\.\d*/) ?? '0');
    }

    async confirmPurchase(){
        await this.finishBtn.click();
    }
}