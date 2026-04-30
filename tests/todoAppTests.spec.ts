import { test } from '@playwright/test';
import {ToDoPage} from "../poms/pages/ToDoPage";

test('Create to-do item', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemsVisible(0);
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);
});

test('Create 2 to-do items', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2);
});

test('Activate card test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);

  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test('Activate card test - search by text', async ({ page }) => {
  const cardText = 'test text';
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem(cardText);
  await toDoPage.checkToDoItemsVisible(1);
  const createdToDo =  toDoPage.getToDoItemByText(cardText);

  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test('Delete card test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);

  await createdToDo.deleteItem();
  await toDoPage.checkToDoItemsVisible(0);
});

test('Clear completed item test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const firstToDoItem = await toDoPage.createToDoItem('first item');
  await toDoPage.createToDoItem('second item');
  await toDoPage.checkToDoItemsVisible(2);

  await firstToDoItem.activate();
  await firstToDoItem.checkIsActivated();

  await toDoPage.footer.clearCompleted();
  await toDoPage.checkToDoItemsVisible(1);
});

test('Check completed item test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const firstToDoItem = await toDoPage.createToDoItem('first item');
  await toDoPage.createToDoItem('second item');
  await toDoPage.checkToDoItemsVisible(2);

  await firstToDoItem.activate();
  await firstToDoItem.checkIsActivated();

  await toDoPage.footer.openCompleted();
  toDoPage.getToDoItemByText('first item');
});

test('Active items filter test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const firstToDoItem = await toDoPage.createToDoItem('first item');
  await toDoPage.createToDoItem('second item');
  await toDoPage.checkToDoItemsVisible(2);

  await firstToDoItem.activate();
  await firstToDoItem.checkIsActivated();

  await toDoPage.footer.openActive();
  toDoPage.getToDoItemByText('second item');
});

test('All items filter test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const firstToDoItem = await toDoPage.createToDoItem('first item');
  await toDoPage.createToDoItem('second item');
  await toDoPage.checkToDoItemsVisible(2);

  await firstToDoItem.activate();
  await firstToDoItem.checkIsActivated();

  await toDoPage.footer.openActive();
  await toDoPage.footer.openAll();
  await toDoPage.checkToDoItemsVisible(2);
});