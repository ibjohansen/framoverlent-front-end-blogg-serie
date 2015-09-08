'use strict';

require('../css/style.css');

var React = require('react');

var Page = React.createClass({
    displayName: 'app/script/page.jsx',

    render: function () {
        return (
            <div className="row">
                <div className="col-3 side-column"/>
                <div className="col-6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam animi, cum doloribus eveniet ex
                    expedita fuga, harum illo mollitia nam quam quibusdam repellat similique sit sunt tempore voluptas
                    voluptatum.
                </div>
                <div className="col-3 side-column"/>
            </div>
        )
    }
});

React.render(
    <Page />,
    document.body
);

