import { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import { getService } from './api';

const Testy = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getService();
                if (response.length > 0) {
                    setData(response[0]); // 첫 번째 항목만 설정
                    console.log('this is res', response[0]);
                } else {
                    setData(null);
                    console.log('this is else');
                }
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch data:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavigationBar />
            <div>
                <h1>API Test</h1>
                {error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div>
                        {!data ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                                <strong>Name:</strong> {data.eduName} <br />
                                <strong>Day:</strong> {data.eduDay} <br />
                                <strong>Start:</strong> {data.eduStart} <br />
                                <strong>End:</strong> {data.eduEnd} <br />
                                <strong>PlacePK:</strong> {data.placePK} <br />
                                <strong>WorkerPK:</strong> {data.workerPK} <br />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Testy;
