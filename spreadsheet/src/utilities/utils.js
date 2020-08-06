export const applyFormula = (obj, columnName) => {
    const val = obj;
    const item = val[columnName].toString();
    if (item && item.charAt(0) === "=") {
        const operation = item.split("(");
        const value = operation[1]
            .substring(0, operation[1].length - 1)
            .split(/[,:]/);
        switch (operation[0]) {
            case "=SUM":
            case "=ADD":
            case "=sum":
            case "=add":
                val[columnName] = value.reduce(function (a, b) {
                    return Number(a) + Number(b);
                });
                break;
            case "=MUL":
            case "=mul":
                val[columnName] = value.reduce(function (a, b) {
                    return Number(a) * Number(b);
                });
                break;
            case "=SUB":
            case "=sub":
            case "=DIFF":
            case "=diff":
                val[columnName] = value.reduce(function (a, b) {
                    return Number(a) - Number(b);
                });
                break;
            case "=min":
            case "=MIN":
                // eslint-disable-next-line prefer-spread
                val[columnName] = Math.min.apply(Math, value);
                break;
            case "=max":
            case "=MAX":
                // eslint-disable-next-line prefer-spread
                val[columnName] = Math.max.apply(Math, value);
                break;
            default:
                console.log("No Calculation");
        }
    }
    return val;
};
