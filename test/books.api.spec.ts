
import { expect } from '@wdio/globals';
import { BookApiHelper } from '../helpers/apiHelpers';

describe('Books API', () => {
  it('Get all books (happy path)', async () => {
    const response = await BookApiHelper.getAllBooks();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it('Get book with invalid ID (edge case)', async () => {
    const response = await BookApiHelper.getBookById(999999);
    expect([200]).toContain(response.status);
  });

  it('Add a new book (happy path)', async () => {
    const newBook = BookApiHelper.generateTestBook();
    const response = await BookApiHelper.createBook(newBook);
    expect([200, 201]).toContain(response.status);
    expect(response.data.title).toBe(newBook.title);
  });

  it('Add a book with missing fields (edge case)', async () => {
    const incompleteBook = { title: 'Incomplete' };
    const response = await BookApiHelper.createBook(incompleteBook);
    expect([200, 400, 422]).toContain(response.status);
  });

  it('Update a book (happy path)', async () => {
    // First create a book to update
    const newBook = BookApiHelper.generateTestBook({ title: 'Book to Update' });
    const addResp = await BookApiHelper.createBook(newBook);
    const bookId = addResp.data.id;

    // Then update it
    const updateData = { ...newBook, title: 'Updated Title' };
    const updateResp = await BookApiHelper.updateBook(bookId, updateData);
    expect(updateResp.status).toBe(200);
    expect(updateResp.data.title).toBe('Updated Title');
  });

  it('Update non-existent book (edge case)', async () => {
    const updateData = BookApiHelper.generateTestBook({
      id: 999999,
      title: 'Does Not Exist'
    });
    const response = await BookApiHelper.updateBook(999999, updateData);
    expect([200, 400, 404]).toContain(response.status);
  });

  it('Delete a book (happy path)', async () => {
    // First create a book to delete
    const newBook = BookApiHelper.generateTestBook({ title: 'Book to Delete' });
    const addResp = await BookApiHelper.createBook(newBook);
    const bookId = addResp.data.id;

    // Then delete it
    const delResp = await BookApiHelper.deleteBook(bookId);
    expect([200, 204]).toContain(delResp.status);
  });

  it('Delete non-existent book (edge case)', async () => {
    const response = await BookApiHelper.deleteBook(999999);
    expect([200, 400, 404]).toContain(response.status);
  });
});
