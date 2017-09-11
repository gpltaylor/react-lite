/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails react-core
 */

'use strict';
jest.dontMock('../src');
var React = require('../src');
var ReactDOM = require('../src');
var ReactTestUtils = {
  renderIntoDocument: function(instance) {
        var div = document.createElement('div');
        return ReactDOM.render(instance, div);
      }
  };

describe('Render Select with value', function() {
  class Component extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {selectedValue: 2};
    }

    render() {
      return <div>
        <select value={this.state.selectedValue} ref="selectNode">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        {this.state.selectedValue}
        </div>;
    }
  }

  it('should mark correct option as selected', function() {
    var instance = ReactTestUtils.renderIntoDocument(<Component />);
    expect(instance.state.selectedValue).toBe(2);
    expect(instance.refs.selectNode.options[1]._selectedness).toBe(true);
  });

});
