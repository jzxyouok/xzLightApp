var React = require("react");
const {XzComponents} = require("../../../index").default



// function loadC(name) {
// 	require.ensure(["../components/button"], function(require) {
// 		alert("s");
// 	});
// }
class PageView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  		
    return (<div><XzComponents.listview/></div>);
  }
}
module.exports = PageView;
