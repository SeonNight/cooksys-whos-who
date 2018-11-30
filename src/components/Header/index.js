import React from 'react'
import { Link } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import styled from 'styled-components'

const MainHeader = styled.header`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const HomeButton = styled.button`
  height: 100%;
  padding: auto;
  outline: none;
  background-color: rgb(0,0,0,0);
  border: none;
  color: white;

  &:hover {
    cursor: pointer;
  }
`

const Text = styled.h1`
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
`

class Header extends React.Component {
  render() {
    return (
      <MainHeader>
        <Link to='/'><HomeButton><h1>Home</h1></HomeButton></Link>
        <Text>Who's Who</Text>
        <Text>Score: {this.props.score}</Text>
      </MainHeader>
    )
  }
}

const mapStateToProps = (state) => ({
  score: parseInt(state.score)
})


export default connect(mapStateToProps, null)(Header)
