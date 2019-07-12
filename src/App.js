import React from 'react';
import logo from './logo.svg';


class App extends React.Component {

  nameRef = React.createRef();
  constructor (props) {
    super(props)

    this.state = {
      aaa : []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    var bbb = this.nameRef.current.value
    this.setState({
      aaa: [
        ...this.state.aaa,
        bbb
      ]
    });
    this.nameRef.current.value = '';
  }

  Click(i) {
    console.log(i)

    const ccc = this.state.aaa
    // ccc.splice(i,1)
    delete ccc[i]

    this.setState({ aaa: ccc });
  }

  render () {
    //console.log(this.state)

    return (
      <div className="App">
        <h1 className="App-header">
            小肥今晚食乜女？
        </h1>
        <form >
          請輸入文字：<input type = "text" name = "food" value={this.state.value} ref={this.nameRef}/>
          <button onClick={this.handleClick}>Click Me!</button>
        </form>
        <ul>
          {
            this.state.aaa.map((item, i) => {
              return <li key={i}><span>{item}<button onClick={(e) => { this.Click(i) }} type="submit">del</button></span></li>
            })
          }
        </ul>


      </div>
    );
  }
}

export default App;
