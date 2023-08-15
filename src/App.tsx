import { useState } from 'react'
import { useQuery } from 'react-query';
// Components
import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import Item from './Item/Item';
import Card from './Card/Card';
// Styles
import { Wrapper, StyledButton } from './App.styles';
// Types
export type CardItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


const getProducts = async (): Promise<CardItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json()

const App = () => {
  const [cardOpen, setCardOpen] = useState(false)
  const [cardItems, setCardItems] = useState([] as CardItemType[])
  const { data, isLoading, error } = useQuery<CardItemType[]>('products', getProducts)

  const getTotalItems = (items: CardItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0)

  const handleAddToCard = (clickedItem: CardItemType) => {
    setCardItems(prev => {
      const isItemInCard = prev.find(item => item.id === clickedItem.id)
      if (isItemInCard) {
        return prev.map(item => (
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ))
      }
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }

  const handleRemoveFromCard = (id: number) => {
    setCardItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack
          return [...ack, { ...item, amount: item.amount - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as CardItemType[])
    ))}


if (isLoading) return <LinearProgress />
if (error) return <div>Something went wrong ...</div>

console.log(data)
return (
  <Wrapper>
    <Drawer anchor='right' open={cardOpen} onClose={() => setCardOpen(false)}>
      <Card
        cardItems={cardItems}
        addToCard={handleAddToCard}
        removeFromCard={handleRemoveFromCard}
      />
    </Drawer>
    <StyledButton onClick={() => setCardOpen(true)}>
      <Badge badgeContent={getTotalItems(cardItems)} color='error'>
        <AddShoppingCart />
      </Badge>
    </StyledButton>
    <Grid container spacing={3}>
      {data?.map(item => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCard={handleAddToCard} />
        </Grid>
      ))}
    </Grid>
  </Wrapper>
);
}

export default App;
