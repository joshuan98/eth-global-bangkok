# DocuEarn

### Overview
**DocuEarn** is a platform designed to address the issue of individuals’ data being used in AI models without fair compensation. Through DocuEarn, users can securely submit their data to researchers training AI models and get paid in return. By leveraging **zero-knowledge proofs**, we ensure the authenticity and privacy of the data. Additionally, **attestations** enhance the trustworthiness of submitted data, improving the quality of AI training datasets while fairly rewarding contributors.

---

## Features

- **Seamless Onboarding**: Users register and log in via an email-based system, eliminating blockchain complexities.
- **Data Privacy and Authenticity**: Uses **Privado ID** to generate zero-knowledge proofs, ensuring data validity and user privacy.
- **Attestation Mechanism**: Implements **Sign Protocol** to create attestations for submitted data, enhancing trustworthiness for researchers.
- **Transparent and Secure Payments**: Smart contracts on the **Polygon Amoy Testnet** handle all fund transfers securely and transparently.
- **Account Abstraction**: Through **Web3Auth**, users can manage funds, generate proofs, and interact with blockchain-backed features seamlessly.
- **User-Friendly Payments**: Payments in **USDC** are automatically converted to USD and deposited into users’ bank accounts.
- **Personalized Profiles**: Features vibrant **NounsDAO artwork** for unique and engaging user profile customization.

---

## Tech Stack

### Frontend
- **TypeScript**
- **React**
- **Vite**

### Backend | Blockchain
- **Privado ID**: For cryptographic credentials and zero-knowledge proof generation.
- **Sign Protocol**: For attestations and data trust verification.
- **Polygon Amoy Testnet**: For deploying smart contracts.
- **Solidity**
- **Hardhat**
- **Web3Auth**


---

## How It Works

1. **User Onboarding**: 
   - Users sign up with an email, simplifying the login process and abstracting blockchain details.

2. **Data Submission**:
   - Users provide their data, which is validated through **Privado ID** using zero-knowledge proofs to ensure authenticity and privacy.

3. **Data Attestation**:
   - **Sign Protocol** creates attestations for submitted data, providing researchers with confidence in its trustworthiness.

4. **Payments**:
   - Researchers pay for data through smart contracts on the **Polygon Amoy Testnet**.
   - Payments in **USDC** are automatically converted to USD and sent directly to users’ bank accounts.


