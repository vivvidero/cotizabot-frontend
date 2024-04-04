import { SearchOutlined } from "@mui/icons-material";
import { InputBase, styled } from "@mui/material";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from 'use-debounce';

export default function SearchAppBar({ placeholder }: { placeholder: string }) {

    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    }, 300)

    console.log(Object.fromEntries(searchParams).search);


    return (
        <Search>
            <SearchIconWrapper>
                <SearchOutlined />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
                name='search'
            />
        </Search>
    );
}


const Search = styled('div')(() => ({
    position: 'relative',
    border: '1px solid gray',
    borderRadius: 5,
    marginLeft: 0,


}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

