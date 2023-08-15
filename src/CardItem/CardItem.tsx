import { Button } from "@material-ui/core";
// Types
import { CardItemType } from "../App";
// Styled 
import { Wrapper } from "./CardItem.styles";

type Props = {
    item: CardItemType;
    addToCard: (clickedItem: CardItemType) => void;
    removeFromCard: (id: number) => void;
}

const CardItem: React.FC<Props> = ({ item, addToCard, removeFromCard }) => <div>
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className="information">
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => removeFromCard(item.id)}
                >
                    -
                </Button>
                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => addToCard(item)}
                >
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Wrapper>
</div>

export default CardItem;