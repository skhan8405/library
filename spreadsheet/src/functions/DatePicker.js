/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: new Date()
        };
        // the variable to store component reference
        this.input = null;

        this.getInputNode = this.getInputNode.bind(this);
        this.getValue = this.getValue.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(ev) {
        this.setState({ value: ev.target.value });
    }

    // returning updated object with the date value in the required format
    getValue() {
        const updated = {};
        const date = new Date(this.state.value);
        const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "numeric",
            day: "2-digit"
        });
        const [
            { value: month },
            ,
            { value: day },
            ,
            { value: year }
        ] = dateTimeFormat.formatToParts(date);
        updated[this.props.column.key] = `${year}-${month}-${day}`;
        return updated;
    }

    // returning the component with the reference, input
    getInputNode() {
        return this.input;
    }

    render() {
        return (
            <div>
                <input
                    type="date"
                    ref={(ref) => {
                        this.input = ref;
                    }}
                    value={this.state.value}
                    onChange={this.onValueChanged}
                />
            </div>
        );
    }
}

DatePicker.propTypes = {
    column: PropTypes.string
};
