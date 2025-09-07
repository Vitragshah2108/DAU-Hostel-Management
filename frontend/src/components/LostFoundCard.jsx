import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/**
 * LostFoundCard
 * Displays lost/found item details and allows claiming if not returned.
 * @param {string} title
 * @param {string} description
 * @param {string} photo
 * @param {string} status - e.g., 'lost' | 'found' | 'claimed' | 'returned'
 * @param {Function} onClaim
 */
const LostFoundCard = ({ title = '', description = '', photo = '', status = 'lost', onClaim }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {photo ? <CardMedia component="img" height="140" image={photo} alt={title} /> : null}
      <CardContent>
        <Typography gutterBottom variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Typography variant="caption" color="text.secondary">Status: {status}</Typography>
      </CardContent>
      {status !== 'returned' && onClaim ? (
        <Button onClick={onClaim} variant="contained" size="small" sx={{ m: 1 }}>Claim</Button>
      ) : null}
    </Card>
  );
};

export default LostFoundCard;


