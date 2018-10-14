import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  //   constructor(props) {
  //     super(props);
  //     this.handleIndexClick = this.handleIndexClick.bind(this);
  //   }
  //Alternate use arrow functon as it doesnt create new excution context and uses its lexical scope where its declared

  static getDerivedStateFromProps({ media }) {
    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] == "pn");
    }

    return { photos };
  }

  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /*eslint-disable-next-line */
            <img
              key={photo.value}
              src={photo.value}
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
