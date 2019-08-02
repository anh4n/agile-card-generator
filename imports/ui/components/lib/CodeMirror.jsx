import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Controlled} from 'react-codemirror2'

export class CodeMirror extends Component {
    render () {
        const {onChange, ...restProps} = this.props;

        return (
            <Controlled
                onBeforeChange={(editor, data, value) => {
                    onChange(value)
                }}
                options={{
                    mode: 'javascript',
                    theme: 'idea',
                    lineNumbers: true
                }}
                className={'codemirror-form'}
                {...restProps}
            />
        );
    }
}

CodeMirror.defaultProps = {
    onChange: () => {}
};

CodeMirror.propTypes = {
    onChange: PropTypes.func
};
