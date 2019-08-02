import React from 'react';
import {render} from 'react-dom';
import {Meteor} from 'meteor/meteor';
import '../meteor-extensions';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
import 'codemirror/mode/javascript/javascript';

import {App} from '../../ui/App';

Meteor.startup(() => {
    render(<App/>, document.getElementById('main'));
});
