import React from 'react'
import { Link } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import styled from 'styled-components'
import { Popup, Icon } from 'semantic-ui-react'

const MainHeader = styled.header`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const ItemContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const TitleHelpBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const HomeButton = styled.button`
  outline: none;
  background-color: rgb(0,0,0,0);
  border: none;
  color: white;

  &:hover {
    cursor: pointer;
  }
`



class Header extends React.Component {
  render() {
    return (
      <MainHeader>
        <ItemContainer>
          <Link to='/'><HomeButton><h1>Home</h1></HomeButton></Link>
        </ItemContainer>
        <ItemContainer>
          <TitleHelpBody>
            <div><h1>Who's Who</h1></div>
            <Popup position='bottom left'
              trigger={<Icon circular name='help' size='tiny' inverted color='teal'/>}
              content={<p>Who's who is a game where you guess the artist given a choise of songs. But be careful, 3 strikes and you're out. Got what it takes to get the high score?</p>}/>
          </TitleHelpBody>
        </ItemContainer>
        <ItemContainer>
          <div><h1>High Score: {this.props.score}</h1></div>
        </ItemContainer>
      </MainHeader>
    )
  }
}

const mapStateToProps = (state) => ({
  score: parseInt(state.highscore)
})


export default connect(mapStateToProps, null)(Header)
