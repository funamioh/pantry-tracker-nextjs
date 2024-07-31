import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/material/Box";

const items = ["tomato", "potato", "cabbage"];

export default function Home() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack width="800px" height="600px" spacing={2}>
        {items.map((i) => (
          <Box
            key={i}
            width="100%"
            height="100px"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={"#f0f0f0"}
          >
            <Typography variant={'h4'} color={'#333'} textAlign={'center'} fontWeight={'bold'}></Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
