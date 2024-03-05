import { useContext } from "react";
import { MainLayout, MiddleLayout } from "../../Layout"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { NewApuContext } from "../../context/NewApuContext";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export const AdminNewApu = () => {

  const { newApu } = useContext(NewApuContext)

  console.log(newApu);

  return (
    <MainLayout>
      <MiddleLayout>
        <div className="bg-vivvi text-white font-medium font-roboto grid grid-cols-12 p-2 rounded-md w-11/12">
          <div className='col-span-2'><p>Tipo</p></div>
          <div className='col-span-1'><p>Código</p></div>
          <div className='col-span-2'><p>Nombre</p></div>
          <div className='col-span-1'><p>Unidad</p></div>
          <div className='col-span-1'><p>Rendimiento</p></div>
          <div className='col-span-2'><p>% Desperdicio</p></div>
          <div className='col-span-2'><p>Valor comerical</p></div>
          <div className='col-span-1'><p>Valor total</p></div>
        </div>
        <div className="bg-white rounded-md p-2 w-11/12 mt-4  ">
          <div className="grid grid-cols-12 gap-2">
            <Box sx={{ gridColumn: "span 2 / span 2" }}>
              <FormControl fullWidth>
                <InputLabel id="reference" >Referencia</InputLabel>
                <Select id="reference" labelId="reference" label="Referencia" sx={{ minWidth: 120 }}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div className="grid grid-cols-3 col-span-3 gap-2">
              <div className="col-span-3 grid grid-cols-3 gap-2">
                <Box sx={{ gridColumn: "span 1 / span 1" }}>
                  <FormControl fullWidth>
                    <TextField id="outlined-basic" label="Código" variant="outlined" />
                  </FormControl>
                </Box>
                <Box sx={{ gridColumn: "span 2 / span 2" }}>
                  <FormControl fullWidth>
                    <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                  </FormControl>
                </Box>
              </div>
              <Box sx={{ gridColumn: "span 3 / span 3" }}>
                <Button fullWidth variant="outlined" startIcon={<AddBoxOutlinedIcon />}>Agregar referencia</Button>
              </Box>
            </div>
            <Box sx={{ gridColumn: "span 1 / span 1" }}>
              <FormControl fullWidth>
                <InputLabel id="reference" >Unidad</InputLabel>
                <Select id="reference" labelId="reference" label="Referencia" sx={{ minWidth: 120 }}>
                  <MenuItem value={"m2"}>m2</MenuItem>
                  <MenuItem value={"ml"}>ml</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: "span 1 / span 1" }}>
              <FormControl fullWidth>
                <TextField id="outlined-basic" label="%" variant="outlined" />
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: "span 2 / span 2" }}>
              <FormControl fullWidth>
                <TextField id="outlined-basic" label="%" variant="outlined" />
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: "span 2 / span 2" }}>
              <FormControl fullWidth>
                <TextField id="outlined-basic" label="$" variant="outlined" />
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: "span 1 / span 1" }}>
              <FormControl fullWidth>
                <TextField id="outlined-basic" label="$" variant="outlined" />
              </FormControl>
            </Box>
          </div>
          <Box>
            <Button fullWidth variant="outlined" startIcon={<AddBoxOutlinedIcon />}>Agregar referencia</Button>
          </Box>

        </div>
      </MiddleLayout>
    </MainLayout>
  )
}
