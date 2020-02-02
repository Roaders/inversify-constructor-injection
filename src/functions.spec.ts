import { injectConstructor, injectFunction, ParameterProvider } from 'constructor-injection';

// Decorator just to ensure that we get metadata for classes
function saveMetaData() {
    // tslint:disable-next-line: no-empty
    return (...args: any[]) => { };
}

const provideParameter: ParameterProvider = (_passed: any, reflect: any, index: number) => {

    switch (reflect.name) {
        case 'String':
            return `string_${index}`;
        case 'Number':
            return index;
        case 'Boolean':
            return true;
    }
};

describe('injectConstructor', () => {

    it('should return wrapped constructor with optional parameters', () => {
        @saveMetaData()
        class ClassWithParameters {
            constructor(
                public readonly one: string,
                public readonly two: number,
                public readonly three: boolean,
                ) {}
        }

        const optionalParamsConstructor = injectConstructor(ClassWithParameters, provideParameter);

        const instance = new optionalParamsConstructor();

        expect(instance.one).toEqual('string_0');
        expect(instance.two).toEqual(1);
        expect(instance.three).toEqual(true);
    });
});

describe('injectFunction', () => {

    it('should return wrapped function with optional parameters', () => {
        function functionWithParameters(
            one: string,
            two: number,
            three: boolean,
            ) {
                return `${one}_${two}_${three}`;
            }

        const optionalParamsFunction = injectFunction(
            functionWithParameters,
            [String, Number, Boolean],
            provideParameter);

        const result = optionalParamsFunction();

        expect(result).toEqual('string_0_1_true');
    });
});
