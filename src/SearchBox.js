import React from "react";
import { ANIMALS } from "petfinder-client";
import { connect } from "react-redux";
import getBreeds from "./actionCreator/getBreeds";
import changeAnimal from "./actionCreator/changeAnimal";
import changeBreed from "./actionCreator/changeBreed";
import changeLocation from "./actionCreator/changeLocation";

class SearchBox extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };

  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={this.props.location}
            onChange={this.props.handleLocationChange}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          animal
          <select
            id="animal"
            value={this.props.animal}
            onChange={this.props.handleAnimalChange}
            onBlur={this.props.handleAnimalChange}
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={this.props.breed}
            onChange={this.props.handleBreedChange}
            onBlur={this.props.handleBreedChange}
            disabled={this.props.breeds.length == 0}
          >
            <option />
            {this.props.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <button onClick={this.props.search}> Submit</button>
        </label>
      </div>
    );
  }
}

const mapStateToProps = ({ breed, breeds, animal, location }) => ({
  breed,
  breeds,
  animal,
  location
});

const mapDispatchToProps = dispatch => ({
  handleAnimalChange(event) {
    dispatch(changeAnimal(event.target.value));
    dispatch(getBreeds());
  },
  handleLocationChange(event) {
    dispatch(changeLocation(event.target.value));
  },
  handleBreedChange(event) {
    dispatch(changeBreed(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
