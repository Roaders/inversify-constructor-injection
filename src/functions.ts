import {
    injectConstructor as baseInjectConstructor,
    injectFunction as baseInjectFunction,
    MapMeta,
    ParameterProvider,
} from 'constructor-injection';
import { resolveContainer } from './container';

export const resolveParameter: ParameterProvider = (passedParameter: any, reflectMetadata: any) => {
    return passedParameter != null ? passedParameter : resolveContainer().get(reflectMetadata);
};

export function injectConstructor<T extends new (...args: any[]) => any>(type: T) {
    return baseInjectConstructor(type, resolveParameter);
}

export function injectFunction<T extends (...args: any[]) => any>(
    func: T,
    paramMetadata: MapMeta<Parameters<T>>,
    ) {
    return baseInjectFunction(func, paramMetadata, resolveParameter);
}
