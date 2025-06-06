"use client";
import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Image from "next/image";
import OrderSummaryModal from "./OrderSummaryModal";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from "@/stores/cartStore";

function CartCard() {
  const [open, setOpen] = useState(false);
  const items = cartStore.cart;
  const totalQty = cartStore.totalQty;
  const totalPrice = cartStore.totalPrice;

  const handleReset = () => {
    cartStore.reset();
    setOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: "#fff", borderRadius: 4, boxShadow: 1, p: 3 }}>
      <Typography variant="h6" fontWeight={700} color="hsl(14, 86%, 42%)" gutterBottom>
        Your Cart ({totalQty})
      </Typography>

      {items.length === 0 ? (
        <Box textAlign="center">
          <Image
            src="/assets/images/illustration-empty-cart.svg"
            alt="Empty cart"
            width={140}
            height={140}
            style={{ margin: "0 auto" }}
          />
          <Typography color="text.secondary" mt={2}>Your added items will appear here</Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {items.map((item) => (
            <Box key={item.name} sx={{ position: "relative", borderBottom: "1px solid #eee", pb: 1, pr: 5 }}>
              <IconButton
                onClick={() => cartStore.remove(item.name)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "hsl(12, 20%, 60%)",
                  "&:hover": { color: "#000", backgroundColor: "transparent" },
                }}
              >
                <HighlightOffIcon fontSize="small" />
              </IconButton>
              <Typography fontWeight={600}>{item.name}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <Typography fontSize={14} fontWeight={600} color="hsl(14, 86%, 42%)" mr={1}>
                  {item.quantity}x
                </Typography>
                <Typography fontSize={14} color="hsl(12, 20%, 60%)">
                  @ ${item.price.toFixed(2)}
                </Typography>
                <Typography fontSize={14} fontWeight={500} sx={{ ml: 2 }}>
                  ${(item.quantity * item.price).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight={500}>Order Total:</Typography>
            <Typography fontWeight={700} fontSize={20} color="hsl(14, 65%, 15%)">
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => setOpen(true)}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              backgroundColor: "hsl(14, 86%, 42%)",
              "&:hover": { backgroundColor: "hsl(14, 76%, 35%)" },
            }}
          >
            Confirm Order
          </Button>
        </Stack>
      )}

      <OrderSummaryModal open={open} onClose={() => setOpen(false)} onReset={handleReset} items={items} total={totalPrice} />
    </Box>
  );
}

export default observer(CartCard);
