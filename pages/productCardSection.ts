import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class ProductCardSection extends BasePage{
    private productCardBase?: Locator;

    constructor(page: Page) {
        super(page);
    }

    async identifyCard(title : string){
        this.productCardBase = this.page.locator(`//div[text()='${title}']/ancestor::div[@data-test='inventory-item']`);
    }

    async addToCart(){
        if(this.productCardBase === undefined){
            throw new Error('Product card base is undefined');
        } else {
            await this.productCardBase.getByText('Add to cart').click();
        }
    }

    async removeBtnVisible() : Promise<boolean> {
        if(this.productCardBase === undefined){
            throw new Error('Product card base is undefined');
        } else {
            return await this.productCardBase.getByText('Remove').isVisible();
        }
    }
}