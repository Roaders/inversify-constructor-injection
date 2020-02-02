import { Container } from 'inversify';
import { initialiseContainer, resolveContainer } from './container';

describe('container', () => {
    describe('initialiseContainer', () => {
        it('should return a new container', () => {
            expect(initialiseContainer()).toBeDefined();
        });

        it('should return existing container', () => {
            const existingContainer = new Container();

            expect(initialiseContainer(existingContainer)).toBe(existingContainer);
        });
    });

    describe('resolveContainer', () => {

        it('should return a new container', () => {
            expect(resolveContainer()).toBeDefined();
        });

        it('should return existing container', () => {
            const existingContainer = new Container();
            initialiseContainer(existingContainer);
            expect(resolveContainer()).toBe(existingContainer);
        });
    });
});
