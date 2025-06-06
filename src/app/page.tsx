"use client";
import { Container, Typography, Grid, Box } from "@mui/material";
import products from "@/app/data.json";
import ProductCard from "@/components/ProductCard";
import CartCard from "@/components/CartCard";
import { Product } from "@/types/product";

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "hsl(20, 50%, 98%)", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Desserts
            </Typography>
            <Grid container spacing={3}>
              {(products as Product[]).map((product, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <ProductCard
                    title={product.name}
                    subtitle={product.category}
                    price={product.price}
                    image={product.image}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

           <Grid size={{ xs: 12, md: 4 }}>
            <CartCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
