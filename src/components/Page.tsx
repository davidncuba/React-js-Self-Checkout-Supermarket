import { Box } from "@mui/material";
import { forwardRef, ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface Props {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = "", meta, ...other }, ref) => (
    <>
      <Helmet>
        <title>{`${title} | Checkout`}</title>
        {meta}
      </Helmet>
      <Box
        ref={ref}
        {...other}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#f2f6fc",
        }}
      >
        {children}
      </Box>
    </>
  )
);

export default Page;
