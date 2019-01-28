import path from 'path';

export default class WebpackExposePlugin {
    constructor (options) {
        this.options = options;
    }

    apply (compiler) {
        compiler.hooks.compilation.tap('expose-require-plugin-compiler', (compilation) => {
            compilation.mainTemplate.hooks.beforeStartup.tap('expose-require-plugin-maintemplate', (source) => {
                const exposeStack = [];
                compilation.modules.forEach(module => {
                    if (module.userRequest) {
                        Object.keys(this.options).some(key => {
                            if (this.options[key] === path.resolve(module.userRequest)) {
                                exposeStack.push(`window.${key} = __webpack_require__('${module.id}');`);
                            }
                            return false;
                        });
                    }
                });
                const exposeStr = exposeStack.join('\n');
                return source + exposeStr;
            });
        });
    };
}
