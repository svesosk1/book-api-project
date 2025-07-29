
import { expect } from '@wdio/globals';
import { APIClient } from '../utils/apiClient';
import allureReporter from '@wdio/allure-reporter';

describe('Books API', () => {
  const client = new APIClient();
  const BOOKS_ENDPOINT = '/api/v1/Books';

  it('Get all books (happy path)', async () => {
    const response = await client.get(BOOKS_ENDPOINT);
    allureReporter.addAttachment('Status Code', response.status.toString(), 'text/plain');
    allureReporter.addAttachment('Response Body', JSON.stringify(response.data, null, 2), 'application/json');
    expect(response.status).toBe(404); // Intentionally fail for CI/CD test
    expect(Array.isArray(response.data)).toBe(true);
  });

  it('Get book with invalid ID (edge case)', async () => {
    let response;
    try {
      response = await client.get(`${BOOKS_ENDPOINT}/999999`);
    } catch (error: any) {
      response = error.response;
    }
    allureReporter.addAttachment('Status Code', response.status.toString(), 'text/plain');
    allureReporter.addAttachment('Response Body', JSON.stringify(response.data, null, 2), 'application/json');
    expect([400, 404]).toContain(response.status);
  });

  it('Add a new book (happy path)', async () => {
    const newBook = {
      id: 0,
      title: 'Test Book',
      description: 'A book for testing.',
      pageCount: 123,
      excerpt: 'Excerpt...',
      publishDate: '2025-07-29T00:00:00Z',
    };
    allureReporter.addAttachment('Request Body', JSON.stringify(newBook, null, 2), 'application/json');
    const response = await client.post(BOOKS_ENDPOINT, newBook);
    allureReporter.addAttachment('Status Code', response.status.toString(), 'text/plain');
    allureReporter.addAttachment('Response Body', JSON.stringify(response.data, null, 2), 'application/json');
    expect([200, 201]).toContain(response.status);
    expect(response.data.title).toBe(newBook.title);
  });

  it('Add a book with missing fields (edge case)', async () => {
    const incompleteBook = { title: 'Incomplete' };
    allureReporter.addAttachment('Request Body', JSON.stringify(incompleteBook, null, 2), 'application/json');
    const response = await client.post(BOOKS_ENDPOINT, incompleteBook);
    allureReporter.addAttachment('Status Code', response.status.toString(), 'text/plain');
    allureReporter.addAttachment('Response Body', JSON.stringify(response.data, null, 2), 'application/json');
    expect([200, 400, 422]).toContain(response.status);
  });

  it('Update a book (happy path)', async () => {
    const newBook = {
      id: 0,
      title: 'Book to Update',
      description: 'desc',
      pageCount: 1,
      excerpt: 'ex',
      publishDate: '2025-07-29T00:00:00Z',
    };
    allureReporter.addAttachment('Request Body (Add)', JSON.stringify(newBook, null, 2), 'application/json');
    const addResp = await client.post(BOOKS_ENDPOINT, newBook);
    const bookId = addResp.data.id;
    const updateData = { ...newBook, title: 'Updated Title' };
    allureReporter.addAttachment('Request Body (Update)', JSON.stringify(updateData, null, 2), 'application/json');
    const updateResp = await client.put(`${BOOKS_ENDPOINT}/${bookId}`, updateData);
    allureReporter.addAttachment('Status Code (Update)', updateResp.status.toString(), 'text/plain');
    allureReporter.addAttachment('Response Body (Update)', JSON.stringify(updateResp.data, null, 2), 'application/json');
    expect(updateResp.status).toBe(200);
    expect(updateResp.data.title).toBe('Updated Title');
  });

  it('Update non-existent book (edge case)', async () => {
    const updateData = {
      id: 999999,
      title: 'Does Not Exist',
      description: 'desc',
      pageCount: 1,
      excerpt: 'ex',
      publishDate: '2025-07-29T00:00:00Z',
    };
    allureReporter.addAttachment('Request Body', JSON.stringify(updateData, null, 2), 'application/json');
    const response = await client.put(`${BOOKS_ENDPOINT}/999999`, updateData);
    allureReporter.addAttachment('Status Code', response.status.toString(), 'text/plain');
    allureReporter.addAttachment('Response Body', JSON.stringify(response.data, null, 2), 'application/json');
    expect([200, 400, 404]).toContain(response.status);
  });

  it('Delete a book (happy path)', async () => {
    const newBook = {
      id: 0,
      title: 'Book to Delete',
      description: 'desc',
      pageCount: 1,
      excerpt: 'ex',
      publishDate: '2025-07-29T00:00:00Z',
    };
    allureReporter.addAttachment('Request Body (Add)', JSON.stringify(newBook, null, 2), 'application/json');
    const addResp = await client.post(BOOKS_ENDPOINT, newBook);
    const bookId = addResp.data.id;
    allureReporter.addAttachment('Book ID (to delete)', bookId.toString(), 'text/plain');
    const delResp = await client.delete(`${BOOKS_ENDPOINT}/${bookId}`);
    allureReporter.addAttachment('Status Code (Delete)', delResp.status.toString(), 'text/plain');
    allureReporter.addAttachment('Response Body (Delete)', JSON.stringify(delResp.data || {}, null, 2), 'application/json');
    expect([200, 204]).toContain(delResp.status);
  });

  it('Delete non-existent book (edge case)', async () => {
    const response = await client.delete(`${BOOKS_ENDPOINT}/999999`);
    allureReporter.addAttachment('Status Code', response.status.toString(), 'text/plain');
    allureReporter.addAttachment('Response Body', JSON.stringify(response.data || {}, null, 2), 'application/json');
    expect([200, 400, 404]).toContain(response.status);
  });
});
