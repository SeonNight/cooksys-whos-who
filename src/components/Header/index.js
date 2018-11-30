import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const MainHeader = styled.header`
  width: 100%;
  height: 100%;
  background-color: blue;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Header = (props) =>
  <MainHeader>
    <Link to="/"><button>Home</button></Link>
    <h1>Who's Who</h1>
    <h1>Score</h1>
  </MainHeader>

export default Header
