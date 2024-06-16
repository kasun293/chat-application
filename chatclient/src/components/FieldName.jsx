import Typography from "@mui/material/Typography";

import { Colors } from "../constants/Colors";
import { styled } from "@mui/material";

export const FieldName = styled(Typography)`
  && {
    font-size: 13px;
    color: ${Colors.formButton};
    margin: 10px 0;
  }
`;
