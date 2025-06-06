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
import { Product } from "@/app/types/product";

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: number;
  image: Product["image"];
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function ProductCard({
  title,
  subtitle,
  price,
  image,
  quantity,
  onAdd,
  onRemove,
}: ProductCardProps) {
  const getImagePath = (path: string) => path.replace("./assets", "/assets");

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
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet={getImagePath(image.desktop)}
          />
          <source
            media="(min-width: 600px)"
            srcSet={getImagePath(image.tablet)}
          />
          <img
            src={getImagePath(image.mobile)}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </picture>

        {quantity === 0 ? (
          <Button
            variant="outlined"
            startIcon={<AddShoppingCartIcon />}
            onClick={onAdd}
            sx={{
              position: "absolute",
              bottom: -20,
              left: "50%",
              transform: "translateX(-50%)",
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
            }}
          >
            Add to Cart
          </Button>
        ) : (
          <Box
            sx={{
              position: "absolute",
              bottom: -20,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 999,
              px: 1.5,
              height: 36,
              backgroundColor: "hsl(14, 86%, 42%)",
            }}
          >
            <IconButton onClick={onRemove} sx={{ color: "#fff", p: 0.5, mr: 1 }}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography color="#fff" fontWeight={500} fontSize={14}>
              {quantity}
            </Typography>
            <IconButton onClick={onAdd} sx={{ color: "#fff", p: 0.5, ml: 1 }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          p: 1.5,
          pt: 3,    
        }}
      >
        <Stack spacing={0.25}>
          <Typography color="hsl(12, 20%, 44%)" sx={{ fontSize: 12 }}>
            {subtitle}
          </Typography>
          <Typography fontWeight={700} sx={{ fontSize: 14 }}>
            {title}
          </Typography>
          <Typography color="hsl(14, 86%, 42%)">
            ${price.toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
