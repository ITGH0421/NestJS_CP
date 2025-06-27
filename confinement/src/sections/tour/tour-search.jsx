import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useDebounce } from 'minimal-shared/hooks';
import { useState, useEffect, useCallback } from 'react';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link, { linkClasses } from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses, createFilterOptions } from '@mui/material/Autocomplete';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { _tours } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export function TourSearch({ redirectPath, sx }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const debouncedQuery = useDebounce(searchQuery);
  const { searchResults: options, searchLoading: loading } = useSearchData(debouncedQuery);

  const handleChange = useCallback(
    (item) => {
      setSelectedItem(item);
      if (item) {
        router.push(redirectPath(item.id));
      }
    },
    [router, redirectPath]
  );

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => `${option.name} ${option.destination}`,
  });

  const paperStyles = {
    width: 320,
    [` .${autocompleteClasses.listbox}`]: {
      [` .${autocompleteClasses.option}`]: {
        p: 0,
        [` .${linkClasses.root}`]: {
          p: 0.75,
          gap: 1.5,
          width: 1,
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  };

  return (
    <Autocomplete
      autoHighlight
      popupIcon={null}
      loading={loading}
      options={options}
      value={selectedItem}
      filterOptions={filterOptions}
      onChange={(event, newValue) => handleChange(newValue)}
      onInputChange={(event, newValue) => setSearchQuery(newValue)}
      getOptionLabel={(option) => option.name}
      noOptionsText={<SearchNotFound query={debouncedQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{ paper: { sx: paperStyles } }}
      sx={[{ width: { xs: 1, sm: 260 } }, ...(Array.isArray(sx) ? sx : [sx])]}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? <Iconify icon="svg-spinners:8-dots-rotate" sx={{ mr: -3 }} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={(props, tour, { inputValue }) => {
        const matches = match(tour.name, inputValue);
        const parts = parse(tour.name, matches);

        return (
          <li {...props} key={tour.id}>
            <Link
              component={RouterLink}
              href={redirectPath(tour.id)}
              color="inherit"
              underline="none"
            >
              <Avatar
                key={tour.id}
                alt={tour.name}
                src={tour.images[0]}
                variant="rounded"
                sx={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  borderRadius: 1,
                }}
              />

              <div key={inputValue}>
                {parts.map((part, index) => (
                  <Typography
                    key={index}
                    component="span"
                    color={part.highlight ? 'primary' : 'textPrimary'}
                    sx={{
                      typography: 'body2',
                      fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                    }}
                  >
                    {part.text}
                  </Typography>
                ))}
              </div>
            </Link>
          </li>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

function useSearchData(searchQuery) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchSearchResults = useCallback(async () => {
    setSearchLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const results = _tours.filter(({ name, destination }) =>
        [name, destination].some((field) =>
          field?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [fetchSearchResults, searchQuery]);

  return { searchResults, searchLoading };
}
