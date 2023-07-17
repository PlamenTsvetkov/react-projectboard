import { useParams,  useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import * as gameService from '../../services/gamesService';
import { Game } from '../../interfaces/game.interface';
import { RouteParams } from "../../interfaces/routeParams.interface";
import { Table, Container } from 'react-bootstrap';

const Details = () => {
    const { gameId } = useParams<RouteParams>();

    let [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        gameService.getOne(gameId)
            .then((res: Game) => setGame(res));
    }, [gameId]);
    return (
        <Container>
        <Table striped bordered>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{game?.id}</td>
            </tr>
            <tr>
              <td>Owner ID</td>
              <td>{game?._ownerId}</td>
            </tr>
            <tr>
              <td>Title</td>
              <td>{game?.title}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{game?.category}</td>
            </tr>
            <tr>
              <td>Max Level</td>
              <td>{game?.maxLevel}</td>
            </tr>
            <tr>
              <td>Image URL</td>
              <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {game?.imageUrl}
              </td>
            </tr>
            <tr>
              <td>Summary</td>
              <td>{game?.summary}</td>
            </tr>
            <tr>
              <td>Created On</td>
              <td>{game?._createdOn}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    )
}
export default Details;