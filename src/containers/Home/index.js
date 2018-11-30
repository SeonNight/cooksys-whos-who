import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import { Link } from 'react-router-dom'

import { loadGenres, selectCategory, selectNumArtists, selectNumSongs } from '../../ducks/config.duck'

class Home extends React.Component {
  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    const categories = this.props.categories.map(
      category => (
        <option
          key={category}
          value={category}>{category}
        </option>
      )
    )

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select onChange={(event) => this.props.selectCategory(event.target.value)}>
            {categories}
          </select>
          <label>Number of ARTISTS</label>
          <input type="range" min="2" max="4" value={this.props.numArtists} onChange={(event) => this.props.selectNumArtists(event.target.value)} />
          <label>Number of Songs </label>
          <input type="range" min="1" max="3" value={this.props.numSongs} onChange={(event) => this.props.selectNumSongs(event.target.value)} />
        </form>
        <Link to="/Game"><button>Submit</button></Link>
      </div>
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
  categories: state.config.categories,
  numArtists: parseInt(state.config.numArtists),
  numSongs: parseInt(state.config.numSongs)
})

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadGenres()),
  selectCategory: category => dispatch(selectCategory(category)),
  selectNumArtists: num => dispatch(selectNumArtists(num)),
  selectNumSongs: num => dispatch(selectNumSongs(num)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
