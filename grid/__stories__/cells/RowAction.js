import React from "react";

const RowAction = ({ rowData, closeOverlay, bindRowEditOverlay }) => {
    const openEditOverlay = () => {
        bindRowEditOverlay(rowData);
        closeOverlay();
    };
    return (
        <ul>
            <li role="presentation" onClick={openEditOverlay}>
                <span>
                    <span>Edit</span>
                </span>
            </li>
            <li role="presentation" onClick={closeOverlay}>
                <span>
                    <span>Delete</span>
                </span>
            </li>
        </ul>
    );
};

export default RowAction;
