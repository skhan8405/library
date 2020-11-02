import React from "react";

const RowAction = ({
    rowData,
    closeOverlay,
    bindRowEditOverlay,
    bindRowDeleteOverlay
}) => {
    const openEditOverlay = () => {
        bindRowEditOverlay(rowData);
        closeOverlay();
    };
    const openDeleteOverlay = () => {
        bindRowDeleteOverlay(rowData);
        closeOverlay();
    };
    return (
        <ul>
            <li role="presentation" onClick={openEditOverlay}>
                <span>
                    <span>Edit</span>
                </span>
            </li>
            <li role="presentation" onClick={openDeleteOverlay}>
                <span>
                    <span>Delete</span>
                </span>
            </li>
        </ul>
    );
};

export default RowAction;
