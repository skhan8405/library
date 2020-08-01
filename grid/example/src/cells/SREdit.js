import React, { useState } from "react";

const SREdit = ({ rowData }) => {
    const { sr } = rowData;

    const [srValue, setSrValue] = useState(sr);

    const updateSrValue = (e) => {
        setSrValue(e.target.value);
    };

    return (
        <div>
            <input type="text" value={srValue} onChange={updateSrValue} />
        </div>
    );
};

export default SREdit;
