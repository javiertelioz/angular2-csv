import { OnInit } from '@angular/core';
export declare class Angular2CsvComponent implements OnInit {
    data: any[];
    filename: string;
    options: Options;
    label_btn: string;
    csv: string;
    constructor();
    /**
     * Event Download
     */
    onDownload(): void;
    /**
     * ngOnInit
     */
    ngOnInit(): void;
    /**
     * [generateCsv description]
     */
    generateCsv(): void;
    /**
     * Create Headers for Csv File
     */
    getHeaders(): void;
    /**
     * Create Headers
     */
    getBody(): void;
    /**
     * Format Data
     */
    formartData(data: any): any;
    /**
     * Validate if object is not empty
     */
    isEmptyObject(obj: any): boolean;
    /**
     * Get Input is Float
     */
    isFloat(input: any): boolean;
    /**
     * Add object Values
     */
    toObject(val: any): any;
    /**
     * Add Values to Object
     */
    objectAssign(target: any, ...source: any[]): any;
}
/**
 * Option Interface
 */
export interface Options {
    filename: string;
    fieldSeparator: string;
    quoteStrings: string;
    decimalseparator: string;
    showLabels: boolean;
    showTitle: boolean;
    title: string;
    useBom: boolean;
    headers: string[];
    keys: string[];
    removeNewLines: boolean;
}
/**
 * CsvConfigConsts
 */
export declare class CsvConfigConsts {
    static EOL: string;
    static BOM: string;
    static DEFAULT_FIELD_SEPARATOR: string;
    static DEFAULT_DECIMAL_SEPARATOR: string;
    static DEFAULT_QUOTE: string;
    static DEFAULT_SHOW_TITLE: boolean;
    static DEFAULT_TITLE: string;
    static DEFAULT_FILENAME: string;
    static DEFAULT_SHOW_LABELS: boolean;
    static DEFAULT_USE_BOM: boolean;
    static DEFAULT_HEADER: string[];
    static DEFAULT_KEY: string[];
    static DEFAULT_REMOVE_NEW_LINES: boolean;
}
/**
 * Default Configurations
 */
export declare const ConfigDefaults: Options;
