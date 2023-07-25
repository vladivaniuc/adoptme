import { useEffect, useState } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearhParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [BREEDS] = useBreedList(animal);

  useEffect(() => {
    requestPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("This is breeds:", BREEDS);
  }, [BREEDS]);

  const udpateLocation = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
  };

  const udpateAnimal = (e) => {
    const newAnimal = e.target.value;
    setAnimal(newAnimal);
    setBreed("");
  };

  const udpateBreed = (e) => {
    const newBreed = e.target.value;
    setBreed(newBreed);
  };

  async function requestPets() {
    try {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await res.json();
      setPets(json.pets);
    } catch (error) {
      // Handle the error gracefully
      console.error("Error fetching pets:", error.message);
      // You can set pets to an empty array or show a message to the user indicating the error.
      setPets([]);
    }
  }

  const requestPetsData = (e) => {
    e.preventDefault();
    requestPets();
  };

  return (
    <div className="search-params">
      <form onSubmit={requestPetsData}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={udpateLocation}
          ></input>
        </label>

        <label htmlFor="animal">
          Animal
          <select id="animal" value={animal} onChange={udpateAnimal}>
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="animal"
            value={breed}
            onChange={udpateBreed}
            disabled={!BREEDS.length}
          >
            <option />
            {BREEDS.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
            <Results pets={pets}/>
      ;
    </div>
  );
};

export default SearhParams;
