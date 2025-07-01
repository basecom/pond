export type cssClasses = {
    [cssClass: string]: boolean;
} | null | string;

export type layoutStyles = {
    backgroundColor?: string | null;
    backgroundImage?: string | null;
    backgroundSize?: string | null;
    sizingMode?: string | null;
    marginBottom?: string | null | undefined;
    marginLeft?: string | null | undefined;
    marginRight?: string | null | undefined;
    marginTop?: string | null | undefined;
} | object;
