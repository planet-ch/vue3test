import cloneDeep from 'lodash/cloneDeep';
export const updateTableData = (source, tableData, tableDataIndex) => {
    const newSource = cloneDeep(source)
    const newTableData = tableData.list[0]
    const sliceIndex = newSource.list.findIndex(table => tableDataIndex === table.index)
    newSource.list.splice(sliceIndex, 1, newTableData)
    console.log(source, tableData, tableDataIndex, '需要找到指定table更新数据', newSource);
    return cloneDeep(newSource)
}