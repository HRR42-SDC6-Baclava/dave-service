import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Mentions from './Mentions.jsx';

import styled from 'styled-components';

const Box = styled.section`
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 50px;
  padding: 15px 40px 15px 40px;
  background-color: rgb(255,255,255);
  width: 750px;
  text-align: center;
`;

const HeaderText = styled.h1`
  text-align: left;
  padding-top: 10px;
  font: 16px/24px 'Calibre-Semibold';
  letter-spacing: .086em;
  color: rgb(96,97,97);
  text-transform: uppercase;
`;

const Button = styled.button`
  border: 2px solid #b70038;
  height: 40px;
  width:  200px;
  text-align: center;
  padding-top: 7px;
  font: 16px/24px 'Calibre-Medium';
  font-size: 16px;
  text-transform: uppercase;
  color: #b70038;
  letter-spacing: .061em;
  line-height: 15px;
  display: inline-block;
  cursor: pointer;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      showAll: null
    }
  }

  componentDidMount() {
    var url = window.location.href;
    var id = url.split('=')[1];

    $.ajax({
      type: "GET",
      url: `http://localhost:3003/api/restaurants/${id}`,
      success: (data) => {
        this.setState({
          articles: data.articles,
          showAll: false
        })
      },
      error: (error) => {
        console.log("Error getting articles: ", error);
      }
    })
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showAll: !this.state.showAll
    })
  }

  render() {
    if (this.state.showAll === null) {
      return (
        <div>Content is loading...</div>
      )
    } else if (this.state.showAll === false) {
      return (
        <Box>
        <HeaderText >Zagat mentions of this restaurant</HeaderText>
          <Mentions articles={this.state.articles.slice(0,2)}/>
          <Button type="button" onClick={this.handleClick.bind(this)}>Show All ({this.state.articles.length})</Button>
        </Box>
      )
    }
    else if (this.state.showAll === true) {
      return (
        <Box>
          <HeaderText >Zagat mentions of this restaurant</HeaderText>
          <Mentions articles={this.state.articles}/>
          <Button type="button" onClick={this.handleClick.bind(this)}>Show Less</Button>
        </Box>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("app2"));