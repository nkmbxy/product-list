"use client";
import ProductCard from "@/app/components/ProductCard";
import products from "@/app/data.json";
import { Product } from "@/app/types/product";
import { Grid, Typography, Box, Container } from "@mui/material";
import CartCard from "./components/CartCard";
import { useState } from "react";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        { name: product.name, quantity: 1, price: product.price },
      ];
    });
  };

  const handleDecrease = (product: Product) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const renderProduct = (product: Product, index: number) => {
    const item = cart.find((c) => c.name === product.name);
    const quantity = item?.quantity || 0;
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
        <ProductCard
          title={product.name}
          subtitle={product.category}
          price={product.price}
          image={product.image}
          quantity={quantity}
          onAdd={() => handleAddToCart(product)}
          onRemove={() => handleDecrease(product)}
        />
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "hsl(20, 50%, 98%)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Desserts
            </Typography>

            <Grid container spacing={3}>
              {(products as Product[]).map(renderProduct)}
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CartCard items={cart} onRemove={handleRemove} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
