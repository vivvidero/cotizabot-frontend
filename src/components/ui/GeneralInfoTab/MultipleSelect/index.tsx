
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { NewApuContext } from '../../../../context/NewApuContext';
import { translateSpace } from '../../../../helpers/translateSpace';




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
        value: "bathRoomWithoutShower"
    }
];

export default function MultipleSelectCheckmarks() {
    const { newApu, setNewApu } = React.useContext(NewApuContext)
    const [selectedNames, setSelectedNames] = React.useState<string[]>([])

    const handleChange = (event: SelectChangeEvent<typeof newApu.spaces>) => {
        const {
            target: { value },
        } = event;
        setNewApu((prevState) => {
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
                    value={newApu.spaces}
                    onChange={handleChange}
                    renderValue={() => selectedNames.join(', ')}
                    className='h-[71px]'
                    defaultValue={newApu.spaces}
                >
                    {names.map((name) => (
                        <MenuItem key={name.value} value={name.value}>
                            <Checkbox name={name.name} checked={newApu.spaces.indexOf(name.value) > -1} />
                            <ListItemText primary={name.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>


    );
}