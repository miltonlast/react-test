import React from 'react';
import { ICharacter } from '../interfaces/ICharacter';

type ICharacterItem = {
    item: ICharacter
}

const Character: React.FC<ICharacterItem> = (character): JSX.Element => {
    return (
        <div className="card h-100">
            <div className="card-header">{character.item.portrayed}</div>
            <img src={character.item.img} className="card-img-top" alt={character.item.portrayed} />
            <div className="card-body">
                <p><b>Name: </b>{character.item.name}</p>
                <p><b>Occupation: </b></p>
                <ul>
                    {
                        character.item.occupation.map((x, i) => {
                            return <li key={i}>{x}</li>
                        })
                    }
                </ul>
                <p><b>Status: </b>{character.item.status}</p>
                <p><b>Birthday: </b>{character.item.birthday}</p>
            </div>
        </div>
    );
};

export default Character;