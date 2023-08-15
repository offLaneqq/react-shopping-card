import { Button } from '@material-ui/core'
// Types
import { CardItemType } from "../App";
// Styles
import { Wrapper } from "./Item.styles";

type Props = {
    item: CardItemType;
    handleAddToCard: (clickedItem: CardItemType) => void
}

const Item: React.FC<Props> = ({ handleAddToCard, item }) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCard(item)}>Add to card</Button>
    </Wrapper>
)

export default Item