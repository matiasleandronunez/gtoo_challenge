import { type Page, type Locator } from '@playwright/test';
import { CONFIG} from "../variables.config";

export class BasePage{
    readonly page: Page;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.getByTestId('title');
    }

    async goto(url=CONFIG.baseHost) {
        if(url===undefined){
            throw new Error('URL is not defined');
        }
        await this.page.goto(url);
    }
}