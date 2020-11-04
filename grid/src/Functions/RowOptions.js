import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import PropTypes from "prop-types";
import { IconCancel } from "../Utilities/SvgUtilities";

const RowOptions = ({ row, rowActions }) => {
    const { original } = row;

    const [isRowOptionsOpen, setRowOptionsOpen] = useState(false);

    const openRowOptionsOverlay = () => {
        setRowOptionsOpen(true);
    };

    const closeRowOptionsOverlay = () => {
        setRowOptionsOpen(false);
    };

    const rowActionsOverlayContent = rowActions(
        original,
        closeRowOptionsOverlay
    );

    return (
        <div className="row-options-wrap">
            <span
                className="icon-row-options"
                data-testid="rowActions-open-link"
                role="presentation"
                onClick={openRowOptionsOverlay}
            >
                <i />
                <i />
                <i />
            </span>
            {isRowOptionsOpen ? (
                <ClickAwayListener
                    onClickAway={closeRowOptionsOverlay}
                    className="row-options-overlay"
                    data-testid="rowActions-kebab-overlay"
                >
                    {rowActionsOverlayContent}
                    <span
                        role="presentation"
                        className="close"
                        data-testid="close-rowActions-kebab-overlay"
                        onClick={closeRowOptionsOverlay}
                    >
                        <i>
                            <IconCancel />
                        </i>
                    </span>
                </ClickAwayListener>
            ) : null}
        </div>
    );
};
RowOptions.propTypes = {
    row: PropTypes.object,
    rowActions: PropTypes.any
};

export default RowOptions;
