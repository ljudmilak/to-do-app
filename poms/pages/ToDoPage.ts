import {expect, Locator, Page} from "@playwright/test";
import {ToDoItem} from "../organisms/ToDoItem";
import {faker} from "@faker-js/faker/locale/en";
import { ToDoFooter } from "../organisms/ToDoFooter";

export class ToDoPage {
    readonly page: Page;
    private readonly url ='https://todo-app.tallinn-learning.ee/';
    readonly header: Locator;
    readonly main: Locator;
    readonly footer: ToDoFooter;
    readonly todoItemInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByTestId('header');
        this.main = page.getByTestId('main');
        this.footer = new ToDoFooter(page.getByTestId('footer'));
        this.todoItemInput = page.getByTestId('text-input');
    }

    getToDoItemByIndex(index: number): ToDoItem {
        return new ToDoItem(this.main.getByTestId('todo-item').nth(index));
    }

    getToDoItemByText(text: string): ToDoItem {
        return new ToDoItem(this.main.locator('[data-testid="todo-item"]', {hasText: text}));
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async createToDoItem(text?: string): Promise<ToDoItem> {
        await this.todoItemInput.fill(text == undefined ? faker.word.words (2) : text);
        await this.todoItemInput.press ('Enter');
        const todoItems = this.main.getByTestId('todo-item');
        const itemsCount = await todoItems.count();

        return this.getToDoItemByIndex(itemsCount - 1);
    }

    async checkToDoItemsVisible (expectedCount: number): Promise<void> {
        // const todoItems: ToDoItem[] = this.main.getByTestId('todo-item');
        const itemCount = await this.main.getByTestId('todo-item').count();
        expect(itemCount).toBe(expectedCount);
    }

}