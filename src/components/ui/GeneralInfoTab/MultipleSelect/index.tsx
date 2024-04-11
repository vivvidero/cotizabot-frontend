
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { translateSpace } from '../../../../helpers/translateSpace';
import  { ApuInfo } from '../../../../types/apus/ApuInfo';
import { EditApuInfo } from '../../../../types/apus/EditApusInfo';

const names = [
    {
        name: "Cocina",
        value: "kitchen"
    },
    {
        name: "Ropas",
        value: "clothes"
    },
    {
        name: "Habitación",
        value: "bedRoom"
    },
    {
        name: "Baño con ducha",
        value: "bathRoomWithShower"
    },
    {
        name: "Baño sin ducha",
        value: "socialBathRoomWithoutShower"
    },
    {
        name: "Estudio",
        value: "study"
    },
    {
        name: "Sala comedor",
        value: "diningRoom"
    },
    {
        name: "Hall",
        value: "hall"
    },
    {
        name: "Terraza / Patio",
        value: "terraceYard"
    },
    {
        name: "Balcón",
        value: "balcony"
    }
];

export default function MultipleSelectCheckmarks({apu, setApu} : {apu: ApuInfo | EditApuInfo, setApu: React.Dispatch<React.SetStateAction<ApuInfo | EditApuInfo>>}) {

    const [selectedNames, setSelectedNames] = React.useState<string[]>([])

    const handleChange = (event: SelectChangeEvent<typeof apu.spaces>) => {
        const {
            target: { value },
        } = event;

        setApu((prevState) => {
            return {
                ...prevState,
                spaces: typeof value === 'string' ? value.split(',') : value,
            }
        })
        const translatedSpaces = []
        for (let i = 0; i < value.length; i++) {
            translatedSpaces.push(translateSpace(value[i])) 
        }
        setSelectedNames(translatedSpaces)
    };

    

    return (
        <>
            <InputLabel id="demo-multiple-checkbox-label">Asignar a espacio o espacios</InputLabel>
            <FormControl sx={{ backgroundColor: 'white' }}>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={apu.spaces}
                    onChange={handleChange}
                    renderValue={() => selectedNames.join(', ')}
                    className='h-[71px]'
                    defaultValue={apu.spaces}
                >
                    {names.map((name) => (
                        <MenuItem key={name.value} value={name.value}>
                            <Checkbox name={name.name} checked={apu.spaces.indexOf(name.value) > -1} />
                            <ListItemText primary={name.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>


    );
}