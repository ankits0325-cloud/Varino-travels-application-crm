import React, { useContext, useState } from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CRMContext from '../context/CRMContext';

const QuotationBuilder = () => {
  const { TEMPLATES, SAMPLE_HOTELS, EXTRA_FEATURES, calculateQuotationPrice, dispatch } =
    useContext(CRMContext);

  const [activeStep, setActiveStep] = useState(0);
  const [quotation, setQuotation] = useState({
    templateId: null,
    client: '',
    nights: 3,
    rooms: [],
    features: [],
    discount: 0,
    discountType: 'amount',
  });
  const [showRoomDialog, setShowRoomDialog] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomType, setRoomType] = useState('double');
  const [roomQuantity, setRoomQuantity] = useState(1);

  const steps = ['Select Template', 'Choose Hotels & Rooms', 'Extra Features & Pricing'];

  const handleNext = () => {
    if (activeStep === 0 && !quotation.templateId) {
      alert('Please select a template');
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleTemplateSelect = (templateId) => {
    setQuotation({ ...quotation, templateId });
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowRoomDialog(true);
  };

  const handleAddRoom = () => {
    if (!selectedHotel) return;

    const newRoom = {
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      roomType,
      quantity: roomQuantity,
      nights: quotation.nights,
    };

    setQuotation({
      ...quotation,
      rooms: [...quotation.rooms, newRoom],
    });

    setShowRoomDialog(false);
    setSelectedHotel(null);
    setRoomType('double');
    setRoomQuantity(1);
  };

  const handleToggleFeature = (feature) => {
    const newFeatures = quotation.features.includes(feature)
      ? quotation.features.filter((f) => f !== feature)
      : [...quotation.features, feature];

    setQuotation({ ...quotation, features: newFeatures });
  };

  const handleRemoveRoom = (index) => {
    setQuotation({
      ...quotation,
      rooms: quotation.rooms.filter((_, i) => i !== index),
    });
  };

  const pricing = calculateQuotationPrice(quotation);

  const handleSaveQuotation = () => {
    if (!quotation.client) {
      alert('Please enter client name');
      return;
    }

    const newQuotation = {
      ...quotation,
      pricing,
      createdAt: new Date(),
      status: 'Pending',
    };

    dispatch({
      type: 'ADD_QUOTATION',
      payload: newQuotation,
    });

    alert('Quotation saved successfully!');
    // Reset form
    setQuotation({
      templateId: null,
      client: '',
      nights: 3,
      rooms: [],
      features: [],
      discount: 0,
      discountType: 'amount',
    });
    setActiveStep(0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        📋 Quotation Builder
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 1: Template Selection */}
      {activeStep === 0 && (
        <Box>
          <TextField
            fullWidth
            label="Client Name"
            value={quotation.client}
            onChange={(e) => setQuotation({ ...quotation, client: e.target.value })}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Select a Package Template:
          </Typography>

          <Grid container spacing={3}>
            {TEMPLATES.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card
                  onClick={() => handleTemplateSelect(template.id)}
                  sx={{
                    cursor: 'pointer',
                    border: quotation.templateId === template.id ? '3px solid #667eea' : 'none',
                    boxShadow: quotation.templateId === template.id ? '0 4px 20px rgba(102, 126, 234, 0.3)' : 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{template.name}</Typography>
                    <Typography variant="h5" sx={{ color: '#667eea', mt: 2 }}>
                      ${template.basePrice}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Step 2: Hotel & Room Selection */}
      {activeStep === 1 && (
        <Box>
          <TextField
            label="Number of Nights"
            type="number"
            value={quotation.nights}
            onChange={(e) => setQuotation({ ...quotation, nights: parseInt(e.target.value) })}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Available Hotels:
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {SAMPLE_HOTELS.map((hotel) => (
              <Grid item xs={12} sm={6} md={4} key={hotel.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{hotel.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {hotel.city}, {hotel.country}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      ⭐ {hotel.rating}
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                      {hotel.amenities.join(', ')}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleSelectHotel(hotel)}
                    >
                      Select Room
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Selected Rooms */}
          {quotation.rooms.length > 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Selected Rooms:
              </Typography>
              {quotation.rooms.map((room, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>
                    {room.hotelName} - {room.roomType} x {room.quantity} ({room.nights} nights)
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveRoom(index)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Paper>
          )}
        </Box>
      )}

      {/* Step 3: Extra Features & Pricing */}
      {activeStep === 2 && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Extra Features:
            </Typography>
            {EXTRA_FEATURES.map((feature) => (
              <FormControlLabel
                key={feature.name}
                control={
                  <Checkbox
                    checked={quotation.features.includes(feature.name)}
                    onChange={() => handleToggleFeature(feature.name)}
                  />
                }
                label={`${feature.name} - $${feature.price}`}
              />
            ))}
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Apply Discount:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Discount"
                  value={quotation.discount}
                  onChange={(e) =>
                    setQuotation({ ...quotation, discount: parseFloat(e.target.value) || 0 })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Type"
                  value={quotation.discountType}
                  onChange={(e) =>
                    setQuotation({ ...quotation, discountType: e.target.value })
                  }
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="amount">Fixed Amount</option>
                  <option value="percentage">Percentage</option>
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* Pricing Summary */}
          <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>Subtotal: ${pricing.subtotal.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Tax (10%): ${pricing.tax.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Total: ${pricing.total.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveQuotation}
          >
            Save Quotation
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>

      {/* Room Selection Dialog */}
      <Dialog open={showRoomDialog} onClose={() => setShowRoomDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Select Room Type</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            select
            label="Room Type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            SelectProps={{ native: true }}
            sx={{ mb: 2 }}
          >
            {selectedHotel &&
              Object.keys(selectedHotel.rooms).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)} - $
                  {selectedHotel.rooms[type].price}
                </option>
              ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={roomQuantity}
            onChange={(e) => setRoomQuantity(parseInt(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRoomDialog(false)}>Cancel</Button>
          <Button onClick={handleAddRoom} variant="contained" color="primary">
            Add Room
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuotationBuilder;
