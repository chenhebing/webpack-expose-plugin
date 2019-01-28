import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Home extends PureComponent {
    render () {
        return (
            <div>webpack-expose-plugin test</div>
        );
    }
}

ReactDOM.render(<Home />, document.querySelector('#app'));
