/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class Angular2CsvComponent {
    constructor() {
        this.filename = this.filename || 'mycsv.csv';
        this.options = this.objectAssign({}, ConfigDefaults, this.options);
        this.label_btn = "download";
        this.csv = '';
    }
    /**
     * Event Download
     * @return {?}
     */
    onDownload() {
        this.generateCsv();
    }
    /**
     * ngOnInit
     * @return {?}
     */
    ngOnInit() { }
    /**
     * [generateCsv description]
     * @return {?}
     */
    generateCsv() {
        if (this.options.useBom) {
            this.csv += CsvConfigConsts.BOM;
        }
        if (this.options.showTitle) {
            this.csv += this.options.title + '\r\n\n';
        }
        this.getHeaders();
        this.getBody();
        if (this.csv === '') {
            console.log('Invalid data');
            return;
        }
        let /** @type {?} */ blob = new Blob([this.csv], { type: 'text/csv;charset=utf8;' });
        if (navigator.msSaveBlob) {
            let /** @type {?} */ filename = this.options.filename.replace(/ /g, '_') + '.csv';
            navigator.msSaveBlob(blob, filename);
        }
        else {
            let /** @type {?} */ uri = 'data:attachment/csv;charset=utf-8,' + encodeURI(this.csv);
            let /** @type {?} */ link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('visibility', 'hidden');
            link.download = this.filename.replace(/ /g, '_') + '.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        this.csv = '';
    }
    /**
     * Create Headers for Csv File
     * @return {?}
     */
    getHeaders() {
        if (this.options.headers.length > 0) {
            let /** @type {?} */ row = '';
            for (let /** @type {?} */ column of this.options.headers) {
                row += column + this.options.fieldSeparator;
            }
            row = row.slice(0, -1);
            this.csv += row + CsvConfigConsts.EOL;
        }
    }
    /**
     * Create Headers
     * @return {?}
     */
    getBody() {
        for (let /** @type {?} */ dataRow of this.data) {
            let /** @type {?} */ row = '';
            if (this.isEmptyObject(dataRow) && this.options.removeNewLines) {
                continue;
            }
            if (typeof this.options.keys !== 'undefined' && this.options.keys.length) {
                for (let /** @type {?} */ key of this.options.keys) {
                    row += this.formartData(dataRow[key]) + this.options.fieldSeparator;
                }
                row = row.slice(0, -1);
                this.csv += row + CsvConfigConsts.EOL;
            }
            else {
                for (let /** @type {?} */ key in dataRow) {
                    if (dataRow[key]) {
                        row += this.formartData(dataRow[key]) + this.options.fieldSeparator;
                    }
                }
                this.csv += row + CsvConfigConsts.EOL;
            }
        }
    }
    /**
     * Format Data
     * @param {?} data
     * @return {?}
     */
    formartData(data) {
        if (this.options.decimalseparator === 'locale' && this.isFloat(data)) {
            return data.toLocaleString();
        }
        if (this.options.decimalseparator !== '.' && this.isFloat(data)) {
            return data.toString().replace('.', this.options.decimalseparator);
        }
        if (typeof data === 'string') {
            data = data.replace(/"/g, '""');
            if (this.options.quoteStrings || data.indexOf(',') > -1 || data.indexOf("\n") > -1 || data.indexOf("\r") > -1) {
                data = this.options.quoteStrings + data + this.options.quoteStrings;
            }
            return data;
        }
        if (typeof data === 'boolean') {
            return data ? 'TRUE' : 'FALSE';
        }
        return data;
    }
    /**
     * Validate if object is not empty
     * @param {?} obj
     * @return {?}
     */
    isEmptyObject(obj) {
        return (obj && (Object.keys(obj).length === 0));
    }
    /**
     * Get Input is Float
     * @param {?} input
     * @return {?}
     */
    isFloat(input) {
        return +input === input && (!isFinite(input) || Boolean(input % 1));
    }
    /**
     * Add object Values
     * @param {?} val
     * @return {?}
     */
    toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('Object.assign cannot be called with null or undefined');
        }
        return Object(val);
    }
    /**
     * Add Values to Object
     * @param {?} target
     * @param {...?} source
     * @return {?}
     */
    objectAssign(target, ...source) {
        let /** @type {?} */ from;
        let /** @type {?} */ to = this.toObject(target);
        let /** @type {?} */ symbols;
        let /** @type {?} */ hasOwnProperty = Object.prototype.hasOwnProperty;
        let /** @type {?} */ propIsEnumerable = Object.prototype.propertyIsEnumerable;
        for (let /** @type {?} */ s = 1; s < arguments.length; s++) {
            from = Object(arguments[s]);
            for (let /** @type {?} */ key in from) {
                if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
            if ((/** @type {?} */ (Object)).getOwnPropertySymbols) {
                symbols = (/** @type {?} */ (Object)).getOwnPropertySymbols(from);
                for (let /** @type {?} */ symbol of symbols) {
                    if (propIsEnumerable.call(from, symbol)) {
                        to[symbol] = from[symbol];
                    }
                }
            }
        }
        return to;
    }
}
Angular2CsvComponent.decorators = [
    { type: Component, args: [{
                selector: 'angular2csv',
                template: `<button (click)="onDownload()">{{ label_btn }}</button>`,
                styles: []
            },] },
];
/** @nocollapse */
Angular2CsvComponent.ctorParameters = () => [];
Angular2CsvComponent.propDecorators = {
    data: [{ type: Input }],
    filename: [{ type: Input }],
    options: [{ type: Input }]
};
function Angular2CsvComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Angular2CsvComponent.prototype.data;
    /** @type {?} */
    Angular2CsvComponent.prototype.filename;
    /** @type {?} */
    Angular2CsvComponent.prototype.options;
    /** @type {?} */
    Angular2CsvComponent.prototype.label_btn;
    /** @type {?} */
    Angular2CsvComponent.prototype.csv;
}
/**
 * Option Interface
 * @record
 */
export function Options() { }
function Options_tsickle_Closure_declarations() {
    /** @type {?} */
    Options.prototype.filename;
    /** @type {?} */
    Options.prototype.fieldSeparator;
    /** @type {?} */
    Options.prototype.quoteStrings;
    /** @type {?} */
    Options.prototype.decimalseparator;
    /** @type {?} */
    Options.prototype.showLabels;
    /** @type {?} */
    Options.prototype.showTitle;
    /** @type {?} */
    Options.prototype.title;
    /** @type {?} */
    Options.prototype.useBom;
    /** @type {?} */
    Options.prototype.headers;
    /** @type {?} */
    Options.prototype.keys;
    /** @type {?} */
    Options.prototype.removeNewLines;
}
/**
 * CsvConfigConsts
 */
export class CsvConfigConsts {
}
CsvConfigConsts.EOL = '\r\n';
CsvConfigConsts.BOM = '\ufeff';
CsvConfigConsts.DEFAULT_FIELD_SEPARATOR = ',';
CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR = '.';
CsvConfigConsts.DEFAULT_QUOTE = '"';
CsvConfigConsts.DEFAULT_SHOW_TITLE = false;
CsvConfigConsts.DEFAULT_TITLE = 'My Report';
CsvConfigConsts.DEFAULT_FILENAME = 'mycsv.csv';
CsvConfigConsts.DEFAULT_SHOW_LABELS = false;
CsvConfigConsts.DEFAULT_USE_BOM = true;
CsvConfigConsts.DEFAULT_HEADER = [];
CsvConfigConsts.DEFAULT_KEY = [];
CsvConfigConsts.DEFAULT_REMOVE_NEW_LINES = false;
function CsvConfigConsts_tsickle_Closure_declarations() {
    /** @type {?} */
    CsvConfigConsts.EOL;
    /** @type {?} */
    CsvConfigConsts.BOM;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_FIELD_SEPARATOR;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_QUOTE;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_SHOW_TITLE;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_TITLE;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_FILENAME;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_SHOW_LABELS;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_USE_BOM;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_HEADER;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_KEY;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_REMOVE_NEW_LINES;
}
/**
 * Default Configurations
 */
export const /** @type {?} */ ConfigDefaults = {
    filename: CsvConfigConsts.DEFAULT_FILENAME,
    fieldSeparator: CsvConfigConsts.DEFAULT_FIELD_SEPARATOR,
    quoteStrings: CsvConfigConsts.DEFAULT_QUOTE,
    decimalseparator: CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR,
    showLabels: CsvConfigConsts.DEFAULT_SHOW_LABELS,
    showTitle: CsvConfigConsts.DEFAULT_SHOW_TITLE,
    title: CsvConfigConsts.DEFAULT_TITLE,
    useBom: CsvConfigConsts.DEFAULT_USE_BOM,
    headers: CsvConfigConsts.DEFAULT_HEADER,
    keys: CsvConfigConsts.DEFAULT_KEY,
    removeNewLines: CsvConfigConsts.DEFAULT_REMOVE_NEW_LINES
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItY3N2LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWNzdi8iLCJzb3VyY2VzIjpbImxpYi9hbmd1bGFyMi1jc3YuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF6RCxNQUFNO0lBU0o7d0JBTjZCLElBQUksQ0FBQyxRQUFRLElBQUksV0FBVzt1QkFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBRTNELFVBQVU7bUJBQ2hCLEVBQUU7S0FFQTs7Ozs7SUFJaEIsVUFBVTtRQUNSLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQjs7Ozs7SUFJRCxRQUFRLE1BQUs7Ozs7O0lBSWIsV0FBVztRQUVULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUM7U0FDakM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDM0M7UUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDO1NBQ1I7UUFFRCxxQkFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxJ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bnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhcjJjc3YnLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gKGNsaWNrKT1cIm9uRG93bmxvYWQoKVwiPnt7IGxhYmVsX2J0biB9fTwvYnV0dG9uPmAsXG4gIHN0eWxlczogW11cbn0pXG5cbmV4cG9ydCBjbGFzcyBBbmd1bGFyMkNzdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZGF0YTogYW55W107XG4gIEBJbnB1dCgpIGZpbGVuYW1lOiBzdHJpbmcgID0gdGhpcy5maWxlbmFtZSB8fCAnbXljc3YuY3N2JztcbiAgQElucHV0KCkgb3B0aW9uczogT3B0aW9ucyA9IHRoaXMub2JqZWN0QXNzaWduKHt9LCBDb25maWdEZWZhdWx0cywgdGhpcy5vcHRpb25zKTtcblxuICBsYWJlbF9idG46IHN0cmluZyA9IFwiZG93bmxvYWRcIjtcbiAgY3N2OiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG4gIC8qKlxuICAgKiBFdmVudCBEb3dubG9hZFxuICAgKi9cbiAgb25Eb3dubG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmdlbmVyYXRlQ3N2KCk7XG4gIH1cbiAgLyoqXG4gICAqIG5nT25Jbml0XG4gICAqL1xuICBuZ09uSW5pdCgpIHt9XG4gIC8qKlxuICAgKiBbZ2VuZXJhdGVDc3YgZGVzY3JpcHRpb25dXG4gICAqL1xuICBnZW5lcmF0ZUNzdigpOiB2b2lkIHtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlQm9tKSB7XG4gICAgICB0aGlzLmNzdiArPSBDc3ZDb25maWdDb25zdHMuQk9NO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd1RpdGxlKSB7XG4gICAgICB0aGlzLmNzdiArPSB0aGlzLm9wdGlvbnMudGl0bGUgKyAnXFxyXFxuXFxuJztcbiAgICB9XG5cbiAgICB0aGlzLmdldEhlYWRlcnMoKTtcbiAgICB0aGlzLmdldEJvZHkoKTtcblxuICAgIGlmICh0aGlzLmNzdiA9PT0gJycpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIGRhdGEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFt0aGlzLmNzdl0sIHt0eXBlOiAndGV4dC9jc3Y7Y2hhcnNldD11dGY4Oyd9KTtcblxuICAgIGlmIChuYXZpZ2F0b3IubXNTYXZlQmxvYikge1xuXG4gICAgICBsZXQgZmlsZW5hbWUgPSB0aGlzLm9wdGlvbnMuZmlsZW5hbWUucmVwbGFjZSgvIC9nLCAnXycpICsgJy5jc3YnO1xuICAgICAgbmF2aWdhdG9yLm1zU2F2ZUJsb2IoYmxvYiwgZmlsZW5hbWUpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgbGV0IHVyaSA9ICdkYXRhOmF0dGFjaG1lbnQvY3N2O2NoYXJzZXQ9dXRmLTgsJyArIGVuY29kZVVSSSh0aGlzLmNzdik7XG4gICAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgbGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICBsaW5rLmRvd25sb2FkID0gdGhpcy5maWxlbmFtZS5yZXBsYWNlKC8gL2csICdfJykgKyAnLmNzdic7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG5cbiAgICAgIGxpbmsuY2xpY2soKTtcblxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICB9XG5cbiAgICB0aGlzLmNzdiA9ICcnO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgSGVhZGVycyBmb3IgQ3N2IEZpbGVcbiAgICovXG4gIGdldEhlYWRlcnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oZWFkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCByb3cgPSAnJztcbiAgICAgIGZvciAobGV0IGNvbHVtbiBvZiB0aGlzLm9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICByb3cgKz0gY29sdW1uICsgdGhpcy5vcHRpb25zLmZpZWxkU2VwYXJhdG9yO1xuICAgICAgfVxuXG4gICAgICByb3cgPSByb3cuc2xpY2UoMCwgLTEpO1xuICAgICAgdGhpcy5jc3YgKz0gcm93ICsgQ3N2Q29uZmlnQ29uc3RzLkVPTDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBIZWFkZXJzXG4gICAqL1xuICBnZXRCb2R5KCk6IHZvaWQge1xuXG4gICAgZm9yIChsZXQgZGF0YVJvdyBvZiB0aGlzLmRhdGEpIHtcblxuICAgICAgbGV0IHJvdyA9ICcnO1xuXG4gICAgICBpZih0aGlzLmlzRW1wdHlPYmplY3QoZGF0YVJvdykgJiYgdGhpcy5vcHRpb25zLnJlbW92ZU5ld0xpbmVzKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5rZXlzICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLm9wdGlvbnMua2V5cy5sZW5ndGgpIHtcblxuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5vcHRpb25zLmtleXMpIHtcbiAgICAgICAgICByb3cgKz0gdGhpcy5mb3JtYXJ0RGF0YShkYXRhUm93W2tleV0pICsgdGhpcy5vcHRpb25zLmZpZWxkU2VwYXJhdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgcm93ID0gcm93LnNsaWNlKDAsIC0xKTtcbiAgICAgICAgdGhpcy5jc3YgKz0gcm93ICsgQ3N2Q29uZmlnQ29uc3RzLkVPTDtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YVJvdykge1xuICAgICAgICAgIGlmKGRhdGFSb3dba2V5XSkge1xuICAgICAgICAgICAgcm93ICs9IHRoaXMuZm9ybWFydERhdGEoZGF0YVJvd1trZXldKSArIHRoaXMub3B0aW9ucy5maWVsZFNlcGFyYXRvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jc3YgKz0gcm93ICsgQ3N2Q29uZmlnQ29uc3RzLkVPTDtcblxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogRm9ybWF0IERhdGFcbiAgICovXG4gIGZvcm1hcnREYXRhKGRhdGE6IGFueSkge1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWNpbWFsc2VwYXJhdG9yID09PSAnbG9jYWxlJyAmJiB0aGlzLmlzRmxvYXQoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWNpbWFsc2VwYXJhdG9yICE9PSAnLicgJiYgdGhpcy5pc0Zsb2F0KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoJy4nLCB0aGlzLm9wdGlvbnMuZGVjaW1hbHNlcGFyYXRvcik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXCIvZywgJ1wiXCInKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5xdW90ZVN0cmluZ3MgfHwgZGF0YS5pbmRleE9mKCcsJykgPiAtMSB8fCBkYXRhLmluZGV4T2YoXCJcXG5cIikgPiAtMSB8fCBkYXRhLmluZGV4T2YoXCJcXHJcIikgPiAtMSkge1xuICAgICAgICBkYXRhID0gdGhpcy5vcHRpb25zLnF1b3RlU3RyaW5ncyArIGRhdGEgKyB0aGlzLm9wdGlvbnMucXVvdGVTdHJpbmdzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIGRhdGEgPyAnVFJVRScgOiAnRkFMU0UnO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBpZiBvYmplY3QgaXMgbm90IGVtcHR5XG4gICAqL1xuICBpc0VtcHR5T2JqZWN0KG9iajogYW55KSB7XG4gICAgcmV0dXJuIChvYmogJiYgKE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwKSk7XG4gIH1cbiAgLyoqXG4gICAqIEdldCBJbnB1dCBpcyBGbG9hdFxuICAgKi9cbiAgaXNGbG9hdChpbnB1dDogYW55KSB7XG4gICAgcmV0dXJuICtpbnB1dCA9PT0gaW5wdXQgJiYgKCFpc0Zpbml0ZShpbnB1dCkgfHwgQm9vbGVhbihpbnB1dCAlIDEpKTtcbiAgfVxuICAvKipcbiAgICogQWRkIG9iamVjdCBWYWx1ZXNcbiAgICovXG4gIHRvT2JqZWN0KHZhbDogYW55KSB7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdCh2YWwpO1xuICB9XG4gIC8qKlxuICAgKiBBZGQgVmFsdWVzIHRvIE9iamVjdFxuICAgKi9cbiAgb2JqZWN0QXNzaWduKHRhcmdldDogYW55LCAuLi5zb3VyY2U6IGFueVtdKSB7XG4gICAgbGV0IGZyb206IGFueTtcbiAgICBsZXQgdG8gPSB0aGlzLnRvT2JqZWN0KHRhcmdldCk7XG4gICAgbGV0IHN5bWJvbHM6IGFueTtcblxuICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gICAgbGV0IHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4gICAgZm9yIChsZXQgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcbiAgICAgIGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuICAgICAgZm9yIChsZXQga2V5IGluIGZyb20pIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCg8YW55PiBPYmplY3QpLmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgICBzeW1ib2xzID0gKDxhbnk+IE9iamVjdCkuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuICAgICAgICBmb3IgKGxldCBzeW1ib2wgb2Ygc3ltYm9scykge1xuICAgICAgICAgIGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sKSkge1xuICAgICAgICAgICAgdG9bc3ltYm9sXSA9IGZyb21bc3ltYm9sXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG87XG4gIH1cbn1cbi8qKlxuICogT3B0aW9uIEludGVyZmFjZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICBmaWxlbmFtZTogc3RyaW5nO1xuICBmaWVsZFNlcGFyYXRvcjogc3RyaW5nO1xuICBxdW90ZVN0cmluZ3M6IHN0cmluZztcbiAgZGVjaW1hbHNlcGFyYXRvcjogc3RyaW5nO1xuICBzaG93TGFiZWxzOiBib29sZWFuO1xuICBzaG93VGl0bGU6IGJvb2xlYW47XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHVzZUJvbTogYm9vbGVhbjtcbiAgaGVhZGVyczogc3RyaW5nW107XG4gIGtleXM6IHN0cmluZ1tdO1xuICByZW1vdmVOZXdMaW5lczogYm9vbGVhbjtcbn1cbi8qKlxuICogQ3N2Q29uZmlnQ29uc3RzXG4gKi9cbmV4cG9ydCBjbGFzcyBDc3ZDb25maWdDb25zdHMge1xuXG4gIHB1YmxpYyBzdGF0aWMgRU9MID0gJ1xcclxcbic7XG4gIHB1YmxpYyBzdGF0aWMgQk9NID0gJ1xcdWZlZmYnO1xuXG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9GSUVMRF9TRVBBUkFUT1IgPSAnLCc7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9ERUNJTUFMX1NFUEFSQVRPUiA9ICcuJztcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX1FVT1RFID0gJ1wiJztcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX1NIT1dfVElUTEUgPSBmYWxzZTtcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX1RJVExFID0gJ015IFJlcG9ydCc7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9GSUxFTkFNRSA9ICdteWNzdi5jc3YnO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfU0hPV19MQUJFTFMgPSBmYWxzZTtcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX1VTRV9CT00gPSB0cnVlO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfSEVBREVSOiBzdHJpbmdbXSA9IFtdO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfS0VZOiBzdHJpbmdbXSA9IFtdO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfUkVNT1ZFX05FV19MSU5FUyA9IGZhbHNlO1xufVxuLyoqXG4gKiBEZWZhdWx0IENvbmZpZ3VyYXRpb25zXG4gKi9cbmV4cG9ydCBjb25zdCBDb25maWdEZWZhdWx0czogT3B0aW9ucyA9IHtcbiAgZmlsZW5hbWU6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX0ZJTEVOQU1FLFxuICBmaWVsZFNlcGFyYXRvcjogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfRklFTERfU0VQQVJBVE9SLFxuICBxdW90ZVN0cmluZ3M6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX1FVT1RFLFxuICBkZWNpbWFsc2VwYXJhdG9yOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9ERUNJTUFMX1NFUEFSQVRPUixcbiAgc2hvd0xhYmVsczogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfU0hPV19MQUJFTFMsXG4gIHNob3dUaXRsZTogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfU0hPV19USVRMRSxcbiAgdGl0bGU6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX1RJVExFLFxuICB1c2VCb206IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX1VTRV9CT00sXG4gIGhlYWRlcnM6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX0hFQURFUixcbiAga2V5czogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfS0VZLFxuICByZW1vdmVOZXdMaW5lczogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfUkVNT1ZFX05FV19MSU5FU1xufTtcbiJdfQ==