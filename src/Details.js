import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router/lib/history";
import Loadable from "react-loadable";
import Carousel from "./Carousel";
import Modal from "./Modal";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const LoadableContent = Loadable({
  loader: () => import("./AdoptModalContent"),
  loading() {
    return <h1> loading split put code</h1>;
  }
});

class Details extends React.Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       loading: true
  //     };
  //   }
  //equivalent code below need to add Parcel babel changes to make it work to
  state = {
    loading: true,
    showModal: false
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        let breed;
        const pet = data.petfinder.pet;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breed.join(", ");
        } else {
          breed = data.petfinder.pet.breeds.breed;
        }
        this.setState({
          name: data.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: err });
        navigate("/");
      });
  }
  render() {
    if (this.state.loading) {
      return <h1> loading ....</h1>;
    }
    const {
      name,
      animal,
      breed,
      location,
      description,
      media,
      showModal
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {" "}
            {animal} - {breed} -{location}
          </h2>
          <button onClick={this.toggleModal}> Adopt {name}</button>
          <p> {description}</p>
          {showModal ? (
            <Modal>
              <LoadableContent toggleModal={this.toggleModal} name={name} />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
