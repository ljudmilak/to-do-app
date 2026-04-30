import { Locator } from "@playwright/test";

export class ToDoFooter {
    readonly root: Locator;
    readonly allFilter: Locator;
    readonly activeFilter: Locator;
    readonly completedFilter: Locator;
    readonly clearCompletedBtn: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.allFilter = root.locator('a[href="#/"]');
        this.activeFilter = root.locator('a[href="#/active"]');
        this.completedFilter = root.locator('a[href="#/completed"]');
        this.clearCompletedBtn = root.locator('button.clear-completed');
    }

    async openActive() {
        await this.activeFilter.click();
    }

    async openAll() {
        await this.allFilter.click();
    }

    async openCompleted() {
        await this.completedFilter.click();
    }

    async clearCompleted() {
        await this.clearCompletedBtn.click();
    }
}