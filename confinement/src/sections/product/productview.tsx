'use client';

import {
    Box,
    Typography,
    CardMedia,
    TextField,
    Button,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    useMediaQuery,
    Checkbox,
    FormGroup,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { handleAddToCart } from '@/components/cart/handleAddToCart';
import { useRouter } from 'next/navigation';
import addON from '@/data/addon.json';


type Product = {
    product_id: number;
    image: string;
    name: string;
    price: number;
};


export default function ProductDetailPage({ products }: { products: Product[] }) {
    const { productid } = useParams();
    const productId = parseInt(productid as string);
    const product = useMemo(() => products.find((p) => p.product_id === productId), [productId]);
    const isMobile = useMediaQuery('(max-width:600px)');

    const [startOption, setStartOption] = useState('');
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [lunchOrDinner, setLunchOrDinner] = useState('Lunch');
    const [specialRequest, setSpecialRequest] = useState('');
    const [riceOption, setRiceOption] = useState('');
    const [notes, setNotes] = useState('');

    const [addOnTrotterChecked, setAddOnTrotterChecked] = useState(false);
    const [addOnTrotterValue, setAddOnTrotterValue] = useState('');
    const [addOnFishChecked, setAddOnFishChecked] = useState(false);
    const [addOnFishValue, setAddOnFishValue] = useState('');
    const [addOnBirdnestChecked, setAddOnBirdnestChecked] = useState(false);
    const [addOnBirdnestValue, setAddOnBirdnestValue] = useState('');
    const router = useRouter();

    const handleClickAddToCart = () => {
        if (!startDate || !product) return;

        // Calculate total price including selected add-ons
        let totalPrice = product.price;

        if (addOnTrotterChecked && addOnTrotterValue) {
            const trotter = addON.find(a => a.type === 'addOn' && String(a.addon_id) === addOnTrotterValue);
            totalPrice += trotter ? trotter.price : 0;
        }
        if (addOnFishChecked && addOnFishValue) {
            const fish = addON.find(a => a.type === 'addOn' && String(a.addon_id) === addOnFishValue);
            totalPrice += fish ? fish.price : 0;
        }
        if (addOnBirdnestChecked && addOnBirdnestValue) {
            const birdnest = addON.find(a => a.type === 'addOn' && String(a.addon_id) === addOnBirdnestValue);
            totalPrice += birdnest ? birdnest.price : 0;
        }

        handleAddToCart({
            productId: product.product_id,
            name: product.name,
            price: product.price,
            totalprice: totalPrice,
            quantity: 1,
            startDate: startDate.format('YYYY-MM-DD'),
            lunchOrDinner,
            startOption,
            riceOption,
            specialRequest,
            notes,
            addOns: {
            porkTrotter: addOnTrotterChecked ? addOnTrotterValue : null,
            fishSoup: addOnFishChecked ? addOnFishValue : null,
            birdNest: addOnBirdnestChecked ? addOnBirdnestValue : null,
            },
            discountAmount: 0, // Assuming no discount for simplicity
        });

        router.push('/cart')
    };

    if (!product) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h6" color="error">
                    Product not found.
                </Typography>
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    px: 4,
                    py: 6,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 4,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <CardMedia
                        component="img"
                        image={`${product.image}`}
                        alt={product.name}
                        sx={{ borderRadius: 2, maxWidth: '100%' }}
                    />
                </Box>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" fontWeight="bold" color="#f27b96">
                        {product.name}
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 1 }}>
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }} color="text.secondary">
                        Charges includes GST.
                    </Typography>

                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                        <FormLabel sx={{ color: '#f27b96', fontWeight: 'bold' }}>
                            Meal Start From <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <RadioGroup
                            value={lunchOrDinner}
                            onChange={(e) => setLunchOrDinner(e.target.value)}
                        >
                            <FormControlLabel value="Lunch" control={<Radio />} label="Lunch" />
                            <FormControlLabel value="Dinner" control={<Radio />} label="Dinner" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                        <FormLabel sx={{ color: '#f27b96', fontWeight: 'bold' }}>
                            Confirmed Start Date or E.D.D <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <RadioGroup
                            onChange={(e) => setStartOption(e.target.value)}
                        >
                            <FormControlLabel value="Confirmed" control={<Radio />} label="Confirmed Start Date" />
                            <FormControlLabel value="EDD" control={<Radio />} label="E.D.D" />
                        </RadioGroup>
                    </FormControl>


                    <DatePicker
                        label="Select Date"
                        value={startDate}
                        onChange={(newValue) => {
                            if (dayjs.isDayjs(newValue)) {
                                setStartDate(newValue);
                            } else if (newValue) {
                                setStartDate(dayjs(newValue)); // ensure fallback parsing
                            } else {
                                setStartDate(null);
                            }
                        }}

                        slotProps={{
                            textField: {
                                fullWidth: true,
                                required: true,
                                sx: {
                                    bgcolor: 'background.paper',
                                    borderRadius: 2,
                                    boxShadow: 1,
                                },
                            },
                        }}
                        disablePast
                        sx={{ width: '100%', mb: 3 }}
                    />

                    <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', color: '#f27b96' }}>
                                Change Rice Option
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={riceOption === 'redRice'}
                                            onChange={() =>
                                                setRiceOption(riceOption === 'redRice' ? '' : 'redRice')
                                            }
                                        />
                                    }
                                    label="Change White Rice to Brown Rice"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={riceOption === 'whiteRice'}
                                            onChange={() =>
                                                setRiceOption(riceOption === 'whiteRice' ? '' : 'whiteRice')
                                            }
                                        />
                                    }
                                    label="Change Brown Rice to White Rice"
                                />
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', color: '#f27b96' }}>
                                Special Request (optional)
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                {[
                                    'No Pork Innards',
                                    'No Pig Trotter',
                                    'No Hong Zhao Chicken/Fish',
                                    'No Chicken & Egg for the first 1 or 2 weeks',
                                    'No Papaya Fish Soup',
                                    'No Salmon',
                                    'No Snow/Sweet Peas',
                                    'No Sugar in Red Dates Tea',
                                    'No Weekend Deliveries'
                                ].map((label, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        control={
                                            <Checkbox
                                                checked={specialRequest.includes(label)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSpecialRequest(
                                                            specialRequest
                                                                ? `${specialRequest}, ${label}`
                                                                : label
                                                        );
                                                    } else {
                                                        setSpecialRequest(
                                                            specialRequest
                                                                .split(',')
                                                                .map((s) => s.trim())
                                                                .filter((s) => s !== label)
                                                                .join(', ')
                                                        );
                                                    }
                                                }}
                                            />
                                        }
                                        label={label}
                                    />
                                ))}
                            </FormGroup>
                            <TextField
                                fullWidth
                                label="Notes / Special Request"
                                multiline
                                minRows={3}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                sx={{ mt: 3 }}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', color: '#f27b96' }}>
                                Add Ons
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={addOnTrotterChecked}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setAddOnTrotterChecked(checked);
                                                if (!checked) setAddOnTrotterValue('');
                                            }}
                                        />
                                    }
                                    label={
                                        <Box>
                                            <Typography fontWeight={600}>Additional Pork Trotter Vinegar</Typography>

                                            <Box sx={{ pl: 2 }}>
                                                <RadioGroup
                                                    row
                                                    value={addOnTrotterValue}
                                                    onChange={(e) => setAddOnTrotterValue(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        control={<Radio disabled={!addOnTrotterChecked} />}
                                                        label="1 Serving - $12.00"
                                                    />
                                                    <FormControlLabel
                                                        value="2"
                                                        control={<Radio disabled={!addOnTrotterChecked} />}
                                                        label="3 Servings - $35.00"
                                                    />
                                                    <FormControlLabel
                                                        value="3"
                                                        control={<Radio disabled={!addOnTrotterChecked} />}
                                                        label="5 Servings - $55.00"
                                                    />
                                                </RadioGroup>
                                            </Box>
                                        </Box>
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={addOnFishChecked}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setAddOnFishChecked(checked);
                                                if (!checked) setAddOnFishValue('');
                                            }}
                                        />
                                    }
                                    label={
                                        <Box>
                                            <Typography fontWeight={600}>Milk Boosting Fish and Papaya Soup</Typography>

                                            <Box sx={{ pl: 2 }}>
                                                <RadioGroup
                                                    row
                                                    value={addOnFishValue}
                                                    onChange={(e) => setAddOnFishValue(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value="4"
                                                        control={<Radio disabled={!addOnFishChecked} />}
                                                        label="1 Serving - $7.00"
                                                    />
                                                    <FormControlLabel
                                                        value="5"
                                                        control={<Radio disabled={!addOnFishChecked} />}
                                                        label="3 Servings - $20.00"
                                                    />
                                                    <FormControlLabel
                                                        value="6"
                                                        control={<Radio disabled={!addOnFishChecked} />}
                                                        label="5 Servings - $32.00"
                                                    />
                                                </RadioGroup>
                                            </Box>
                                        </Box>
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={addOnBirdnestChecked}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setAddOnBirdnestChecked(checked);
                                                if (!checked) setAddOnBirdnestValue('');
                                            }}
                                        />
                                    }
                                    label={
                                        <Box>
                                            <Typography fontWeight={600}>Homemade Bird's Nest</Typography>

                                            <Box sx={{ pl: 2 }}>
                                                <RadioGroup
                                                    row
                                                    value={addOnBirdnestValue}
                                                    onChange={(e) => setAddOnBirdnestValue(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value="7"
                                                        control={<Radio disabled={!addOnBirdnestChecked} />}
                                                        label="1 Serving - $15.00"
                                                    />
                                                    <FormControlLabel
                                                        value="8"
                                                        control={<Radio disabled={!addOnBirdnestChecked} />}
                                                        label="3 Servings - $42.00"
                                                    />
                                                    <FormControlLabel
                                                        value="9"
                                                        control={<Radio disabled={!addOnBirdnestChecked} />}
                                                        label="5 Servings - $66.00"
                                                    />
                                                </RadioGroup>
                                            </Box>
                                        </Box>
                                    }
                                />
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <Button
                        onClick={handleClickAddToCart}
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#f27b96',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            mt: 4,
                            '&:hover': {
                                backgroundColor: '#e26782',
                            },
                        }}
                    >
                        Add to Cart
                    </Button>

                </Box>
            </Box>
        </LocalizationProvider>
    );
}
