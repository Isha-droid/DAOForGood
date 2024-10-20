import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; // Import the bullet icon
import backgroundImage from '/bg.png'; // Adjust path as necessary
import { useNavigate } from "react-router-dom";


// Create a reusable styled component for step boxes
const StepBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Flexbox to align icon and text
  alignItems: 'flex-start', // Align icon and text at the top
  marginTop: '15px',
  marginBottom: '15px',
  color: 'white', // Text color
}));

const Instructions = () => {
    const navigate=useNavigate()
  return (
    <Container 
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '40px',
          maxWidth: '800px', // Control the max width of the instructions
          maxHeight: '90vh', // Set max height to allow scrolling
          overflowY: 'auto', // Enable vertical scrolling
          backgroundColor: 'rgba(10, 25, 47, 0.8)', // Adjusted for transparency
          color: '#e0e0e0', // Light Grey for text
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: 'white', // Neon Blue
            borderBottom: '2px solid #6a1b9a', // Purple border
            paddingBottom: '10px',
            textAlign: 'center',
            fontSize: '50px', // Title size decreased
          }}
        >
          DAO For Good Application Instructions
        </Typography>
        <Typography 
          variant="body1" 
          gutterBottom 
          sx={{ fontSize: '24px' }} // Body text size decreased
        >
          Follow these 10 steps to start using the DAO blockchain application efficiently.
        </Typography>

        {/* Step 1 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 1: Install a Blockchain Wallet</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Download and install a wallet like MetaMask to manage your blockchain assets.
            </Typography>
          </Box>
        </StepBox>

        {/* Step 2 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 2: Create or Import Your Wallet</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Create a new wallet or import an existing one using your seed phrase or private key.
            </Typography>
          </Box>
        </StepBox>

        {/* Step 3 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 3: Secure Your Wallet</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Ensure your wallet's seed phrase and private keys are stored securely and offline.
            </Typography>
          </Box>
        </StepBox>

        {/* Step 4 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 4: Connect Your Wallet to the Blockchain App</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Use your wallet’s interface to connect to the blockchain application for interactions.
            </Typography>
          </Box>
        </StepBox>

        {/* Step 5 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 5: Select the Blockchain Network</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Choose the appropriate blockchain network (e.g., Ethereum, Binance Smart Chain) based on your application.
            </Typography>
          </Box>
        </StepBox>

        {/* Step 6 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 6: Add Funds to Your Wallet</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Deposit some cryptocurrency (like Ether or BNB) into your wallet for transaction fees.
            </Typography>
          </Box>
        </StepBox>

        {/* Step 7 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 7: Interact with the DApp (Decentralized App)</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Start using the DApp's features, such as swapping tokens, staking, or other blockchain interactions.
            </Typography>
          </Box>
        </StepBox>

        {/* Step 8 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 8: Monitor Your Transactions</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Use a blockchain explorer (like Etherscan) to track the status and details of your transactions.
            </Typography>
          </Box>
        </StepBox>

        {/* Step 9 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 9: Verify Smart Contracts</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Ensure that any smart contracts you interact with are verified and trustworthy.
            </Typography>
          </Box>
        </StepBox>

        {/* Step 10 */}
        <StepBox>
          <FiberManualRecordIcon sx={{ color: '#18ffff', marginRight: '10px', fontSize: "30px" }} /> {/* Bullet Icon */}
          <Box>
            <Typography variant="h5" sx={{ fontSize: '20px' }}>Step 10: Stay Updated on Blockchain Security</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Regularly update your wallet and security practices to avoid potential vulnerabilities in the blockchain space.
            </Typography>
          </Box>
        </StepBox>

        {/* Button */}
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#18ffff',
              color: '#000',
              fontSize: '18px',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#00bcd4', // Darker shade on hover
              },
            }}
            onClick={() => {
              // Add your button functionality here

              alert('Get Started with DAO for Good!');
              navigate('/web3-home'); // Redirect to /web3-home
            }}
          >
            Get Started
          </Button>
        </Box>

      </Paper>
    </Container>
  );
};

export default Instructions;
