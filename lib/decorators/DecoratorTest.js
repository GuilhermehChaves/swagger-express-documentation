module.exports = function DecoratorTest(target, key, descriptor) {
    if(!key){
        return class WrappedClass extends target {
            constructor(...args) {
                console.log('Contructor arguments:', args);
                super(...args);
            }
        }
    }
}
