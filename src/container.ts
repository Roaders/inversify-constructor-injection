
import { Container } from 'inversify';

let diContainer: Container | undefined;

export function initialiseContainer(container?: Container): Container {
    diContainer = container || new Container();

    return diContainer;
}

export function resolveContainer() {
    return diContainer || initialiseContainer();
}
