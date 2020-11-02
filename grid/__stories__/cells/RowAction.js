import React from "react";
import EditIcon from "../images/EditIcon.png";
import DeleteIcon from "../images/DeleteIcon.png";

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
                    <i>
                        <img src={EditIcon} alt="edit-row" />
                    </i>
                    <span>Edit</span>
                </span>
            </li>
            <li role="presentation" onClick={openDeleteOverlay}>
                <span>
                    <i>
                        <img src={DeleteIcon} alt="delete-row" />
                    </i>
                    <span>Delete</span>
                </span>
            </li>
        </ul>
    );
};

export default RowAction;
