'use strict';

require('../css/style.css');

var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');

var Page = React.createClass({

    displayName: 'app/script/app.jsx',

    mixins: [ReactFireMixin],

    getDefaultProps() {
        return {
            baseUrl: 'https://reactfire-demo.firebaseio.com/',
            strings: 'strings'
        };
    },

    getInitialState() {
        return {
            strings: []
        };
    },

    componentWillMount() {
        // oppretter en kobling til Firebase-noden «strings» på baseUrl
        var stringsRef = new Firebase(this.props.baseUrl + this.props.strings);
        this.bindAsArray(stringsRef, 'strings');
    },

    componentDidMount() {
        //setter fokus på input-feltet
        this.refs.theInput.getDOMNode().focus();
    },

    addInputString() {
        // kalles på legg til-linken
        // henter data i uinput-feltet og pusher det til Firebase
        // fjerner innholdet i feltet på success
        var input = this.refs.theInput.getDOMNode();
        var inputVal = input.value;
        if ('' !== inputVal) {
            var stringsRef = new Firebase(this.props.baseUrl + this.props.strings);
            stringsRef.push({text: inputVal}, function () {
                input.value = '';
            });
        }
    },

    resetFirebase() {
        //kalles på nullstill-linken
        //resetter databasen
        var input = {
            strings: {
                "-JiEPn2FMzEZldTFUmxp": {
                    text: "Some text in the Firebase"
                },
                "-JiGNoWeU_Jfjb1Q7hDk": {
                    text: "Some other text..."
                }
            }
        };
        var stringsRef = new Firebase(this.props.baseUrl);
        stringsRef.set(input);
    },

    render() {
        return (
            <div className="row">
                <div className="col-3 side-column"/>
                <div className="col-6">
                    <div><br/><br/><br/></div>
                    <div>
                        <p><h4>Legg til tekst i feltet nedenfor, klikk på «legg til»
                            og se at databasen blir populert umiddelbart
                            Databasen resettes daglig, men du kan bruke nullstill-linken nedenfor
                            om det står noe upassene der fra før...</h4></p>
                    </div>
                    <div>
                        <input ref="theInput" type="text"/>
                        <span>&nbsp;</span>
                        <button type="button" name="add" onClick={this.addInputString}>
                            legg til
                        </button>
                        &nbsp;
                        <button type="button" name="reset" onClick={this.resetFirebase}>
                            nullstill database
                        </button>
                    </div>
                    <div>
                        <ul>
                            {this.state.strings.map(function (string, key) {
                                return (
                                    <li key={key}>{string.text}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="col-3 side-column"/>
            </div>
        )
    }
});

React.render(<Page />, document.body);

