export type ColumnSizeObject = {
    container?: number;
    label?: number;
    wrapper?: number;
}

export type ColumnSizeValue = ColumnSizeObject | number;

export type Columns = {
    default?: ColumnSizeValue;
    sm?: ColumnSizeValue;
    md?: ColumnSizeValue;
    lg?: ColumnSizeValue;
}
