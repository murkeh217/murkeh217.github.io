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
      React.createElement("a", { href: "/" }, "Overthinker")), /*#__PURE__*/

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
      React.createElement("a", { href: "/" }, "Can spoil you")), /*#__PURE__*/   

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Fear of Abandonment")), /*#__PURE__*/
      
      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Strength of Love that changes people")), /*#__PURE__*/  
      
      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Soft Heart, Fierce Boundaries")), /*#__PURE__*/ 
      
      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Desires to stop Giving more than Receiving")), /*#__PURE__*/   

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Ride or Die Loyalty")), /*#__PURE__*/ 
      
      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Has Expressive features showing every Emotion")), /*#__PURE__*/  
      
      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Fights your battles like my own")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Purpose is teaching unconditional Love")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Has a sexy brain")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Always puts family first")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Remarkable charismatic")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Very dangerous when provoked")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Very tolerant except for liars")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Can kill you with sarcasm")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Will be the best you ever had")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "The best friend and greatest lover with unquestionable loyalty")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Has Expressive features showing every Emotion")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like being ignored")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like standing too close")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like repeating oneself")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like unannounced visitors")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like being second guessed")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like their things to be touched without asking")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like loud people")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like unruly kids")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like liars")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like bad hygiene")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like nosey people")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like public embarrassment")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Difficult")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Stubborn")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Independent")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Loving")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Supportive")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Humble")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Loyal")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Understanding")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Manipulative")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Passive Aggressive")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Can't be sneaky with me. I have spiritual gifts")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Keeps score of your wrongdoings")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Have my eye on your every move")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Dreams the truth")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Don't like public embarrassment")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Kids smile at me")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Animals approach me")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Strangers tell me their stories")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "My energy doesn't lie")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Irreplaceable")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Selfless")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Grudge holder")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Possessive")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Emotional storm, a sharp memory and maybe even a dramatic exit worthy of a movie scene")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Hate Stress")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Lazy")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Intense")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Contemporary")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Mellow")), /*#__PURE__*/
      
      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Violin")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Classical")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Rock")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Pop")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Calm Mood")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Focus Mood")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Angry Mood")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Impatient")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Sad Mood")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Lonely Mood")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "ESFJ - Ambassador - MBTI")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Type 8 Wing 7 - Challenger - Enneagram")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Cancer Solar Zodiac")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Monkey Lunar Zodiac")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Reliable")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Patient")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Diplomatic")), /*#__PURE__*/
      
      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Dark Side")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Emotional Value")), /*#__PURE__*/

      React.createElement("li", null, /*#__PURE__*/
      React.createElement("a", { href: "/" }, "Charming")), /*#__PURE__*/
    ))));
  }}

ReactDOM.render( /*#__PURE__*/React.createElement(TagCloud, null), mountNode);