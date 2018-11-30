import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Form } from 'semantic-ui-react'

import { loadGenres, selectCategory, selectNumArtists, selectNumSongs } from '../../ducks/config.duck'


const HomeBody = styled.div`
  width: 100%;
  display: flex;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormBody = styled.div`
  width: 300px;
  background-color: white;
  margin: 10px;
  padding: 20px;
  
  border-radius: 15px;
  box-shadow: 10px 10px 10px grey;
`

const CatagoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const NumberCenter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  text-weight: bold;
`

const SliderContainer = styled.div`
  width: 100%;
`

const Slider = styled.input`
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */ 
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: rgb(22, 88, 230);
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: rgb(22, 88, 230);
    cursor: pointer;
  }
`

const ButtonBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

class Home extends React.Component {
  componentDidMount () {
    this.props.loadCategories()
  }

  randomCategory = () => {
    this.props.selectCategory(this.props.categories[Math.floor(Math.random() * this.props.categories.length)])
  }
  randomArtists = () => {
    this.props.selectNumArtists(Math.floor(Math.random() * 3) + 2)
  }
  randomSongs = () => {
    this.props.selectNumSongs(Math.floor(Math.random() * 3) + 1)
  }
  random = () => {
    this.randomCategory()
    this.randomArtists()
    this.randomSongs()
  }

  render () {
    const categories = this.props.categories.map(
      category => (
        <option
          key={category}
          value={category}>{category}
        </option>
        )
    )

    return (
      <HomeBody>
        <FormBody>
          <Form>
            <Form.Field>
              <label>Choose a Catagory</label>
              <CatagoryContainer>
                <Button color='teal' onClick={this.randomCategory}>Random</Button>
                <select value={this.props.selectedCategory} onChange={(event) => this.props.selectCategory(event.target.value)}>
                  {categories}
                </select>
              </CatagoryContainer>
            </Form.Field>
            <Form.Field>
              <label>Number Of Artists</label>
              <CatagoryContainer>
                <SliderContainer>
                  <Slider type='range' min='2' max='4' value={this.props.numArtists} onChange={(event) => this.props.selectNumArtists(event.target.value)}/>
                </SliderContainer>
                <Button color='teal' onClick={this.randomArtists}>Random</Button>
              </CatagoryContainer>
              <NumberCenter>{this.props.numArtists}</NumberCenter>
            </Form.Field>
            <Form.Field>
              <label>Number of Songs</label>
              <CatagoryContainer>
                <SliderContainer>
                  <Slider type='range' min='1' max='3' value={this.props.numSongs} onChange={(event) => this.props.selectNumSongs(event.target.value)}/>
                </SliderContainer>
                <Button color='teal' onClick={this.randomSongs}>Random</Button>
              </CatagoryContainer>
              <NumberCenter>{this.props.numSongs}</NumberCenter>
            </Form.Field>
            <Form.Field>
              <ButtonBody>
                <Link to='/Game'><Button primary>Play</Button></Link>
                <Button color='teal' onClick={this.random}>Random</Button>
                <Button secondary onClick={this.props.restart}>Reset</Button>
              </ButtonBody>
            </Form.Field>
          </Form>
        </FormBody>
      </HomeBody>
    )
  }
}

Home.propTypes = {
  loadCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectNumArtists: PropTypes.func.isRequired,
  selectNumSongs: PropTypes.func.isRequired,
  categories: PropTypes.array,
  numArtists: PropTypes.number,
  numSongs: PropTypes.number
}

const mapStateToProps = (state) => ({
  selectedCategory: state.config.selectedCategory,
  categories: state.config.categories,
  numArtists: parseInt(state.config.numArtists),
  numSongs: parseInt(state.config.numSongs)
})

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadGenres()),
  selectCategory: category => dispatch(selectCategory(category)),
  selectNumArtists: num => dispatch(selectNumArtists(num)),
  selectNumSongs: num => dispatch(selectNumSongs(num))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
