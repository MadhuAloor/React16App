import React from "react";
import { Link } from "@reach/router";

class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location, id } = this.props;
    let photos = [];

    if (media && media.photos && media.photos) {
      photos = media.photos.photo.filter(photo => photo["@size"] == "pn");
    }

    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={photos[0].value} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h1>{`${animal} - ${breed} ${location}`}</h1>
        </div>
      </Link>
    );
  }
}
export default Pet;
