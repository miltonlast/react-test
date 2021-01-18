import axios from 'axios-observable';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { filter } from 'rxjs/operators';
import { ICharacter } from '../interfaces/ICharacter';
import Character from './Character';
import Death from './Death';

const styles = {
    borderRight: '1px solid #d0d0d0',
    paddingRight: '20px'
};

const Home: React.FC = (): JSX.Element => {
    const [loaded, setIsLoaded] = useState(false);
    const [responseData, setResponseData] = useState<Array<ICharacter>>([]);
    const handleSort = (sortBy: string): void => {
        switch (sortBy) {
            case 'name':
                const name = sanizateObject(responseData.sort((a, b) => (a.name > b.name) ? 1 : -1));
                setResponseData([...name, ...name]);
                break;
            case 'birthday':
                const birthday = sanizateObject(responseData.sort((a, b) => (new Date(a.birthday) > new Date(b.birthday)) ? 1 : -1));
                setResponseData([...birthday, ...birthday]);
                break;
            case 'portrayed':
                const portrayed = sanizateObject(responseData.sort((a, b) => (a.portrayed > b.portrayed) ? 1 : -1));
                setResponseData([...portrayed, ...portrayed]);
                break;
        }
    }
    const sanizateObject = (data: Array<ICharacter>): Array<ICharacter> => {
        return data.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.char_id === thing.char_id
            ))
        );
    }

    useEffect(() => {
        fetchCharacters(0);
    }, []);


    const fetchCharacters = (count: number) => {
        axios.get<Array<ICharacter>>('https://www.breakingbadapi.com/api/characters', {
            params: {
                limit: 6,
                offset: count
            }
        }).pipe(
            filter(x => !!x)
        ).subscribe(response => {
            setResponseData([...responseData, ...response.data]);
            setIsLoaded(true);
        });
    }

    return (
        <div className="row col-md-12">
            <div className="col-md-8" style={styles}>
                <div className="container my-lg-5">
                    <h5 className="jumbotron-heading">SORT BY</h5>
                    <div className="btn-group">
                        <button type="button" onClick={() => handleSort('name')} className="btn btn-dark">Name</button>
                        <button type="button" onClick={() => handleSort('birthday')} className="btn btn-dark">Birthday</button>
                        <button type="button" onClick={() => handleSort('portrayed')} className="btn btn-dark">Portrayer</button>
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={responseData.length}
                    next={() => fetchCharacters(responseData.length + 6)}
                    hasMore={true}
                    loader="loading..."
                    className="col-md-12"
                >
                    <div className="row">
                        {
                            loaded
                                ? responseData.map((x, i) => (
                                    <div className="col-md-4 mt-sm-3" key={i}>
                                        <Character item={x} />
                                    </div>
                                ))
                                : ''
                        }
                    </div>
                </InfiniteScroll>
            </div>
            <div className="col-md-4">
                <Death />
            </div>
        </div>
    )
}

export default Home;