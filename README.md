# **RaiseIN**
App live at: raisein.vercel.app

A full-stack crowdfunding platform built to explore how real applications handle **authentication, payments, ownership permissions, and API security**.

This project focuses not just on UI, but also on **backend concerns like rate limiting, magic-link authentication, and secure resource ownership**.

---

## **📸 Screenshots**

### **Landing Page**

<img width="927" height="496" alt="Screenshot 2026-03-04 103657" src="https://github.com/user-attachments/assets/4e90acbb-5f40-4184-8beb-1f7632e583a4" />


---

### **Campaign Page**

<img width="924" height="493" alt="Screenshot 2026-03-04 103843" src="https://github.com/user-attachments/assets/65da4074-1072-43c7-ab63-b200870820ef" />


---

### **Creator Dashboard**


<img width="931" height="494" alt="Screenshot 2026-03-04 103747" src="https://github.com/user-attachments/assets/5c1a434e-75d1-4494-9924-58f0c8b3a51c" />


---

## **🚀 Features**

### **Authentication**
- OAuth login with **Google and GitHub**
- **Passwordless magic-link authentication**
- Email delivery powered by **Resend API**

### **Campaign Management**
- Create fundraising campaigns
- Upload campaign images
- Ownership-based permissions
- Only campaign creators can modify or delete their campaigns

### **Donations**
- Donation tracking system
- Campaign progress tracking
- Payment flow integration (**Razorpay – under development**)

### **Dashboard**
- Creator dashboard
- Manage campaigns created by the logged-in user

### **Security & Backend Considerations**
- **API rate limiting** to prevent abuse
- Ownership-based authorization
- Structured API routes
- Server-side validation

### **Search & Discovery**
- Search campaigns
- Filter campaigns

---

## **🛠 Tech Stack**

### **Frontend**
- **Next.js (App Router)**
- React
- Tailwind CSS

### **Backend**
- Next.js API Routes
- NextAuth.js
- JWT-based sessions

### **Database**
- **MongoDB Atlas**

### **External Services**
- **Resend API** – email delivery for magic-link login
- **Razorpay** – payment integration *(currently under development)*

---

## **🏗 Architecture Overview**

The application follows a **full-stack Next.js architecture**.

- **Frontend:** React components using Next.js App Router
- **Authentication:** NextAuth with OAuth and email magic-link login
- **Database:** MongoDB Atlas
- **Authorization:** Ownership-based permission checks
- **Security:** Rate limiting to prevent API abuse

### **Ownership Logic**

Each campaign stores the **creator’s user ID**.

Example logic:

- Campaigns store the creator ID
- Only the creator can update or delete the campaign
- API routes verify user identity before performing actions

---

## **🔒 Security Considerations**

This project includes several basic protections:

- API rate limiting to reduce spam or abuse
- Ownership checks before modifying resources
- Authentication via OAuth and magic-link login
- Server-side validation of requests

These were implemented to simulate **real-world backend concerns in modern web applications**.

---

## **⚙️ Getting Started**

### **1. Clone the repository**

```bash
git clone https://github.com/Aayush4518/RaiseIN.git
```
## ** Install Dependencies **
``` npm install ```
### ** 2. Create environment variables**
```
MONGODB_URI=your_mongodb_uri

NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

RESEND_API_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### ** 3. Run the development server **
``` npm run dev ```

### **📌 Future Improvements**

-Complete Razorpay payment verification flow
-Donation history tracking
-Campaign deadlines
-Platform analytics
-Improved campaign discovery


## **💬 Feedback & Suggestions**

If you have any suggestions, ideas for improvements, or notice something that could be done better, feel free to open an issue or submit a pull request.
I’m always open to learning and improving the project.
