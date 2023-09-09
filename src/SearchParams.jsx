import { useState, useContext, useTransition} from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("");
  const [BREEDS] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [isPending, startTransition] = useTransition();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  /* const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(() => <Results pets={deferredPets}/>),[deferredPets]); */

  const requestPetsData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
      location: formData.get("location") ?? "",
    };
    startTransition(() => {
      setRequestParams(obj);
    });
  };

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={requestPetsData}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            className="search-input"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
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
            className="search-input grayed-out-disabled"
            id="breed"
            name="breed"
            disabled={!BREEDS.length}
          >
            <option />
            {BREEDS.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>

        {
          isPending? (
            <div className="mini loading-pane">
              <h2 className="loader">:dog2:</h2>

            </div>
          ): (
            <button className="color rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
          Submit
        </button>
          )
        }      


      </form>
      <Results pets={pets} />;
    </div>
  );
};

export default SearchParams;
