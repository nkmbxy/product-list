"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onReset: () => void;
}

export default function OrderSummaryModal({
  open,
  onClose,
  items,
  total,
  onReset,
}: OrderSummaryModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
        },
      }}
    >
      <DialogTitle>
        <Stack spacing={1}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 40, color: "hsl(159, 69%, 38%)" }}
          />
          <Typography variant="h6" component="span" fontWeight={700}>
            Order Confirmed
          </Typography>
          <Typography color="text.secondary">
            We hope you enjoy your food!
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          sx={{ backgroundColor: "hsl(13, 31%, 94%)", p: 2, borderRadius: 4 }}
        >
          {items.map((item) => (
            <Box key={item.name} display="flex" justifyContent="space-between">
              <Box>
                <Typography fontWeight={600}>{item.name}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5,  pr: 5 }}>
                <Typography
                  fontSize={13}
                  fontWeight={600}
                  color="hsl(14, 86%, 42%)"
                >
                  {item.quantity}x
                </Typography>
                <Typography fontSize={13} color="text.secondary" sx={{ ml: 2 }}>
                  @ ${item.price.toFixed(2)}
                </Typography>
                </Box>
              </Box>
              <Typography fontWeight={600}>
                ${(item.quantity * item.price).toFixed(2)}
              </Typography>
            </Box>
          ))}
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography fontWeight={500}>Order Total</Typography>
            <Typography fontWeight={700}>${total.toFixed(2)}</Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          fullWidth
          onClick={onReset}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            backgroundColor: "hsl(14, 86%, 42%)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "hsl(14, 76%, 35%)",
            },
          }}
        >
          Start New Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}
