import Typography from "@mui/material/Typography/Typography";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import * as React from "react";
import { useFormik } from "formik";
import {
  initialValuesQuantityOffer,
  validationSchemaQuantityOffer,
} from "../../../main-features/offer/components/details-offer/validation/initial-values-add-comment-offer";

const initialValues = initialValuesQuantityOffer;

export function InputQuantity({
  parentCallChangeQuantity,
  defaultValue,
}: {
  parentCallChangeQuantity: (formik: any) => void;
  defaultValue?: number | null | undefined;
}) {
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaQuantityOffer,
    onSubmit: (values) => {
      console.log("onSubmit ", values);
    },
  });

  React.useEffect(() => {
    if (defaultValue) {
      formik.setFieldValue("quantity", defaultValue);
    }
  }, [defaultValue]);

  const changeQuantity = (event: any, type: string) => {
    event.stopPropagation();
    if (type === "+" && formik.values.quantity < 100) {
      formik.setFieldValue("quantity", formik.values.quantity + 1);
      parentCallChangeQuantity(formik.values.quantity + 1);
    } else if (formik.values.quantity > 1) {
      formik.setFieldValue("quantity", formik.values.quantity - 1);
      parentCallChangeQuantity(formik.values.quantity - 1);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" display="flex">
        <ShortcutIcon fontSize="small" sx={{ mr: 0.9 }} />
        Quantité
      </Typography>
      <Paper
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 150 }}
      >
        <IconButton
          sx={{ p: "10px" }}
          aria-label="menu"
          onClick={(event: any) => changeQuantity(event, "-")}
        >
          <RemoveIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="1"
          inputProps={{ "aria-label": "1" }}
          type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
        />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={(event: any) => changeQuantity(event, "+")}
        >
          <AddIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
