import React, { useState, memo } from "react";
import ClickAwayListener from "react-click-away-listener";
import RowDelete from "../Images/RowDelete.svg";
import RowEdit from "../Images/RowEdit.svg";
import RowPin from "../Images/RowPin.png";

const RowOptions = memo((props) => {
    const { row, DeletePopUpOverLay, deleteRowFromGrid } = props;

    const [isRowOptionsOpen, setRowOptionsOpen] = useState(false);
    const [isDeleteOverlayOpen, setDeleteOverlayOpen] = useState(false);

    const openRowOptionsOverlay = () => {
        setRowOptionsOpen(true);
    };

    const closeRowOptionsOverlay = () => {
        setRowOptionsOpen(false);
    };

    const openDeleteOverlay = () => {
        setRowOptionsOpen(false);
        setDeleteOverlayOpen(true);
    };

    const closeDeleteOverlay = () => {
        setDeleteOverlayOpen(false);
    };

    const deleteRow = () => {
        deleteRowFromGrid(row);
    };

    return (
        <div className="row-options-wrap">
            <span className="icon-row-options" onClick={openRowOptionsOverlay}>
                <i></i>
                <i></i>
                <i></i>
            </span>
            {isRowOptionsOpen ? (
                <ClickAwayListener onClickAway={closeRowOptionsOverlay}>
                    <div className="row-options-overlay">
                        <ul>
                            <li>
                                <span>
                                    <i>
                                        <img src={RowEdit} alt="cargo" />
                                    </i>
                                    <span>Edit</span>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <i>
                                        <img src={RowPin} alt="cargo" width="15" height="15" />
                                    </i>
                                    <span>Pin This row</span>
                                </span>
                            </li>
                            <li>
                                <span onClick={openDeleteOverlay}>
                                    <i>
                                        <img src={RowDelete} alt="cargo" />
                                    </i>
                                    <span>Delete</span>
                                </span>
                            </li>
                        </ul>
                        <span className="close" onClick={closeRowOptionsOverlay}>
                            <i className="fa fa-close"></i>
                        </span>
                    </div>
                </ClickAwayListener>
            ) : null}
            {isDeleteOverlayOpen ? <DeletePopUpOverLay closeDeleteOverlay={closeDeleteOverlay} deleteRow={deleteRow} /> : null}
        </div>
    );
});

export default RowOptions;
