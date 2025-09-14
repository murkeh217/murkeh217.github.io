const mountNode = document.getElementById("app");

class TagCloud extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTagCloud() {
    try {
      TagCanvas.Start("myCanvas", "tags", {
        textColour: "#ffffffff",
        outlineColour: "#199914ff",
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05 });

    } catch (e) {
      // something went wrong, hide the canvas container
      document.getElementById("myCanvasContainer").style.display = "none";
    }
  }

  componentDidMount() {
    this.renderTagCloud();
  }

  componentWillUnmount() {}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { style: {display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%", flexDirection: "column", }, }, /*#__PURE__*/
      React.createElement("h1", { class: "header" }, ""), /*#__PURE__*/
      React.createElement("div", { id: "myCanvasContainer" }, /*#__PURE__*/
      React.createElement("canvas", { width: "800", height: "800", id: "myCanvas" }, /*#__PURE__*/
      React.createElement("p", null, "Anything in here will be replaced on browsers that do not support the canvas element"))), /*#__PURE__*/


      React.createElement("div", { id: "tags" }, /*#__PURE__*/
      React.createElement("ul", null, /*#__PURE__*/
      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Nice")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Kind")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Respectful")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Sweet")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Polite")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Gentle")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Intelligent")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Honest")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Open-mind")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Shy")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Overthink")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Lazy")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Judgemental")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Sarcastic")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Sensitive")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Moody")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Sentimental")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Clingy")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Deep Thinker")),

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Creative")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Soft Spoken")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Gentleman")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Charismatic")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Good memory")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Spoil you")) /*#__PURE__*/   
    
    ))));





  }}


ReactDOM.render( /*#__PURE__*/React.createElement(TagCloud, null), mountNode);