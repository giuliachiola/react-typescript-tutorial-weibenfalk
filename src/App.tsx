import React from 'react';

// Api
import { fetchCharacter } from './api';
// Types
import { Character } from './api';
// Styles
import { Wrapper } from './App.styles';
// Components
import Card from './components/Card';
import Item from './components/Item';
// Context hook
import { useCharacterId } from './context'; // utility function to grab the value

const App: React.FC = () => {
  const [character, setCharacter] = React.useState<Character>({} as Character);
  const [isLoading, setIsLoading] = React.useState(false);
  // Instead of this locally:
  // const [characterId, setCharacterId] = React.useState(1);
  // we want to use it globally
  const { characterId, setCharacterId } = useCharacterId();

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // note: fetching data is a side-effect
    // fetch is an async operation

    const fetchFromApi = async () => {
      setIsLoading(true);
      const result = await fetchCharacter(characterId);
      setIsLoading(false);
      setCharacter(result);
    };

    fetchFromApi();
  }, [characterId]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(e.currentTarget);
    setCharacterId(Number(inputRef.current?.value));
    // setCharacterId(Math.floor(Math.random() * 10) + 1)
  };

  return (
    <Wrapper characterId={characterId}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            style={{ display: 'grid', gridTemplateColumns: '50% 50%', maxWidth: '80vw' }}>
            <Card
              id={characterId}
              name={character.name}
              imgUrl={character.img_url}
              gender={character.gender}
            />

            <Item<typeof character>
              item={character}
              onClick={(item) => console.log(`origin: ${item.origin}`)}
            />
          </div>

          <input type="number" ref={inputRef} />
          <button onClick={handleButtonClick}>Go to selected character</button>
        </>
      )}
    </Wrapper>
  );
};

export default App;
