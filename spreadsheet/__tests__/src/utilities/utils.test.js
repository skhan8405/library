import { applyFormula } from "../../../src/utilities/utils";

test('Utils - applyFormula - addition test', () => {

    var obj = {};
    var columnName = 'total';
    obj[columnName] = "=add(10:20)";

    var result = applyFormula(obj, columnName);
    expect(result).toEqual({"total": 30});
});
