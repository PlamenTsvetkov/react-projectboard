import  { useEffect, useState, useRef } from 'react';
import { Table, FormControl, Container, Spinner } from 'react-bootstrap';
import * as gameService from '../../services/gamesService';
import { Game } from '../../interfaces/game.interface';
import { Link } from 'react-router-dom';

const EventMonitor = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const tableRef = useRef<HTMLTableElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        gameService.getAll().then((res: Game[]) => {
            setGames(res);
            setIsLoading(false);
        });
    }, []);

    const filteredGames = games.filter((game) =>
        Object.values(game).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    useEffect(() => {
        const table = tableRef.current;
        if (table) {
            const tableHeight = table.offsetHeight;
            const parent = table.parentNode as HTMLElement | null;
            if (parent) {
                if (tableHeight > parent.offsetHeight) {
                    parent.style.overflowY = 'auto';
                } else {
                    parent.style.overflowY = 'unset';
                }
            }
        }
    }, [filteredGames]);

    return (
        <Container>
            {isLoading ? ( // Проверяваме isLoading стойността
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Table striped bordered hover ref={tableRef}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Owner ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Max Level</th>
                                <th>Image URL</th>
                                <th>Summary</th>
                                <th>Created On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGames.map((game) => (
                                <tr key={game.id}>
                                    <td>{game.id}</td>
                                    <td>{game._ownerId}</td>
                                    <td>{game.title}</td>
                                    <td>{game.category}</td>
                                    <td>{game.maxLevel}</td>
                                    <td
                                        style={{
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {game.imageUrl}
                                    </td>
                                    <td>{game.summary}</td>
                                    <td>{game._createdOn}</td>
                                    <td>
                                        <Link to={`/games/${game.id}`}>
                                            <i className="fa fa-info-circle"></i> {/* Иконата */}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
};

export default EventMonitor;

