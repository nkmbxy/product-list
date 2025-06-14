"use client";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Box,
  Button,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product } from "@/types/product";
import { observer } from "mobx-react-lite";
import { cartStore } from "@/stores/cartStore";

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: number;
  image: Product["image"];
}

const ProductCard = ({
  title,
  subtitle,
  price,
  image,
}: ProductCardProps) => {
  const getImagePath = (path: string) => path.replace("./assets", "/assets");
  const quantity = cartStore.cart.find((item) => item.name === title)?.quantity || 0;

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        width: "100%",
        maxWidth: 250,
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Box sx={{ position: "relative", width: "100%", height: 200 }}>
        {quantity > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "2px solid hsl(14, 86%, 42%)",
              borderRadius: 4,
              boxSizing: "border-box",
              zIndex: 1,
            }}
          />
        )}
        <picture>
          <source media="(min-width: 1024px)" srcSet={getImagePath(image.desktop)} />
          <source media="(min-width: 600px)" srcSet={getImagePath(image.tablet)} />
          <img
            src={getImagePath(image.mobile)}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
        </picture>

        {quantity === 0 ? (
          <Button
            variant="outlined"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => cartStore.addToCart({ name: title, price })}
            sx={{
              position: "absolute",
              bottom: -15,
              left: "50%",
              transform: "translateX(-50%)",
              textTransform: "none",
              borderRadius: 999,
              color: "hsl(14, 86%, 42%)",
              borderColor: "hsl(14, 86%, 42%)",
              backgroundColor: "white",
              px: 0,
              width: "70%",
              fontSize: 13,
              minHeight: 32,
              "&:hover": {
                backgroundColor: "hsl(14, 86%, 42%)",
                color: "#fff",
              },
              zIndex: 2,
            }}
          >
            Add to Cart
          </Button>
        ) : (
          <Box
            sx={{
              position: "absolute",
              bottom: -15,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 999,
              px: 1.5,
              height: 36,
              zIndex: 3,
              backgroundColor: "hsl(14, 86%, 42%)",
            }}
          >
            <IconButton onClick={() => cartStore.decrease(title)} sx={{ color: "#fff", p: 0.5, mr: 1 }}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography color="#fff" fontWeight={500} fontSize={14}>
              {quantity}
            </Typography>
            <IconButton onClick={() => cartStore.addToCart({ name: title, price })} sx={{ color: "#fff", p: 0.5, ml: 1 }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 1.5, pt: 3 }}>
        <Stack spacing={0.25}>
          <Typography color="hsl(12, 20%, 44%)" sx={{ fontSize: 12 }}>
            {subtitle}
          </Typography>
          <Typography fontWeight={700} sx={{ fontSize: 14 }}>
            {title}
          </Typography>
          <Typography color="hsl(14, 86%, 42%)">${price.toFixed(2)}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default observer(ProductCard);
