import path from 'path';
import NormalModule from 'webpack/lib/NormalModule';
import DelegatedModule from 'webpack/lib/DelegatedModule';

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
                                if (module instanceof NormalModule) {
                                    exposeStack.push(`window.${key} = __webpack_require__('${module.id}');`);
                                    return true;
                                }
                                if (module instanceof DelegatedModule) {
                                    exposeStack.push(`window.${key} = __webpack_require__('${module.id}')('${module.delegateData.id}');`);
                                    return true;
                                }
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
