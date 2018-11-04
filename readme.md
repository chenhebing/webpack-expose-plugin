# webpack-expose-plugin

将 webpack 打包的 modules 暴露到 window 上，供浏览器端 script 使用。

### Installation

``` bash
$ yarn add webpack-expose-plugin --dev
```

### Using

```javascript

import WebpackExposePlugin from 'webpack-expose-plugin';

export default {
    // ...
    plugins: [
        new WebpackExposePlugin({
            React: require.resolve('react'),
            ReactDOM: require.resolve('react-dom')
        }),
    ]
    // ...
};

```

### License

MIT