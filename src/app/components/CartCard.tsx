"use client";
import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import OrderSummaryModal from "./OrderSummaryModal";
import { useState } from "react";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface CartCardProps {
  items: CartItem[];
  onRemove: (name: string) => void;
}

export default function CartCard({ items, onRemove }: CartCardProps) {
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    setOpen(false);
  };

  const renderEmptyState = () => (
    <Box textAlign="center">
      <Image
        src="/assets/images/illustration-empty-cart.svg"
        alt="Empty cart illustration"
        width={140}
        height={140}
        style={{ margin: "0 auto" }}
      />
      <Typography color="text.secondary" mt={2}>
        Your added items will appear here
      </Typography>
    </Box>
  );

  const renderCartItem = (item: CartItem) => (
    <Box
      key={item.name}
      sx={{
        position: "relative",
        borderBottom: "1px solid #eee",
        pb: 1,
        pr: 5,
      }}
    >
      <IconButton
        aria-label={`Remove ${item.name}`}
        onClick={() => onRemove(item.name)}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "hsl(12, 20%, 60%)",
          transition: "color 0.2s ease",
          "&:hover": {
            color: "#000",
            backgroundColor: "transparent",
          },
        }}
      >
        <HighlightOffIcon fontSize="small" />
      </IconButton>

      <Typography fontWeight={600}>{item.name}</Typography>

      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5,  pr: 5 }}>
        <Typography
          fontSize={14}
          fontWeight={600}
          color="hsl(14, 86%, 42%)"
          mr={1}
        >
          {item.quantity}x
        </Typography>
        <Typography fontSize={14} color="hsl(12, 20%, 60%)">
          @ ${item.price.toFixed(2)}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={500}
          color="hsl(12, 20%, 60%)"
          sx={{ ml: 2 }}
        >
          <strong>${(item.quantity * item.price).toFixed(2)}</strong>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: 1,
        p: 3,
        width: "100%",
        maxWidth: isMobile ? "100%" : 400,
        marginTop: isMobile ? 4 : 0,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        color="hsl(14, 86%, 42%)"
        gutterBottom
      >
        Your Cart ({totalQty})
      </Typography>

      {items.length === 0 ? (
        renderEmptyState()
      ) : (
        <Stack spacing={2}>
          {items.map(renderCartItem)}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight={500}>Order Total:</Typography>
            <Typography
              fontWeight={700}
              fontSize={20}
              color="hsl(14, 65%, 15%)"
            >
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "black",
              gap: 1,
              backgroundColor: "hsl(13, 31%, 94%)",
              p: 1,
              borderRadius: 2,
            }}
          >
            <Image
              src="/assets/images/icon-carbon-neutral.svg"
              alt="carbon neutral icon"
              width={20}
              height={20}
            />
            This is a <strong>carbon-neutral</strong> delivery
          </Box>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            fullWidth
            sx={{
              borderRadius: 999,
              mt: 1,
              backgroundColor: "hsl(14, 86%, 42%)",
              "&:hover": {
                backgroundColor: "hsl(14, 76%, 35%)",
              },
            }}
          >
            Confirm Order
          </Button>
        </Stack>
      )}

      <OrderSummaryModal
        open={open}
        onClose={() => setOpen(false)}
        onReset={handleReset}
        items={items}
        total={totalPrice}
      />
    </Box>
  );
}
