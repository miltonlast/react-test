import axios from 'axios-observable';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { map } from 'rxjs/operators';
import { IEpisode } from '../interfaces/IEpisode';
import Episode from './Episode';


const Episodes: React.FC = (): JSX.Element => {
    const [season, setSeason] = useState(0);
    const [responseData, setResponseData] = useState<Array<IEpisode>>([]);
    const handleChange = (event: ChangeEvent<{ value: string }>): void => {
        const value = Number(event.currentTarget.value);
        fetchEpisodes(value);
        setSeason(value);
    }    

    useEffect(() => {
        fetchEpisodes(season);
    }, []);

    const fetchEpisodes = (seasonValue: number) => {
        axios.get<Array<IEpisode>>('https://www.breakingbadapi.com/api/episodes').pipe(
            map(x => {
                return (seasonValue == 0)
                    ? x.data
                    : x.data.filter(y => y.season == seasonValue);
            })
        ).subscribe(response => setResponseData(response));
    }

    return (
        <div className="row col-md-12">
            <div className="container my-lg-5">
                <h5>FILTER</h5>
                <div>
                    <div className="form-group col-md-2" style={{ paddingLeft: '0px' }}>
                        <select className="form-control" name="city" onChange={handleChange}>
                            <option value="0">All Seasons</option>
                            <option value="1">Season 1</option>
                            <option value="2">Season 2</option>
                            <option value="3">Season 3</option>
                            <option value="4">Season 4</option>
                        </select>
                    </div>
                </div>
                <h5>Total Episodes: {responseData.length}</h5>
                <div className="row">
                    {
                        responseData.map((x, i) => {
                            return <div className="col-md-3 mt-sm-3" key={x.episode_id}>
                                <Episode item={x} key={i} />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Episodes;