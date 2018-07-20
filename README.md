# Angular2-csv | Export to CSV  in Angular6
> Helper library for create CSV file in Angular 6

## Installation

```javascript
npm install --save angular2-csv
```
> For Angular [ 2,4,5 ] install old version:
```javascript
npm install --save angular2-csv@0.2.5
```

## Example
> Add module in **app.module.ts**

```javascript
import { Angular2CsvModule } from 'angular2-csv';
```
> Add in **imports** section

```javascript
imports: [
  BrowserModule,
  Angular2CsvModule
],
```
> Use in **component** 
```javascript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: 'asfasf',
    useBom: false,
    removeNewLines: true,
    keys: ['approved','age','name' ]
  };
  data = [
    {
      name: "Test, 1",
      age: 13,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' "
    },
    {
      name: 'Test 2',
      age: 11,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' "
    },
    {
      name: 'Test 3',
      age: 10,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' "
    }
  ];
}
```
> In **template**
```javascript
<angular2csv [data]="data" filename="test.csv" [options]="options"></angular2csv>
```

## API - Angular2Csv(data, filename, options)

| Option        | Default           | Description  |
| :------------- |:-------------:| -----|
| **fieldSeparator**      | , | Defines the field separator character |
| **quoteStrings**      | "      | If provided, will use this characters to "escape" fields, otherwise will use double quotes as deafult |
| **decimalseparator** | .      | Defines the decimal separator character (default is .). If set to "locale", it uses the [language sensitive representation of the number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).|
| **headers** | []      | If provided, would use this attribute to create a header row |
| **showLabels** | false      | If provided, would use this attribute to create a header row |
| **showTitle** | false      |   |
| **title** |  filename | Csv title |
| **useBom** | true      | If true, adds a BOM character at the start of the CSV |
| **removeNewLines** | false      | If true, remove new lines from columns (Helps to remove special characters that can't recognized) |
| **keys** | []      | If provided, would use this attribute to have an order of columns|

**Example**
---

```javascript
  var options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    headers: ['column 1 header', 'column 2 header'],
    showTitle: true,
    useBom: true,
    removeNewLines: false,
    keys: []
  };
```
