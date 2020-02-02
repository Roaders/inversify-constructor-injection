import {
    injectConstructor,
    injectFunction,
    MapMeta,
    ParameterProvider,
} from 'constructor-injection';
import { resolveContainer } from './container';

export const resolveParameter: ParameterProvider = (passedParameter: any, reflectMetadata: any) => {
    return passedParameter != null ? passedParameter : resolveContainer().get(reflectMetadata);
};

export function injectConstructorParameters<T extends new (...args: any[]) => any>(type: T) {
    return injectConstructor(type, resolveParameter);
}

export function injectFunctionParameters<T extends (...args: any[]) => any>(
    func: T,
    paramMetadata: MapMeta<Parameters<T>>,
    ) {
    return injectFunction(func, paramMetadata, resolveParameter);
}
