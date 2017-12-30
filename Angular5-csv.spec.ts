/* tslint:disable:no-unused-variable */

import { Angular5Csv } from './Angular5-csv';

describe('Component: Angular2Csv', () => {
  it('should create an file with name My_Report.csv', () => {
  	let data = [
  		{ 
  			name: "Test 1",
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
  			name: 'Test 4',
  			age: 10,
  			average: 8.2,
  			approved: true,
  			description: "using 'Content here, content here' "
  		},
  	];

  	let component = new Angular5Csv(data, 'My Report');
  	expect(component).toBeTruthy();
  });
});