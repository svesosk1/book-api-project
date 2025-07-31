import { APIClient } from '../utils/apiClient';
import allureReporter from '@wdio/allure-reporter';
import { Book, PartialBook } from '../types/Book.interface';
import { BookFields } from '../types/Book.enum';

const client = new APIClient();
const BOOKS_ENDPOINT = '/api/v1/Books';

export class BookApiHelper {
    private static addAllureAttachments(method: string, response: any, requestBody?: any) {
        if (requestBody) {
            allureReporter.addAttachment(`${method} Request Body`, JSON.stringify(requestBody, null, 2), 'application/json');
        }
        allureReporter.addAttachment(`${method} Status Code`, response.status.toString(), 'text/plain');
        allureReporter.addAttachment(`${method} Response Body`, JSON.stringify(response.data || {}, null, 2), 'application/json');
    }

    static async getAllBooks() {
        const response = await client.get(BOOKS_ENDPOINT);
        this.addAllureAttachments('GET', response);
        return response;
    }

    static async getBookById(id: number) {
        try {
            const response = await client.get(`${BOOKS_ENDPOINT}/${id}`);
            this.addAllureAttachments('GET', response);
            return response;
        } catch (error: any) {
            this.addAllureAttachments('GET', error.response);
            return error.response;
        }
    }

    static async createBook(book: PartialBook) {
        const response = await client.post(BOOKS_ENDPOINT, book);
        this.addAllureAttachments('POST', response, book);
        return response;
    }

    static async updateBook(id: number, book: PartialBook) {
        const response = await client.put(`${BOOKS_ENDPOINT}/${id}`, book);
        this.addAllureAttachments('PUT', response, book);
        return response;
    }

    static async deleteBook(id: number) {
        const response = await client.delete(`${BOOKS_ENDPOINT}/${id}`);
        this.addAllureAttachments('DELETE', response);
        return response;
    }

    static generateTestBook(overrides: PartialBook = {}): Book {
        return {
            [BookFields.ID]: 0,
            [BookFields.TITLE]: `Test Book ${Date.now()}`,
            [BookFields.DESCRIPTION]: 'A book for testing.',
            [BookFields.PAGE_COUNT]: 123,
            [BookFields.EXCERPT]: 'Excerpt...',
            [BookFields.PUBLISH_DATE]: '2025-07-29T00:00:00Z',
            ...overrides
        };
    }
}
