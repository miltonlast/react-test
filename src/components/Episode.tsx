import React from 'react';
import { IEpisode } from '../interfaces/IEpisode';

type IEpisodeItem = {
    item: IEpisode
}

const Episode: React.FC<IEpisodeItem> = (episode): JSX.Element => {
    return (
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title">{episode.item.title}</h5>
                <p><b>Season: </b>{episode.item.season}</p>
                <p><b>Episode: </b>{episode.item.episode}</p>
                <p><b>Air Date: </b>{episode.item.air_date}</p>
            </div>
        </div>
    )
}

export default Episode;