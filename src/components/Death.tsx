import axios from 'axios-observable';
import React, { useEffect, useState } from 'react';
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { IDeath } from '../interfaces/IDeath ';

type DeatCount = {
    deathCount: number
};

const Death: React.FC = (): JSX.Element => {
    const [responseDataDeathCounter, setResponseDataDeathCounter] = useState<DeatCount>({ deathCount: 0 });
    const [responseData, setResponseData] = useState<Array<IDeath>>([]);

    useEffect(() => {
        forkJoin([
            axios.get<Array<DeatCount>>('https://www.breakingbadapi.com/api/death-count'),
            axios.get<Array<IDeath>>('https://www.breakingbadapi.com/api/deaths')
        ]).pipe(
            map(([first, second]) => {
                return { first, second };
            }),
            map(x => {
                return {
                    first: x.first.data[0],
                    second: x.second.data.filter((_, i) => (i < 5))
                }
            })
        ).subscribe(response => {
            setResponseDataDeathCounter(response.first);
            setResponseData(response.second);
        });
    }, []);

    return (
        <div className="container my-lg-5">
            <h5 className="jumbotron-heading">TOTAL DEATHS: {responseDataDeathCounter.deathCount}</h5>
            <h5 className="my-lg-5">Deaths</h5>
            <div className="row">
                {
                    responseData.map((x, i) => {
                        return <div className="col-sm-12 mt-sm-3" key={i}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{x.death}</h5>
                                    <p><b>Cause: </b>{x.cause}</p>
                                    <p><b>Cause: </b>{x.responsible}</p>
                                    <p><b>Cause: </b>{x.last_words}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
};

export default Death;